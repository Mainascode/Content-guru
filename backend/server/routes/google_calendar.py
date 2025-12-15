from flask import Blueprint, redirect, request, jsonify, current_app, session
from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import os
import datetime
from server.models import db, User
from flask_jwt_extended import jwt_required, get_jwt_identity

google_auth_bp = Blueprint('google_auth', __name__)

# Helper to get the flow
def get_google_auth_flow():
    return Flow.from_client_config(
        {
            "web": {
                "client_id": current_app.config['GOOGLE_CLIENT_ID'],
                "client_secret": current_app.config['GOOGLE_CLIENT_SECRET'],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [current_app.config['GOOGLE_REDIRECT_URI']]
            }
        },
        scopes=current_app.config['GOOGLE_SCOPES'],
        redirect_uri=current_app.config['GOOGLE_REDIRECT_URI']
    )

@google_auth_bp.route('/google/login')
@jwt_required() # User must be logged in to link account
def login():
    # Verify user is admin (optional, for now just allow linking)
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user: # Should not happen with valid JWT
        return jsonify({"error": "User not found"}), 404
        
    # Store user ID in session to retrieve it in callback (since callback comes from Google)
    # Note: Sessions in Flask are signed cookies.
    # Alternatively, we can pass it in 'state' but session is easier for now.
    # However, since this is an API called by frontend, we might just return the auth URL to the frontend
    # and let the frontend do the redirect. 
    # But usually OAuth involves a redirect from the server.
    # To keep state, we can use a temporary token or just the session if the client supports cookies.
    # Let's try returning the URL to the frontend.
    
    flow = get_google_auth_flow()
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    
    # We need to persist 'state' to verify in callback. 
    # Since we are stateless (JWT), we can't easily rely on server-side session for the callback 
    # unless we use a browser cookie for the session.
    # We will pass the user_id in the state or handle it via a temporary cookie.
    # For simplicity, let's encode user_id in state or use a query param if secure enough (state is better).
    # Actuallly, google-auth-oauthlib manages state checking.
    
    # Let's use a simple approach: Frontend calls this, gets URL, redirects user.
    # User validates, Google redirects to /google/callback.
    # /google/callback needs to know WHO the user is. 
    # We can put a temporary "linking_token" cookie that contains the user ID.
    
    resp = jsonify({"authorization_url": authorization_url})
    
    # Securely set a cookie with the user ID to retrieve in callback
    # If using https preferably add secure=True
    resp.set_cookie('linking_user_id', str(current_user_id), httponly=True, max_age=300) # 5 mins
    return resp

@google_auth_bp.route('/google/callback')
def callback():
    # User comes back here.
    user_id = request.cookies.get('linking_user_id')
    if not user_id:
        return jsonify({"error": "User session expired or invalid"}), 400
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    state = request.args.get('state')
    flow = get_google_auth_flow()
    
    try:
        flow.fetch_token(authorization_response=request.url)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch token: {str(e)}"}), 400

    credentials = flow.credentials
    
    # Save credentials to DB
    user.google_access_token = credentials.token
    user.google_refresh_token = credentials.refresh_token
    user.google_token_expiry = credentials.expiry
    
    db.session.commit()
    
    # Redirect back to frontend success page
    frontend_url = "https://content-guru-6jvp.vercel.app/admin/calendar?status=success" # Or a local URL if dev
    if "localhost" in request.host:
         frontend_url = "http://localhost:3000/admin/calendar?status=success"
         
    return redirect(frontend_url)

@google_auth_bp.route('/google/calendar/events', methods=['GET', 'POST'])
@jwt_required()
def calendar_events():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user or not user.google_access_token:
        return jsonify({"error": "User not connected to Google Calendar"}), 400

    # Build credentials object
    creds = Credentials(
        token=user.google_access_token,
        refresh_token=user.google_refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=current_app.config['GOOGLE_CLIENT_ID'],
        client_secret=current_app.config['GOOGLE_CLIENT_SECRET'],
        scopes=current_app.config['GOOGLE_SCOPES']
    )
    
    # Refresh if expired
    if creds.expired and creds.refresh_token:
        try:
            creds.refresh(Request())
            # Update DB
            user.google_access_token = creds.token
            # Refresh token might remain same
            user.google_token_expiry = creds.expiry
            db.session.commit()
        except Exception as e:
             return jsonify({"error": "Failed to refresh token, please unlink and link again."}), 401

    try:
        service = build('calendar', 'v3', credentials=creds)
        
        if request.method == 'GET':
            # List upcoming 10 events
            now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
            events_result = service.events().list(calendarId='primary', timeMin=now,
                                                maxResults=10, singleEvents=True,
                                                orderBy='startTime').execute()
            events = events_result.get('items', [])
            return jsonify(events)
            
        elif request.method == 'POST':
            data = request.json
            event_body = {
                'summary': data.get('summary', 'New Event'),
                'description': data.get('description', ''),
                'start': {
                    'dateTime': data.get('start_time'), # ISO format expected
                    'timeZone': 'UTC',
                },
                'end': {
                    'dateTime': data.get('end_time'),
                    'timeZone': 'UTC',
                },
            }
            
            event = service.events().insert(calendarId='primary', body=event_body).execute()
            return jsonify(event)
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

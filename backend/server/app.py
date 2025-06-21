from flask import  request, jsonify ,Flask
from flask_restful import Api, Resource
from flask_jwt_extended import decode_token, get_jwt_identity, jwt_required, create_access_token, JWTManager
from flask_migrate import Migrate
from models import db, User, Course, ContactMessage, Enrollment, BookPurchase, CoursePurchase, UserBook
from flask_cors import CORS
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
import paypalrestsdk
from datetime import datetime
import os

import firebase_admin
from firebase_admin import auth as firebase_auth, credentials
from sqlalchemy.exc import SQLAlchemyError
import os, base64, datetime, requests


app = Flask(__name__)
CORS(app, supports_credentials=True)
api = Api(app)




app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contentguru.db'
app.config['SECRET_KEY'] = 'WyQoe94Ch-q31gYbPtqPmdHSnIe9-vdv35ifgsG-XAYCitOVeM8_EWWYqv1vYjPaS4B6Uk_yNObswNcf0HddtQ'
app.config['JWT_SECRET_KEY'] = 'WyQoe94Ch-q31gYbPtqPmdHSnIe9-vdv35ifgsG-XAYCitOVeM8_EWWYqv1vYjPaS4B6Uk_yNObswNcf0HddtQ'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = ''
app.config['MAIL_PASSWORD'] = ''
app.config['MAIL_DEFAULT_SENDER'] = 'mainaemmanuel855@gmail.com'
app.config['UPLOAD_FOLDER'] = 'uploads'
WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")

# Firebase
cred = credentials.Certificate("firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

# Extensions
db.init_app(app)
migrate = Migrate(app, db)
mail = Mail(app)
jwt = JWTManager(app)

@jwt.user_identity_loader
def user_identity_lookup(user_id):
    return user_id

# Create tables
with app.app_context():
    db.create_all()

# ======================
#        Resources
# ======================

# Environment variables
MPESA_BASE_URL = ("https://sandbox.safaricom.co.ke")
CONSUMER_KEY =("luoBoFwiA4jFXFzBsDoBSIA4Lr24CkvxHqUf4BUVUAVZdseP")
CONSUMER_SECRET = ("rqhQm4F913zGdh8S79V2zs35nTLKv536TfDFKyVJHxPYn7mBsXleKkbis8YytQEy")
SHORTCODE = 174379
PASSKEY = ("bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919")
CALLBACK_URL = ("https://content-guru.com/api/mpesa/callback")


def get_mpesa_token():
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    auth = f"{CONSUMER_KEY}:{CONSUMER_SECRET}"
    encoded_auth = base64.b64encode(auth.encode()).decode()
    headers = {"Authorization": f"Basic {encoded_auth}"}
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        return None
def generate_password():
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    password_str = f"{SHORTCODE}{PASSKEY}{timestamp}"
    encoded_password = base64.b64encode(password_str.encode()).decode()
    return encoded_password, timestamp

class get_token(Resource):
    def get(self):
        token = get_mpesa_token()
        if token:
            return jsonify({"access_token": token})
        else:
            return jsonify({"error": "Failed to get access token"}), 500
        

class stk_push(Resource):
    def post(self):
        token = get_mpesa_token()
        if not token:
            return jsonify({"error": "Failed to get access token"}), 500
        
        password, timestamp = generate_password()

        payload = {
            "BusinessShortCode": SHORTCODE,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": request.json.get("amount", 1), 
            "PartyA": request.json.get("phone"),  
            "PartyB": SHORTCODE,
            "PhoneNumber": request.json.get("phone"),
            "CallBackURL": CALLBACK_URL,
            "AccountReference": "Tiketi",
            "TransactionDesc": "Payment"
        }

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        mpesa_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        response = requests.post(mpesa_url, json=payload, headers=headers)

        return response.json()
    
@app.route("/api/purchase-book", methods=["POST"])
def save_paypal_purchase():
    try:
        data = request.get_json()
        # Here you can connect to DB (e.g. SQLite, Firebase) and persist it
        print("✅ PayPal purchase logged:", data)
        return jsonify({"message": "Purchase saved successfully"}), 200
    except Exception as e:
        return jsonify({"message": f"Save failed: {str(e)}"}), 500


@app.route("/api/mpesa/callback", methods=["POST"])
def mpesa_callback():
    try:
        data = request.get_json()
        print("📥 M-Pesa Callback received:", data)
        # You can save transaction status or log to DB
        return jsonify({"message": "Callback received"}), 200
    except Exception as e:
        return jsonify({"message": f"Callback error: {str(e)}"}), 500

class CheckSession(Resource):
    def get(self):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return {"error": "Missing token"}, 401

        try:
            firebase_user = firebase_auth.verify_id_token(token)
            uid = firebase_user.get("uid")
            user = User.query.filter_by(firebase_uid=uid).first()
            if user:
                return {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username or user.name or user.email,
                    "role": user.role,
                }, 200
        except:
            pass

        try:
            decoded = decode_token(token)
            user = User.query.get(decoded["sub"])
            if user:
                return {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username or user.name or user.email,
                    "role": user.role,
                }, 200
        except:
            return {"error": "Invalid token"}, 401

        return {"error": "User not found"}, 404

class FirebaseSignup(Resource):
    def post(self):
        data = request.get_json()
        token = data.get('token')
        role = data.get('role', 'student')
        fallback_name = data.get('name', 'Unknown')

        if not token:
            return {"error": "Missing Firebase token"}, 400

        try:
            # Verify the token
            decoded_token = firebase_auth.verify_id_token(token)
            firebase_uid = decoded_token['uid']
            email = decoded_token.get('email')
            name = decoded_token.get('name') or fallback_name

            if not email:
                return {"error": "Email not found in Firebase token"}, 400

            # Check for existing user
            user = User.query.filter_by(email=email).first()
            if user:
                access_token = create_access_token(identity=user.id)
                return {"access_token": access_token}, 200

            # Register new user
            new_user = User(
                firebase_uid=firebase_uid,
                email=email,
                name=name,
                role=role
            )
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=new_user.id)
            return {"access_token": access_token}, 201

        except firebase_auth.InvalidIdTokenError as e:
            return {"error": "Invalid Firebase ID token", "details": str(e)}, 400
        except firebase_auth.ExpiredIdTokenError:
            return {"error": "Expired Firebase token"}, 401
        except SQLAlchemyError as db_err:
            db.session.rollback()
            return {"error": "Database error", "details": str(db_err)}, 500
        except Exception as e:
            return {"error": "Unexpected error", "details": str(e)}, 500
class FirebaseLogin(Resource):
    def post(self):
        data = request.get_json()
        token = data.get('token')
        fallback_name = data.get('name', 'User')

        if not token:
            return {"error": "Missing Firebase token"}, 400

        try:
            decoded_token = firebase_auth.verify_id_token(token)
            firebase_uid = decoded_token['uid']
            email = decoded_token.get('email')
            name = decoded_token.get('name') or fallback_name

            if not email:
                return {"error": "Email not found in Firebase token"}, 400

            user = User.query.filter_by(email=email).first()

            if not user:
                user = User(
                    firebase_uid=firebase_uid,
                    email=email,
                    name=name
                )
                db.session.add(user)
                db.session.commit()

            access_token = create_access_token(identity=user.id)
            return {"access_token": access_token}, 200

        except firebase_auth.InvalidIdTokenError:
            return {"error": "Invalid Firebase ID token"}, 400
        except firebase_auth.ExpiredIdTokenError:
            return {"error": "Expired Firebase token"}, 401
        except SQLAlchemyError as db_err:
            db.session.rollback()
            return {"error": "Database error", "details": str(db_err)}, 500
        except Exception as e:
            return {"error": "Unexpected error", "details": str(e)}, 500


class CreateCourse(Resource):
    @jwt_required()
    def post(self):
        data = request.form
        name = data.get('name')
        description = data.get('description')
        price = data.get('price')
        instructor_id = get_jwt_identity()

        instructor = User.query.get(instructor_id)
        if instructor.role != 'admin':
            return {"error": "Only admins can create courses"}, 403

        thumbnail = request.files.get('thumbnail')
        if thumbnail:
            filename = secure_filename(thumbnail.filename)
            thumbnail.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            thumbnail_url = f"/uploads/{filename}"
        else:
            thumbnail_url = ""

        new_course = Course(name=name, description=description, price=price, instructor_id=instructor_id, thumbnail=thumbnail_url)
        db.session.add(new_course)
        db.session.commit()

        return {"message": "Course created successfully", "course_id": new_course.id}, 201

class ContactResource(Resource):
    def post(self):
        data = request.get_json()
        name, email, message = data.get('name'), data.get('email'), data.get('message')
        if not all([name, email, message]):
            return {"error": "All fields are required."}, 400

        db.session.add(ContactMessage(name=name, email=email, message=message))
        db.session.commit()

        msg = Message("Contact Form Received", recipients=[email])
        msg.body = f"Thank you {name}, we've received your message. We'll be in touch."
        mail.send(msg)
        return {"message": "Message received!"}, 200

class EnrollmentResource(Resource):
    def post(self):
        data = request.get_json()
        name, email, phone, course_id = data.get('name'), data.get('email'), data.get('phone'), data.get('course_id')
        if not all([name, email, phone, course_id]):
            return {"error": "All fields are required."}, 400

        course = Course.query.get(course_id)
        if not course:
            return {'message': 'Course not found'}, 404

        db.session.add(Enrollment(name=name, email=email, phone=phone, course_id=course_id))
        db.session.commit()

        msg = Message("Enrollment Confirmation", recipients=[email])
        msg.body = f"Hi {name}, you enrolled in {course.name}."
        mail.send(msg)

        return {"message": "Enrollment successful!"}, 200

class PurchaseCourse(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        title, price, payment_id = data.get('title'), data.get('price'), data.get('payment_id')

        course = Course.query.filter_by(title=title).first()
        if not course:
            return {'error': 'Course not found'}, 404

        purchase = CoursePurchase(user_id=user_id, course_id=course.id, price=price, payment_id=payment_id, purchased_at=datetime.utcnow())
        db.session.add(purchase)
        db.session.commit()

        return {'message': f'Successfully purchased course: {title}'}, 200

class PayPalBookPurchase(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        title = data.get('title')
        price = data.get('price')

        if not title or not price:
            return {"error": "Missing title or price"}, 400

        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {"payment_method": "paypal"},
            "redirect_urls": {
                "return_url": "http://localhost:3000/payment-success",
                "cancel_url": "http://localhost:3000/payment-cancel"
            },
            "transactions": [{
                "item_list": {"items": [{"name": title, "sku": "book", "price": price, "currency": "USD", "quantity": 1}]},
                "amount": {"total": price, "currency": "USD"},
                "description": f"Purchase of {title}"
            }]
        })

        if payment.create():
            approval_url = next(link.href for link in payment.links if link.rel == "approval_url")
            return {"approval_url": approval_url}
        else:
            return {"error": "Payment creation failed", "details": payment.error}, 500

class PayPalExecutePayment(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        payment_id = data.get('paymentId')
        payer_id = data.get('PayerID')

        payment = paypalrestsdk.Payment.find(payment_id)
        if payment.execute({"payer_id": payer_id}):
            transaction = payment.transactions[0]
            title = transaction.item_list.items[0].name
            price = transaction.amount.total
            db.session.add(BookPurchase(user_id=user_id, book_title=title, price=price))
            db.session.commit()
            return {"message": f"Purchased {title}"}, 200
        return {"error": "Payment failed", "details": payment.error}, 500

class RecordBookPurchase(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        title = data.get("title")
        price = data.get("price")
        order_id = data.get("orderId")
        payer_email = data.get("payerEmail")

        if not all([title, price, order_id]):
            return {"error": "Missing fields"}, 400

        purchase = UserBook(user_id=user_id, title=title, price=price, paypal_order_id=order_id, payer_email=payer_email)
        db.session.add(purchase)
        db.session.commit()
        return {"message": "Book purchase recorded successfully"}

# ======================
#        Routes
# ======================

api.add_resource(CheckSession, '/check-session')
api.add_resource(get_token, '/get-token')
api.add_resource(stk_push,'/stk-push')
api.add_resource(FirebaseSignup, '/firebase-signup')
api.add_resource(FirebaseLogin, '/firebase-login')
api.add_resource(CreateCourse, '/courses')
api.add_resource(ContactResource, '/api/contact')
api.add_resource(EnrollmentResource, '/enrollment')
api.add_resource(PurchaseCourse, '/purchase-course')
api.add_resource(PayPalBookPurchase, '/paypal/purchase-book')
api.add_resource(PayPalExecutePayment, '/paypal/execute-payment')
api.add_resource(RecordBookPurchase, '/api/purchase-book')

if __name__ == "__main__":
    app.run(port=5001, debug=True)
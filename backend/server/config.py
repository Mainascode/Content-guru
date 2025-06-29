# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
import os
from flask_jwt_extended import JWTManager
# Local imports (routes or models)
from  models import db
 # Assuming you have your models in models.py

# Instantiate app, set attributes
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["https://content-guru-6jvp.vercel.app/"])
api = Api(app)
app.secret_key = os.urandom(24)  # Random secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contentguru.db'  # Change DB URI if needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.urandom(24)  # Random JWT secret key
import paypalrestsdk

paypalrestsdk.configure({
    "mode": "live",  # Use "live" in production
    "client_id": "AfqKJh9FRrd-aqMGCFRlgg1vhhXF3gg9ViCeZRMLCX9p0JEdrBfJWGWm-uBPnKjY7d0_TjfG_oHs--de",
    "client_secret": "EL_OCRGXqU3voHEpJL1Om2G2QpIr8sgLQpN_0A4C6vxy0P04JkoG0wY7tn1fDcOg2Zr5ZiLjGm0kNyl4"
})

# Instantiate JWT, Bcrypt, and API
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Configure migrations
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)

# Initialize API and CORS
api = Api(app)
CORS(app)

# Import your models (after initializing db)
from models import User, Course, Book, Enrollment, UserBook  # Ensure these are defined in models.py

# Setup routes (you can separate them into a different file if needed)
@app.route('/')
def index():
    return "Welcome to ContentGuru!"



if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)

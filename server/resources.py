from flask import request, jsonify
from flask_restful import Resource
from models import db, User, Course, Book, ContactMessage, Enrollment
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from werkzeug.security import generate_password_hash
from datetime import timedelta
from flask_mail import Message
from app import mail
from sqlalchemy.exc import IntegrityError
import stripe
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

# Set your Stripe secret key from environment variable
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# ------------------ AUTH ------------------

class Signup(Resource):
    def post(self):
        data = request.get_json()
        
        if not data.get("username") or not data.get("email") or not data.get("password"):
            return {"message": "Missing required fields"}, 400
        
        if User.query.filter((User.username == data["username"]) | (User.email == data["email"])).first():
            return {"error": "Username or email already exists"}, 409

        password_hash = generate_password_hash(data["password"])
        new_user = User(
            username=data["username"],
            email=data["email"],
            password_hash=password_hash,
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            access_token = create_access_token(identity=new_user.id, expires_delta=timedelta(days=30))
            return {"access_token": access_token}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return {"message": "Missing required fields"}, 400
        
        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=30))
            return {"access_token": access_token}, 200

        return {"error": "Invalid username or password"}, 401


class CheckSession(Resource):
    def get(self):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            user = db.session.get(User, user_id)
            if user:
                return {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role
                }, 200
            return {"error": "User not found"}, 404
        except Exception:
            return {"error": "Invalid or expired token"}, 401


# ------------------ COURSES ------------------

class GetCourses(Resource):
    def get(self):
        courses = Course.query.all()
        return [course.to_dict() for course in courses], 200


class GetCourseByID(Resource):
    def get(self, course_id):
        course = Course.query.get(course_id)
        if not course:
            return {"error": "Course not found"}, 404
        return course.to_dict(), 200


class CreateCourse(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        instructor = User.query.get(user_id)

        if not instructor or instructor.role != "instructor":
            return {"error": "Only instructors can create courses"}, 403

        new_course = Course(
            name=data["name"],
            description=data["description"],
            price=data["price"],
            instructor_id=user_id
        )

        try:
            db.session.add(new_course)
            db.session.commit()
            return new_course.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500


# ------------------ BOOKS ------------------

class CreateBook(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user.role != 'admin':
            return {"error": "Only admins can add books"}, 403

        data = request.get_json()

        new_book = Book(
            title=data["title"],
            author=data["author"],
            price=data["price"],
            image_url=data.get("image_url")
        )

        try:
            db.session.add(new_book)
            db.session.commit()
            return new_book.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500


class GetBooks(Resource):
    def get(self):
        books = Book.query.all()
        return [book.to_dict() for book in books], 200


class GetBookByID(Resource):
    def get(self, book_id):
        book = Book.query.get(book_id)
        if not book:
            return {"error": "Book not found"}, 404
        return book.to_dict(), 200


# ------------------ CONTACT MESSAGE ------------------

class ContactMessageResource(Resource):
    def post(self):
        data = request.get_json()
        
        # Extract fields from the request
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Validate the data
        if not name or not email or not message:
            return jsonify({'error': 'All fields are required.'}), 400

        # Save the contact message to the database
        contact_message = ContactMessage(name=name, email=email, message=message)
        db.session.add(contact_message)
        db.session.commit()

        # Send an email to the admin
        admin_email = "mainaemmanuel855@gmail.com"  # Replace with the admin's email address
        msg = Message("New Contact Message",
                      recipients=[admin_email],
                      body=f"Message from: {name}\nEmail: {email}\n\nMessage:\n{message}")

        try:
            mail.send(msg)
        except Exception as e:
            return jsonify({'error': f"Failed to send email: {str(e)}"}), 500

        # Return success response
        return jsonify({'message': 'Your message has been received! The admin will get back to you soon.'}), 200


# ------------------ ENROLLMENT ------------------

class EnrollmentResource(Resource):
    def post(self):
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        course_id = data.get("course_id")
        token = data.get("token")

        if not all([name, email, phone, course_id, token]):
            return {"message": "Missing required fields"}, 400

        course = Course.query.get(course_id)
        if not course:
            return {"message": "Course not found"}, 404

        try:
            charge = stripe.Charge.create(
                amount=int(course.price * 100),
                currency="usd",
                description=f"Payment for {course.name}",
                source=token
            )

            # Save the enrollment in the database
            enrollment = Enrollment(
                name=name,
                email=email,
                phone=phone,
                course_id=course.id,
                payment_status="Successful"
            )
            db.session.add(enrollment)
            db.session.commit()

            # Generate PDF receipt
            pdf_io = generate_pdf_receipt(name, course.name, course.price)

            # Send confirmation email with PDF
            msg = Message(
                subject="Enrollment Confirmation",
                recipients=[email],
                body=f"Hello {name},\n\nYou have successfully enrolled in {course.name}.\n\nThank you!",
                attachments=[('receipt.pdf', 'application/pdf', pdf_io.getvalue())]
            )
            mail.send(msg)

            return {"message": "Enrollment successful", "enrollment_id": enrollment.id}, 201

        except stripe.error.StripeError as e:
            return {"message": f"Payment failed: {str(e)}"}, 500
        except IntegrityError:
            db.session.rollback()
            return {"message": "Database error, please try again."}, 500
        except Exception as e:
            return {"message": f"An unexpected error occurred: {str(e)}"}, 500

def generate_pdf_receipt(name, course_name, price):
    pdf_io = BytesIO()
    c = canvas.Canvas(pdf_io, pagesize=letter)
    c.drawString(100, 750, f"Receipt for {name}")
    c.drawString(100, 730, f"Course: {course_name}")
    c.drawString(100, 710, f"Amount Paid: ${price}")
    c.save()
    pdf_io.seek(0)
    return pdf_io


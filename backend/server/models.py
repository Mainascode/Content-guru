from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from werkzeug.security import generate_password_hash, check_password_hash

# server/models.py

db = SQLAlchemy()
bcrypt = Bcrypt()
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firebase_uid = db.Column(db.String(128), unique=True, nullable=True)  # ✅ Add this line
    username = db.Column(db.String, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120))
    role = db.Column(db.String(20), default='student')
    password_hash = db.Column(db.String(128), nullable=True)

    # Relationships (adjust based on your app)
    courses = db.relationship('Course', backref='instructor', lazy=True, cascade="all, delete-orphan")
    enrollments = db.relationship('Enrollment', back_populates='user', lazy=True, cascade="all, delete-orphan")
    user_books = db.relationship('UserBook', back_populates='user', lazy=True, cascade="all, delete-orphan")
    course_purchases = db.relationship('CoursePurchase', back_populates='user', lazy=True, cascade="all, delete-orphan")
    book_purchases = db.relationship('BookPurchase', backref='user', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.username} ({self.email})>"

    def set_password(self, password):
     self.password_hash = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

def to_dict(self):
    return {
        "id": self.id,
        "email": self.email,
        "username": self.username,
        "role": self.role
    }

class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    thumbnail_url = db.Column(db.String(255), nullable=True)  # Thumbnail image URL
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    enrollments = db.relationship('Enrollment', back_populates='course', lazy=True, cascade="all, delete-orphan")
    purchases = db.relationship('CoursePurchase', back_populates='course', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Course {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'instructor': self.instructor.username,
            'thumbnail_url': self.thumbnail_url
        }


class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user_books = db.relationship('UserBook', back_populates='book', lazy=True, cascade="all, delete-orphan")
    purchases = db.relationship('BookPurchase', backref='book', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Book {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'price': self.price,
            'image_url': self.image_url
        }


class BookPurchase(db.Model):
    __tablename__ = 'book_purchases'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False, index=True)
    price = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<BookPurchase user_id={self.user_id} book_id={self.book_id}>'


class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False, index=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='enrollments')
    course = db.relationship('Course', back_populates='enrollments')

    def __repr__(self):
        return f'<Enrollment user_id={self.user_id} course_id={self.course_id}>'


class UserBook(db.Model):
    __tablename__ = 'user_book'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False, index=True)
    purchase_date = db.Column(db.DateTime, default=datetime.utcnow)
    payment_reference = db.Column(db.String(128))  # For PayPal orderId

    user = db.relationship('User', back_populates='user_books', overlaps="user_books")
    book = db.relationship('Book', back_populates='user_books', overlaps="user_books")

    def __repr__(self):
        return f'<UserBook user_id={self.user_id} book_id={self.book_id}>'


class ContactMessage(db.Model):
    __tablename__ = 'contact_messages'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<ContactMessage from={self.email}>'


class CoursePurchase(db.Model):
    __tablename__ = 'course_purchases'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False, index=True)
    price = db.Column(db.Float, nullable=False)
    payment_id = db.Column(db.String(120))  # Optional
    purchased_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='course_purchases')
    course = db.relationship('Course', back_populates='purchases')

    def __repr__(self):
        return f'<CoursePurchase user_id={self.user_id} course_id={self.course_id}>'

# backend/server/models.py
class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=True)
    service_type = db.Column(db.String(20))  # e.g. "book", "course"
    service_id = db.Column(db.Integer)       # e.g. book_id
    rating = db.Column(db.Integer)           # 1 to 5
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

from random import choice as rc
from datetime import datetime
from faker import Faker
from app import app
from models import db, User, Course,  Enrollment, UserBook, Book

def main():
    fake = Faker()

    with app.app_context():
        print("Starting seed...")

        print("Deleting old data...")
        UserBook.query.delete()
        Enrollment.query.delete()
        Book.query.delete()
        Course.query.delete()
        User.query.delete()
        db.session.commit()

        print("Creating users...")
        users = []
        roles = ['student', 'instructor']
        usernames = set()

        for _ in range(20):
            username = fake.unique.user_name()
            # Ensure unique username
            while username in usernames:
                username = fake.unique.user_name()
            usernames.add(username)

            user = User(
                username=username,
                email=fake.unique.email(),
                name=fake.name(),
                role=rc(roles)
            )
            user.set_password('password')  # Hash the password
            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        # Filter instructors
        instructors = [u for u in users if u.role == 'instructor']
        if len(instructors) < 2:
            print("Warning: Not enough instructors, using fallback users")
            instructors += users[:2]

        print("Creating courses...")
        courses = [
            Course(
                name="Python Basics",
                description="Introductory Python programming course.",
                price=100.0,
                instructor_id=instructors[0].id
            ),
            Course(
                name="Advanced JavaScript",
                description="Deep dive into JavaScript advanced concepts.",
                price=120.0,
                instructor_id=instructors[1].id
            )
        ]
        db.session.add_all(courses)
        db.session.commit()

        print("Creating books...")
        books = [
            Book(
                title="Python for Beginners",
                author="John Doe",
                price=30.0
            ),
            Book(
                title="JavaScript Mastery",
                author="Jane Smith",
                price=35.0
            )
        ]
        db.session.add_all(books)
        db.session.commit()

        print("Creating enrollments for students...")
        enrollments = []
        for user in users:
            if user.role == 'student':
                course = rc(courses)
                enrollments.append(Enrollment(user_id=user.id, course_id=course.id))
        db.session.add_all(enrollments)

        print("Assigning books to users...")
        user_books = []
        for user in users:
            book = rc(books)
            user_books.append(UserBook(user_id=user.id, book_id=book.id))
        db.session.add_all(user_books)

        db.session.commit()
        print("Seeding complete.")

if __name__ == "__main__":
    main()


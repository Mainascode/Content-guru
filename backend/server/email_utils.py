# utils/email_utils.py

from flask_mail import Message
from extensions import mail # Adjust import to your app
from flask import current_app

def send_receipt_email(to_email, username, book_title, pdf_bytes):
    subject = f"Receipt for '{book_title}'"
    body = f"""
    Hello {username},

    Thank you for purchasing "{book_title}" from Content Guru.
    Please find your receipt attached.

    Regards,
    Content Guru Team
    """

    msg = Message(subject=subject, recipients=[to_email], body=body)
    msg.attach(f"receipt_{book_title}.pdf", "application/pdf", pdf_bytes.read())

    with current_app.app_context():
        mail.send(msg)

# server/routes/blog_routes.py
from flask import Blueprint, request, jsonify
from server.models.blog import Blog
from server import db

blog_bp = Blueprint('blog_bp', __name__)

@blog_bp.route('/', methods=['GET'])
def get_blogs():
    blogs = Blog.query.all()
    return jsonify([blog.to_dict() for blog in blogs]), 200

@blog_bp.route('/', methods=['POST'])
def create_blog():
    data = request.get_json()
    new_blog = Blog(
        title=data.get('title'),
        content=data.get('content'),
        author=data.get('author')
    )
    db.session.add(new_blog)
    db.session.commit()
    return jsonify(new_blog.to_dict()), 201

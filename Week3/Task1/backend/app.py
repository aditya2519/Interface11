from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from models import db, BlogPost

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()

from sqlalchemy import desc, asc

@app.route("/posts", methods=["GET"])
def get_posts():
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=5, type=int)
    search = request.args.get("search", default="", type=str)
    sort_order = request.args.get("sort", default="newest", type=str)

    query = BlogPost.query

    if search:
        query = query.filter(BlogPost.title.ilike(f"%{search}%"))

    if sort_order == "oldest":
        query = query.order_by(asc(BlogPost.created_at))
    else:
        query = query.order_by(desc(BlogPost.created_at))

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    posts = pagination.items

    return jsonify({
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": pagination.page,
        "per_page": pagination.per_page,
        "posts": [{
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "created_at": post.created_at.isoformat()
        } for post in posts]
    }), 200


@app.route("/posts/<int:post_id>", methods=["GET"])
def get_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    return jsonify({
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "created_at": post.created_at.isoformat()
    }), 200

@app.route("/posts", methods=["POST"])
def create_post():
    data = request.get_json()
    title = data.get("title")
    content = data.get("content")

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    new_post = BlogPost(title=title, content=content)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post created", "id": new_post.id}), 201

@app.route("/posts/<int:post_id>", methods=["PUT"])
def update_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    data = request.get_json()
    post.title = data.get("title", post.title)
    post.content = data.get("content", post.content)
    db.session.commit()
    return jsonify({"message": "Post updated"}), 200

@app.route("/posts/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True)

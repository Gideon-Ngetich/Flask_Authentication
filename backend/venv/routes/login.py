from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models.user import create_user_model
from db import db


login_bp = Blueprint("login", __name__)

User = create_user_model(db)

@login_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.find_by_email(email)
    if not user or not User.verify_password(user["password"], password):
        return jsonify({"error": "Invalid email or password"}), 401
    
    token = User.generate_token(user["_id"])
    return jsonify({"token": token}), 200
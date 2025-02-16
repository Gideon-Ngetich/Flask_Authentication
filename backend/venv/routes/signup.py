from flask import Blueprint, request, jsonify
from models.user import create_user_model
from db import db

signup_bp = Blueprint("signup", __name__)
User = create_user_model(db)

@signup_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if User.find_by_email(email):
        return jsonify({"error": "User already exist"}), 400
    
    User.create_user(email, password)
    return jsonify({"message": "User registered successfully"}), 201


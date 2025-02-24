from flask_bcrypt import Bcrypt
from flask import request, jsonify, Blueprint, url_for
from utils.token_utils import verify_reset_token, generate_reset_token
from models.user import create_user_model
from db import db
# from utils.token import generate_reset_token
from flask_mail import Message
from dotenv import load_dotenv
from config import mail
import os

load_dotenv()

bcrypt = Bcrypt()


reset_password_bp = Blueprint("reset_password", __name__)
request_password_bp = Blueprint("request_password", __name__)
User = create_user_model(db)


@request_password_bp.route('/request-reset-password', methods=["POST"])
def request_password():
    data = request.get_json()
    email = data.get("email")

    print(data)

    user = User.find_by_email(email)
    if not user:
        return jsonify({"error": "User not found"})
    
    token = generate_reset_token(email)
    frontEnd_url = os.getenv("FRONTEND_URL")
    # reset_url = url_for("reset_password.reset_password", token=token, _external= True)
    reset_url = f"{frontEnd_url}/password-reset?token={token}"

    msg = Message("Password reset request", recipients=[email], sender=os.getenv("MAIL_DEFAULT_SENDER"))
    msg.body = f"Click the link to reset your password: {reset_url}"

    mail.send(msg)
    return jsonify({"message": "Password reset link sent to your email"})

@reset_password_bp.route('/reset-password/<token>', methods=["POST"])
def reset_password(token):
    data = request.get_json()
    new_password = data.get("password")

    email = verify_reset_token(token)
    if not email:
        return jsonify({"error": "Inalid or expired token"}),

    user = User.find_by_email(email)
    if not user:
        return jsonify({"error": "user not found"}), 404
    
    # hashed_password = bcrypt.generate_password_hash(new_password, 10)
    User.update_password(email, new_password)

    return jsonify({"message": "Password rest successful"})

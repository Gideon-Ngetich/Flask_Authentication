from itsdangerous import URLSafeSerializer
from flask import current_app
import os

def generate_reset_token(email):
    serializer = URLSafeSerializer(os.getenv("SECRET_KEY"))
    return serializer.dumps(email,salt=os.getenv("SECURITY_PASSWORD_SALT"))

def verify_reset_token(token, expiration=3000):
    serializer = URLSafeSerializer(os.getenv("SECRET_KEY"))
    try:
        email = serializer.loads(token, salt=os.getenv("SECURITY_PASSWORD_SALT"), max_age=expiration)
        return email
    except: 
        return None
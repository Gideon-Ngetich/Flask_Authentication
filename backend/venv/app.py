from flask import Flask
import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_cors import CORS
from db import db
from config import Config, mail


load_dotenv()
app = Flask(__name__)
app.config.from_object(Config)
# CORS(app, origins='http://localhost:5173', supports_credentials=True, allow_headers=["Content-Type", "Authorization"])
CORS(app, origins='https://flask-authentication-assignment.vercel.app', supports_credentials=True, allow_headers=["Content-Type", "Authorization"])

mail.init_app(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

jwt = JWTManager(app)

from models.user import create_user_model
User = create_user_model(db)

from routes.signup import signup_bp
from routes.login import login_bp
from routes.reset_password import reset_password_bp, request_password_bp
app.register_blueprint(signup_bp, url_prefix="/api")
app.register_blueprint(login_bp, url_prefix="/api")
app.register_blueprint(reset_password_bp, url_prefix='/api')
app.register_blueprint(request_password_bp, url_prefix='/api')


@app.route('/test')
def test_method():
    return{"message": "Hello world"}

if __name__ == "__main__":
    app.run(debug=True)

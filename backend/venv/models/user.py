from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from datetime import datetime
from bson import ObjectId

bcrypt = Bcrypt()

def create_user_model(db):
    class UserModel:
        collection = db.users

        @staticmethod
        def create_user(email, password, firstName, lastName, address, regNo, phoneNumber):
            hashed_password = bcrypt.generate_password_hash(password, 10).decode('utf-8')
            user = {
                "email": email,
                "password": hashed_password,
                "firstName": firstName,''
                "lastName": lastName,
                "address": address,
                "Registration Number": regNo,
                "Phone Number": phoneNumber,
                "created_at": datetime.now(),
                "verified": False
            }
            return UserModel.collection.insert_one(user)
        
        @staticmethod
        def find_by_email(email):
            return UserModel.collection.find_one({"email":email})
        
        @staticmethod
        def generate_token(user_id):
            return create_access_token(identity=str(user_id))
        
        @staticmethod
        def verify_password(hashed_Password, password):
            return bcrypt.check_password_hash(hashed_Password, password)
        
        @staticmethod
        def update_password(email, new_password):
            hashed_password = bcrypt.generate_password_hash(new_password, 10).decode('utf-8')
            UserModel.collection.update_one({"email":email}, {"$set": {"password": hashed_password}})

    return UserModel
import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

load_dotenv()

uri = os.getenv("MONGO_URI")

try:
    client = MongoClient(uri)
    db = client.flask_db
    # collection = db.flask_collection
    print("Connected to db")
except ConnectionFailure:
    print("Error connecting to db")
# app/module1/models.py
from datetime import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from pymongo import MongoClient
from pymongo.errors import OperationFailure
from contextlib import contextmanager

client = MongoClient(os.getenv('MONGO_URI'))
db = client.your_database

def create_user(db, username, password):
    if db.users.find_one({"username": username}):
        return None

    password_hash = generate_password_hash(password)
    user_data = {"username": username, "password": password_hash}
    result = db.users.insert_one(user_data)
    return str(result.inserted_id)

def validate_user(db, username, password):
    user = db.users.find_one({"username": username})
    if user and check_password_hash(user['password'], password):
        return user
    return None

@contextmanager
def get_transaction_session():
    session = client.start_session()
    session.start_transaction()
    try:
        yield session
    except Exception as e:
        session.abort_transaction()
        raise e
    else:
        session.commit_transaction()
    finally:
        session.end_session()

def delete_user(db, username):
    with get_transaction_session() as session:
        user = db.users.find_one({"username": username}, session=session)
        if not user:
            return False

        user_id = user['_id']

        db.events.update_many({}, {"$pull": {"attendees": user_id}}, session=session)

        db.events.delete_many({"creator": user_id}, session=session)

        result = db.users.delete_one({"_id": user_id}, session=session)
        return result.deleted_count > 0

def is_user_valid(user_id):
    if not ObjectId.is_valid(user_id):
        return False
    return True

def get_dashboard_data(db):
    total_events = db.events.count_documents({})
    total_users = db.users.count_documents({})
    upcoming_events = db.events.count_documents({"timestamp": {"$gte": datetime.now()}})
    past_events = db.events.count_documents({"timestamp": {"$lt": datetime.now()}})

    return {
        "totalEvents": total_events,
        "totalUsers": total_users,
        "upcomingEvents": upcoming_events,
        "pastEvents": past_events,
    }
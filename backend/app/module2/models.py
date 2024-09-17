# app/module1/models.py
from bson import ObjectId
from datetime import datetime

def create_event(db, title, description, location, timestamp, duration, category, creator):
    event_data = {
        "title": title,
        "description": description,
        "location": location,
        "timestamp": timestamp,
        "duration": duration,
        "category": category,
        "creator": creator,
        "attendees": []
    }
    return str(db.events.insert_one(event_data).inserted_id)

def delete_event(db, event_id):
    return db.events.delete_one({"_id": ObjectId(event_id)})

def sign_in_event(db, event_id, user_id):
    return db.events.update_one({"_id": ObjectId(event_id)}, {"$addToSet": {"attendees": user_id}})

def sign_out_event(db, event_id, user_id):
    return db.events.update_one({"_id": ObjectId(event_id)}, {"$pull": {"attendees": user_id}})

def get_all_events(db):
    events = db.events.find()
    results = []
    for event in events:
        event['_id'] = str(event['_id'])

        creator_info = {'id': str(event['creator']), 'username': "Unknown"}
        creator = db.users.find_one({"_id": ObjectId(event['creator'])})
        if creator:
            creator_info['username'] = creator.get('username', 'Unknown')
        event['creator'] = creator_info

        event['attendees'] = [str(user_id) for user_id in event.get('attendees', [])]

        if 'timestamp' in event and event['timestamp']:
            event['timestamp'] = event['timestamp'].isoformat()
        results.append(event)
    return results

def search_events(db, query):
    return list(db.events.find({"$text": {"$search": query}}))

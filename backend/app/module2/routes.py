# app/module1/routes.py
from flask import Blueprint, logging, request, jsonify, current_app

from app.module1.models import get_dashboard_data, is_user_valid
from .models import create_event, delete_event, sign_in_event, sign_out_event, get_all_events, search_events
from bson import ObjectId
import datetime

mod2 = Blueprint('events', __name__)

@mod2.route('/create', methods=['POST'])
def create():
    if not request.json or not 'user_id' in request.json:
        return jsonify({"error": "Missing user ID"}), 400

    user_id = request.json['user_id']

    if not is_user_valid(user_id):
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    try:
        event_id = create_event(current_app.db, data['title'], data['description'], data['location'],
                                datetime.datetime.fromisoformat(data['timestamp']), data['duration'],
                                data['category'], user_id)
        return jsonify({"message": "Event created successfully", "event_id": event_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@mod2.route('/delete', methods=['DELETE'])
def delete():
    event_id = request.json['event_id']
    result = delete_event(current_app.db, event_id)
    if result.deleted_count > 0:
        return jsonify({"message": "Event deleted successfully"}), 200
    else:
        return jsonify({"error": "Event not found"}), 404

@mod2.route('/sign-in', methods=['POST'])
def sign_in():
    event_id = request.json['event_id']
    user_id = request.json['user_id']  # Assume user_id is passed
    result = sign_in_event(current_app.db, event_id, user_id)
    if result.modified_count > 0:
        return jsonify({"message": "Signed in to event successfully"}), 200
    else:
        return jsonify({"error": "Failed to sign in or already signed in"}), 400

@mod2.route('/sign-out', methods=['POST'])
def sign_out():
    event_id = request.json['event_id']
    user_id = request.json['user_id']
    result = sign_out_event(current_app.db, event_id, user_id)
    if result.modified_count > 0:
        return jsonify({"message": "Signed out of event successfully"}), 200
    else:
        return jsonify({"error": "Failed to sign out or not signed in"}), 400

@mod2.route('/get-all', methods=['GET'])
def get_all():
    try:
        events = get_all_events(current_app.db)
        return jsonify(events), 200
    except Exception as e:
        logging.exception("Failed to retrieve all events")
        return jsonify({"error": str(e)}), 500


@mod2.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    events = search_events(current_app.db, query)
    return jsonify(events), 200

@mod2.route('/dashboard', methods=['GET'])
def dashboard_summary():
    try:
        data = get_dashboard_data(current_app.db)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
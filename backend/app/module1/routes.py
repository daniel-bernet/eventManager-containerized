# app/module1/routes.py
from flask import Blueprint, request, jsonify, session, current_app
from .models import create_user, validate_user, delete_user
from werkzeug.security import check_password_hash

mod1 = Blueprint('users', __name__)

def validate_user(db, username, password):
    user = db.users.find_one({"username": username})
    if user is None:
        print(f"User not found: {username}")
    elif not check_password_hash(user['password'], password):
        print(f"Password mismatch for user: {username}")
    else:
        print(f"User validated: {username}")
    
    if user and check_password_hash(user['password'], password):
        return user
    return None

@mod1.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    user_id = create_user(current_app.db, username, password)
    if user_id is None:
        return jsonify({"error": "Username already exists"}), 409
    return jsonify({"message": "User created successfully", "username": username, "user_id": user_id}), 201

@mod1.route('/login', methods=['POST'])
def login():
    try:
        username = request.json['username']
        password = request.json['password']
        
        if not username or not password:
            return jsonify({"error": "Missing username or password"}), 400
        
        user = validate_user(current_app.db, username, password)
        if user:
            session['username'] = username
            session['user_id'] = str(user['_id'])
            return jsonify({"message": "Login successful", "username": username, "user_id": str(user['_id'])}), 200
        
        return jsonify({"error": "Invalid credentials"}), 401
    
    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"error": "Internal server error"}), 500

@mod1.route('/delete', methods=['DELETE'])
def delete_account():
    if 'username' in session:
        username = session['username']
        if delete_user(current_app.db, username):
            session.pop('username', None)
            session.pop('user_id', None)
            return jsonify({"message": "User and associated data deleted successfully"}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    return jsonify({"error": "Not logged in"}), 401


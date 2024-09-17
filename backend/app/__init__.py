# app/__init__.py
from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    
    # Setup MongoDB connection
    client = MongoClient(os.getenv('MONGO_URI'))
    app.db = client.your_database_name

    # Registering blueprints from different modules
    from .module1.routes import mod1 as user_blueprint
    from .module2.routes import mod2 as event_blueprint
    app.register_blueprint(user_blueprint, url_prefix='/api/user')
    app.register_blueprint(event_blueprint, url_prefix='/api/event')

    return app

# run.py
from flask_cors import CORS
from app import create_app

app = create_app()

if __name__ == '__main__':
    
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    app.run(debug=True, host='localhost', port=5000)

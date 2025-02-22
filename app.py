from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
import jwt
import os
from dotenv import load_dotenv
from functools import wraps

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='Techgram_')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///techgram.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'fullname': self.fullname
        }

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            token = token.split(' ')[1]  # Remove 'Bearer ' prefix
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({'error': 'Invalid token'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except (jwt.InvalidTokenError, Exception) as e:
            return jsonify({'error': 'Invalid token'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated

def generate_token(user):
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return token

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['fullname', 'username', 'email', 'password']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    # Validate email format
    if '@' not in data['email']:
        return jsonify({'error': 'Invalid email format'}), 400

    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already taken'}), 400

    # Create new user
    try:
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(
            fullname=data['fullname'],
            username=data['username'].lower(),  # Store username in lowercase
            email=data['email'].lower(),  # Store email in lowercase
            password=hashed_password,
            last_login=datetime.utcnow()
        )

        db.session.add(new_user)
        db.session.commit()
        
        # Generate token
        token = generate_token(new_user)
        
        return jsonify({
            'message': 'User created successfully',
            'token': token,
            'user': new_user.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Something went wrong'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validate required fields
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400

    try:
        # Find user by email (case-insensitive)
        user = User.query.filter(User.email.ilike(data['email'])).first()

        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401

        if not bcrypt.check_password_hash(user.password, data['password']):
            return jsonify({'error': 'Invalid email or password'}), 401

        # Update last login time
        user.last_login = datetime.utcnow()
        db.session.commit()

        # Generate token and login user
        login_user(user)
        token = generate_token(user)
        
        return jsonify({
            'message': 'Logged in successfully',
            'token': token,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({'error': 'Something went wrong'}), 500

@app.route('/api/logout')
@token_required
def logout(current_user):
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/user')
@token_required
def get_user(current_user):
    return jsonify({
        'user': current_user.to_dict()
    }), 200

@app.route('/api/check-availability', methods=['POST'])
def check_availability():
    data = request.get_json()
    
    if 'email' in data:
        exists = User.query.filter(User.email.ilike(data['email'])).first() is not None
        return jsonify({'available': not exists})
    
    if 'username' in data:
        exists = User.query.filter(User.username.ilike(data['username'])).first() is not None
        return jsonify({'available': not exists})
    
    return jsonify({'error': 'Invalid request'}), 400

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

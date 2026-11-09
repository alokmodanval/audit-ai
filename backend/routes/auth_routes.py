from flask import Blueprint, request, jsonify
from database.db import get_connection
import hashlib
import sqlite3

auth_bp = Blueprint('auth', __name__)

# ----------------------------
# Helper: Hash Password
# ----------------------------
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


# ----------------------------
# Register
# ----------------------------
@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return jsonify({"error": "All fields are required"}), 400

        hashed_password = hash_password(password)

        conn = get_connection()
        c = conn.cursor()

        # Ensure table exists
        c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        ''')

        c.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            (username, email, hashed_password)
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "User registered successfully"}), 201

    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already registered"}), 400

    except Exception as e:
        print("Register Error:", e)
        return jsonify({"error": "Server error"}), 500


# ----------------------------
# Login
# ----------------------------
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email and password required"}), 400

        hashed_password = hash_password(password)

        conn = get_connection()
        c = conn.cursor()

        c.execute(
            "SELECT id, username, email FROM users WHERE email=? AND password=?",
            (email, hashed_password)
        )

        user = c.fetchone()
        conn.close()

        if user:
            return jsonify({
                "message": "Login successful",
                "user": {
                    "id": user[0],
                    "username": user[1],
                    "email": user[2]
                }
            }), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        print("Login Error:", e)
        return jsonify({"error": "Server error"}), 500
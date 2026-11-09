from flask import request, jsonify
from database.db import get_connection


# ----------------------------
# Middleware: Verify User
# ----------------------------
def require_auth(f):
    def wrapper(*args, **kwargs):
        user_id = request.headers.get("user_id")

        # Check if user_id is provided
        if not user_id:
            return jsonify({"error": "Unauthorized: user_id missing"}), 401

        # Check if user exists in DB
        conn = get_connection()
        c = conn.cursor()

        c.execute("SELECT * FROM users WHERE id=?", (user_id,))
        user = c.fetchone()

        conn.close()

        if not user:
            return jsonify({"error": "Unauthorized: invalid user"}), 401

        # Attach user to request (optional)
        request.user = {
            "id": user[0],
            "username": user[1],
            "email": user[2]
        }

        return f(*args, **kwargs)

    # Preserve function name (important for Flask)
    wrapper.__name__ = f.__name__
    return wrapper
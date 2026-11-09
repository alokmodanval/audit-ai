from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# ----------------------------
# Load environment variables
# ----------------------------
load_dotenv()

# ----------------------------
# Flask App
# ----------------------------
app = Flask(__name__)
CORS(app)

# ----------------------------
# Config
# ----------------------------
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "fallback_secret_key")
app.config['ENV'] = os.getenv("FLASK_ENV", "development")

# ----------------------------
# Initialize Database ✅ IMPORTANT
# ----------------------------
from database.db import init_db
init_db()   # 🔥 This creates tables automatically

# ----------------------------
# Import and register blueprints
# ----------------------------
from routes.audit_routes import audit_bp
from routes.auth_routes import auth_bp
from routes.report_routes import report_bp

app.register_blueprint(audit_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(report_bp)

# ----------------------------
# Health check route
# ----------------------------
@app.route("/")
def home():
    return jsonify({"message": "Audit AI Backend Running"}), 200

# ----------------------------
# Config route (debug)
# ----------------------------
@app.route("/config")
def show_config():
    return jsonify({
        "secret_key": app.config['SECRET_KEY'],
        "db_name": os.getenv("DB_NAME"),
        "openai_key": bool(os.getenv("OPENAI_API_KEY"))
    })

# ----------------------------
# Run App
# ----------------------------
if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=(app.config['ENV'] == "development")
    )
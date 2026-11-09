# backend/routes/audit_routes.py

from flask import Blueprint, request, jsonify
from controllers.audit_controller import run_audit
# from middleware.auth_middleware import require_auth   # 🔒 enable later (JWT)

from utils.validators import is_valid_url
from utils.helpers import normalize_url, format_response

# ✅ NEW IMPORT
from services.ai_service import explain_issue

audit_bp = Blueprint('audit', __name__)


# ----------------------------
# Audit Route
# ----------------------------
@audit_bp.route('/audit', methods=['POST'])
def audit():
    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify(format_response(False, "Invalid request body")), 400

        url = data.get('url')

        if not url:
            return jsonify(format_response(False, "URL is required")), 400

        url = normalize_url(url)

        if not is_valid_url(url):
            return jsonify(format_response(False, "Invalid URL")), 400

        # TEMP user_id (until JWT)
        user_id = 1

        print("Auditing URL:", url)

        result = run_audit(url, user_id)

        # ✅ extra safety check
        if not result:
            return jsonify(format_response(False, "Audit failed")), 500

        return jsonify(format_response(True, "Audit completed", result)), 200

    except Exception as e:
        print("Audit Error:", e)
        return jsonify(format_response(False, "Audit failed", str(e))), 500


# ----------------------------
# Explain Issue Route 🔥
# ----------------------------
@audit_bp.route('/explain', methods=['POST'])
def explain():
    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify(format_response(False, "Invalid request body")), 400

        issue = data.get('issue')

        if not issue:
            return jsonify(format_response(False, "Issue is required")), 400

        print("Explaining issue:", issue)

        explanation = explain_issue(issue)

        return jsonify(format_response(True, "Explanation generated", {
            "issue": issue,
            "explanation": explanation
        })), 200

    except Exception as e:
        print("Explain Error:", e)
        return jsonify(format_response(False, "Failed to explain issue", str(e))), 500


# ----------------------------
# Get Reports Route
# ----------------------------
@audit_bp.route('/reports', methods=['GET'])
def get_reports():
    try:
        from controllers.report_controller import get_reports_for_user

        user_id = 1

        reports = get_reports_for_user(user_id)

        return jsonify(format_response(True, "Reports fetched", reports)), 200

    except Exception as e:
        print("Get Reports Error:", e)
        return jsonify(format_response(False, "Failed to fetch reports", str(e))), 500
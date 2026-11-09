# backend/routes/report_routes.py

from flask import Blueprint, jsonify, request
from database.db import get_connection
from utils.helpers import format_response

report_bp = Blueprint('report', __name__)

# ----------------------------
# Get All Reports
# ----------------------------
@report_bp.route('/reports', methods=['GET'])
def get_reports():
    """
    GET /reports
    Returns all saved audit reports, ordered by newest first
    """
    try:
        conn = get_connection()
        c = conn.cursor()

        c.execute("SELECT * FROM reports ORDER BY id DESC")
        rows = c.fetchall()
        conn.close()

        reports = []
        for r in rows:
            reports.append({
                "id": r[0],
                "user_id": r[1],
                "url": r[2],
                "performance": r[3],
                "seo": r[4],
                "accessibility": r[5],
                "security": r[6],
                "created_at": r[7]
            })

        return jsonify(format_response(True, "Reports fetched", reports)), 200

    except Exception as e:
        print("Get Reports Error:", e)
        return jsonify(format_response(False, "Failed to fetch reports", str(e))), 500


# ----------------------------
# Delete a Report
# ----------------------------
@report_bp.route('/report/<int:report_id>', methods=['DELETE'])
def delete_report(report_id):
    """
    DELETE /report/<report_id>
    Deletes a specific report by ID
    """
    try:
        conn = get_connection()
        c = conn.cursor()

        c.execute("DELETE FROM reports WHERE id=?", (report_id,))
        conn.commit()
        deleted = c.rowcount > 0
        conn.close()

        if deleted:
            return jsonify(format_response(True, "Report deleted")), 200
        else:
            return jsonify(format_response(False, "Report not found")), 404

    except Exception as e:
        print("Delete Report Error:", e)
        return jsonify(format_response(False, "Failed to delete report", str(e))), 500
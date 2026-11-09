# backend/controllers/report_controller.py

from database.db import get_connection

# ----------------------------
# Get Reports for a User
# ----------------------------
def get_reports_for_user(user_id):
    """
    Fetch all reports for a specific user, ordered by newest first
    """
    conn = get_connection()
    c = conn.cursor()

    try:
        c.execute("""
            SELECT id, url, performance, seo, accessibility, security, created_at
            FROM reports
            WHERE user_id = ?
            ORDER BY id DESC
        """, (user_id,))

        rows = c.fetchall()
        reports = []
        for row in rows:
            reports.append({
                "id": row[0],
                "url": row[1],
                "performance": row[2],
                "seo": row[3],
                "accessibility": row[4],
                "security": row[5],
                "created_at": row[6],
            })

        return reports

    except Exception as e:
        print("Report Fetch Error:", e)
        return []

    finally:
        conn.close()


# ----------------------------
# Delete Report by ID
# ----------------------------
def delete_report(report_id):
    """
    Delete a specific report by ID
    """
    conn = get_connection()
    c = conn.cursor()

    try:
        c.execute("DELETE FROM reports WHERE id=?", (report_id,))
        conn.commit()
        return c.rowcount > 0  # Returns True if a row was deleted
    except Exception as e:
        print("Report Delete Error:", e)
        return False
    finally:
        conn.close()
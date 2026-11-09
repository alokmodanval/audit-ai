from database.db import get_connection
import datetime


class ReportModel:

    # ----------------------------
    # Save Report
    # ----------------------------
    @staticmethod
    def create_report(user_id, url, performance, seo, accessibility, security):
        conn = get_connection()
        c = conn.cursor()

        c.execute('''
            INSERT INTO reports
            (user_id, url, performance, seo, accessibility, security, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            user_id,
            url,
            performance,
            seo,
            accessibility,
            security,
            str(datetime.datetime.now())
        ))

        conn.commit()
        conn.close()

    # ----------------------------
    # Get All Reports
    # ----------------------------
    @staticmethod
    def get_all_reports():
        conn = get_connection()
        c = conn.cursor()

        c.execute("SELECT * FROM reports ORDER BY id DESC")
        rows = c.fetchall()

        conn.close()
        return rows

    # ----------------------------
    # Get Reports by User
    # ----------------------------
    @staticmethod
    def get_reports_by_user(user_id):
        conn = get_connection()
        c = conn.cursor()

        c.execute("SELECT * FROM reports WHERE user_id=? ORDER BY id DESC", (user_id,))
        rows = c.fetchall()

        conn.close()
        return rows
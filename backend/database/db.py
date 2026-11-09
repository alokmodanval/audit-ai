import sqlite3
from datetime import datetime

DB_NAME = "audit.db"

def get_connection():
    return sqlite3.connect(DB_NAME)


def init_db():
    conn = get_connection()
    c = conn.cursor()

    # ----------------------------
    # Users Table
    # ----------------------------
    c.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
    ''')

    # ----------------------------
    # Reports Table
    # ----------------------------
    c.execute('''
    CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        url TEXT,
        performance INTEGER,
        seo INTEGER,
        accessibility INTEGER,
        security INTEGER,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    conn.commit()
    conn.close()
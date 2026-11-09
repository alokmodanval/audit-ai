from database.db import get_connection
import hashlib


class UserModel:

    # ----------------------------
    # Hash Password
    # ----------------------------
    @staticmethod
    def hash_password(password):
        return hashlib.sha256(password.encode()).hexdigest()

    # ----------------------------
    # Create User
    # ----------------------------
    @staticmethod
    def create_user(username, email, password):
        conn = get_connection()
        c = conn.cursor()

        hashed_password = UserModel.hash_password(password)

        try:
            c.execute('''
                INSERT INTO users (username, email, password)
                VALUES (?, ?, ?)
            ''', (username, email, hashed_password))

            conn.commit()
            return True
        except:
            return False
        finally:
            conn.close()

    # ----------------------------
    # Get User by Email
    # ----------------------------
    @staticmethod
    def get_user_by_email(email):
        conn = get_connection()
        c = conn.cursor()

        c.execute("SELECT * FROM users WHERE email=?", (email,))
        user = c.fetchone()

        conn.close()
        return user

    # ----------------------------
    # Verify Login
    # ----------------------------
    @staticmethod
    def verify_user(email, password):
        conn = get_connection()
        c = conn.cursor()

        hashed_password = UserModel.hash_password(password)

        c.execute("SELECT * FROM users WHERE email=? AND password=?",
                  (email, hashed_password))
        user = c.fetchone()

        conn.close()
        return user
import unittest
import json
from backend.app import app

class APITestCase(unittest.TestCase):
    def setUp(self):
        # Setup test client
        self.client = app.test_client()
        self.client.testing = True

    # ----------------------------
    # Test Home / Root
    # ----------------------------
    def test_root(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 404)  # Root not defined, 404 expected

    # ----------------------------
    # Test Login Endpoint
    # ----------------------------
    def test_login(self):
        payload = {"email": "test@example.com", "password": "password123"}
        response = self.client.post("/login", data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn("user", data)

    # ----------------------------
    # Test Register Endpoint
    # ----------------------------
    def test_register(self):
        payload = {"name": "Test User", "email": "newuser@example.com", "password": "password123"}
        response = self.client.post("/register", data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn("message", data)
        self.assertEqual(data["message"], "User registered successfully")

    # ----------------------------
    # Test Audit Endpoint
    # ----------------------------
    def test_audit(self):
        payload = {"url": "https://example.com"}
        response = self.client.post("/audit", data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn("performance", data)
        self.assertIn("seo", data)
        self.assertIn("accessibility", data)
        self.assertIn("security", data)

if __name__ == "__main__":
    unittest.main()
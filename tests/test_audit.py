import unittest
from backend.services.lighthouse_service import get_performance_score
from backend.services.seo_service import analyze_seo
from backend.services.accessibility_service import check_accessibility
from backend.services.security_service import scan_security

class AuditServiceTestCase(unittest.TestCase):

    def setUp(self):
        # Example test URL
        self.test_url = "https://example.com"

    # ----------------------------
    # Test Performance Audit
    # ----------------------------
    def test_performance_score(self):
        score = get_performance_score(self.test_url)
        self.assertIsInstance(score, (int, float))
        self.assertGreaterEqual(score, 0)
        self.assertLessEqual(score, 100)

    # ----------------------------
    # Test SEO Audit
    # ----------------------------
    def test_seo_analysis(self):
        seo_report = analyze_seo(self.test_url)
        self.assertIsInstance(seo_report, dict)
        self.assertIn("seo_score", seo_report)

    # ----------------------------
    # Test Accessibility Audit
    # ----------------------------
    def test_accessibility(self):
        accessibility_score = check_accessibility(self.test_url)
        self.assertIsInstance(accessibility_score, (int, float))
        self.assertGreaterEqual(accessibility_score, 0)
        self.assertLessEqual(accessibility_score, 100)

    # ----------------------------
    # Test Security Audit
    # ----------------------------
    def test_security_scan(self):
        security_report = scan_security(self.test_url)
        self.assertIsInstance(security_report, dict)
        self.assertIn("vulnerabilities", security_report)

if __name__ == "__main__":
    unittest.main()
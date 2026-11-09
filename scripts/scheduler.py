import schedule
import time
import requests

# ----------------------------
# Configuration
# ----------------------------
API_URL = "http://127.0.0.1:5000/audit"  # Backend audit endpoint
WEBSITES = [
    "https://example.com",
    "https://another-site.com"
]  # List of websites to audit

# ----------------------------
# Function to run audit
# ----------------------------
def run_audit(url):
    try:
        response = requests.post(API_URL, json={"url": url})
        response.raise_for_status()
        data = response.json()
        print(f"\n✅ Audit completed for {url}")
        print(f"Performance: {data.get('performance')}, SEO: {data.get('seo')}, Accessibility: {data.get('accessibility')}, Security: {data.get('security')}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error auditing {url}: {e}")

# ----------------------------
# Scheduled Job
# ----------------------------
def audit_all_websites():
    print("\n🕒 Running scheduled audits...")
    for site in WEBSITES:
        run_audit(site)

# ----------------------------
# Schedule setup
# ----------------------------
# Run every day at 9 AM
schedule.every().day.at("09:00").do(audit_all_websites)

print("📅 Scheduler started. Press Ctrl+C to stop.")

# ----------------------------
# Keep script running
# ----------------------------
while True:
    schedule.run_pending()
    time.sleep(60)  # wait 1 minute
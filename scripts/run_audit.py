import requests
import sys

# ----------------------------
# Config
# ----------------------------
API_URL = "http://127.0.0.1:5000/audit"  # Backend audit endpoint

# ----------------------------
# Get URL from CLI
# ----------------------------
if len(sys.argv) < 2:
    print("Usage: python run_audit.py <website_url>")
    sys.exit(1)

website_url = sys.argv[1]

# ----------------------------
# Run Audit
# ----------------------------
try:
    response = requests.post(API_URL, json={"url": website_url})
    response.raise_for_status()

    data = response.json()
    print("\n✅ Audit Completed Successfully!\n")
    print("Performance:", data.get("performance"))
    print("SEO:", data.get("seo"))
    print("Accessibility:", data.get("accessibility"))
    print("Security:", data.get("security"))

    # AI Suggestions (if any)
    ai_suggestions = data.get("ai_suggestions")
    if ai_suggestions:
        print("\n🤖 AI Suggestions:")
        for key, value in ai_suggestions.items():
            print(f"{key.capitalize()}: {value}")

except requests.exceptions.RequestException as e:
    print("❌ Error running audit:", e)
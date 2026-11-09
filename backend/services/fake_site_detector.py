import re
from urllib.parse import urlparse


SUSPICIOUS_KEYWORDS = [
    "login",
    "verify",
    "secure",
    "update",
    "account",
    "bank",
    "wallet",
    "signin",
    "confirm",
    "password",
    "otp",
    "free",
    "bonus",
    "gift",
]


def is_ip_address(hostname):
    return bool(re.fullmatch(r"(\d{1,3}\.){3}\d{1,3}", hostname or ""))


def analyze_website_trust(url, performance_score=0, security_score=0):
    parsed = urlparse(url)
    hostname = (parsed.netloc or "").lower()

    reasons = []
    score = 100

    # HTTPS check
    if parsed.scheme != "https":
      score -= 20
      reasons.append("Website is not using HTTPS")

    # IP address instead of domain
    if is_ip_address(hostname):
      score -= 25
      reasons.append("Website uses an IP address instead of a normal domain")

    # Too many hyphens
    if hostname.count("-") >= 2:
      score -= 10
      reasons.append("Domain contains multiple hyphens, which can look suspicious")

    # Too many numbers
    if sum(ch.isdigit() for ch in hostname) >= 4:
      score -= 10
      reasons.append("Domain contains many numeric characters")

    # Very long domain
    if len(hostname) > 30:
      score -= 10
      reasons.append("Domain name is unusually long")

    # Suspicious keywords
    found_keywords = [kw for kw in SUSPICIOUS_KEYWORDS if kw in url.lower()]
    if found_keywords:
      score -= 15
      reasons.append(
          "URL contains suspicious keywords: " + ", ".join(found_keywords[:4])
      )

    # Weak security score from your audit
    if security_score < 70:
      score -= 15
      reasons.append("Security score is below recommended level")

    # Weak performance can also be a minor signal
    if performance_score < 50:
      score -= 5
      reasons.append("Website performance is unusually poor")

    score = max(0, min(100, score))

    if score >= 75:
      status = "Safe"
    elif score >= 45:
      status = "Suspicious"
    else:
      status = "High Risk"

    if not reasons:
      reasons.append("No major suspicious indicators detected")

    return {
      "trust_score": score,
      "status": status,
      "reasons": reasons
    }
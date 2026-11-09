from database.db import get_connection
from controllers.performance_controller import get_performance_score
from services.ai_service import generate_ai_suggestions
from services.fake_site_detector import analyze_website_trust
import random


def run_audit(url, user_id=None):
    try:
        print("Starting audit for:", url)

        # ----------------------------
        # Get performance data
        # ----------------------------
        performance = get_performance_score(url) or {}
        performance_score = int(performance.get("score", 0))

        # ----------------------------
        # Dynamic Scores (temporary)
        # ----------------------------
        seo = int(random.randint(60, 95))
        accessibility = int(random.randint(50, 90))
        security = int(random.randint(55, 92))

        print("Scores:", performance_score, seo, accessibility, security)

        # ----------------------------
        # Website Trust / Fake or Real Check
        # ----------------------------
        website_trust = analyze_website_trust(
            url,
            performance_score=performance_score,
            security_score=security
        )

        print("Website Trust:", website_trust)

        # ----------------------------
        # AI Suggestions
        # ----------------------------
        ai_suggestions = generate_ai_suggestions(
            url,
            performance_score,
            seo,
            accessibility,
            security
        )

        print("AI Suggestions:", ai_suggestions)

        # ----------------------------
        # Strong fallback (if AI fails)
        # ----------------------------
        if (
            not ai_suggestions
            or not isinstance(ai_suggestions, dict)
            or "summary" not in ai_suggestions
        ):
            ai_suggestions = fallback_ai(
                performance_score,
                seo,
                accessibility,
                security
            )

        # ----------------------------
        # Save to database
        # ----------------------------
        conn = None
        try:
            conn = get_connection()
            c = conn.cursor()

            c.execute("""
                INSERT INTO reports (user_id, url, performance, seo, accessibility, security)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                user_id if user_id else 1,
                url,
                performance_score,
                seo,
                accessibility,
                security
            ))

            conn.commit()

        except Exception as db_error:
            print("DB Error:", db_error)

        finally:
            if conn:
                conn.close()

        # ----------------------------
        # Final Response
        # ----------------------------
        return {
            "performance": performance,
            "seo": seo,
            "accessibility": accessibility,
            "security": security,
            "website_trust": website_trust,
            "ai_suggestions": ai_suggestions
        }

    except Exception as e:
        print("Audit Error:", e)

        return {
            "performance": {"score": 0, "load_time_sec": 0, "status_code": 500},
            "seo": 0,
            "accessibility": 0,
            "security": 0,
            "website_trust": {
                "trust_score": 0,
                "status": "Unknown",
                "reasons": ["Could not evaluate website trust"]
            },
            "ai_suggestions": {
                "summary": "Audit failed due to an internal error.",
                "issues": ["Unable to analyze website"],
                "recommendations": ["Try again later"]
            }
        }


# ✅ SMART FALLBACK (NO RANDOM TEXT)
def fallback_ai(performance, seo, accessibility, security):
    issues = []
    recommendations = []

    if accessibility < 70:
        issues.append("Low accessibility score")
        recommendations.append("Improve accessibility (ARIA labels, contrast, alt text)")

    if security < 70:
        issues.append("Security score is below recommended level")
        recommendations.append("Add security headers and enforce HTTPS")

    if performance < 70:
        issues.append("Performance is below optimal level")
        recommendations.append("Optimize images and enable caching")

    if seo < 70:
        issues.append("SEO score needs improvement")
        recommendations.append("Use proper meta tags and structured data")

    if not issues:
        issues.append("Minor improvements possible")
        recommendations.append("Fine-tune performance and maintain best practices")

    return {
        "summary": "Automated analysis based on website scores.",
        "issues": issues[:3],
        "recommendations": recommendations[:3]
    }
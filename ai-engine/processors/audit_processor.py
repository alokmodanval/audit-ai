def process_audit_data(audit_data):
    """
    Converts raw audit scores into structured AI-friendly input
    """

    seo = audit_data.get("seo", 0)
    performance = audit_data.get("performance", 0)
    accessibility = audit_data.get("accessibility", 0)
    security = audit_data.get("security", 0)

    issues = []

    # ----------------------------
    # SEO Analysis
    # ----------------------------
    if seo < 50:
        issues.append("SEO score is very low. Improve meta tags, headings, and keywords.")
    elif seo < 80:
        issues.append("SEO can be improved by optimizing content and metadata.")

    # ----------------------------
    # Performance Analysis
    # ----------------------------
    if performance < 50:
        issues.append("Performance is poor. Optimize images, reduce JS, and use caching.")
    elif performance < 80:
        issues.append("Performance can be improved by optimizing load speed.")

    # ----------------------------
    # Accessibility Analysis
    # ----------------------------
    if accessibility < 50:
        issues.append("Accessibility issues detected. Add alt tags and improve HTML structure.")
    elif accessibility < 80:
        issues.append("Accessibility can be improved with better labeling and contrast.")

    # ----------------------------
    # Security Analysis
    # ----------------------------
    if security < 50:
        issues.append("Security is weak. Use HTTPS and proper security headers.")
    elif security < 80:
        issues.append("Security can be improved with better headers and protection.")

    # ----------------------------
    # Overall Summary
    # ----------------------------
    overall = (seo + performance + accessibility + security) / 4

    if overall >= 80:
        summary = "The website is well optimized with good overall performance."
    elif overall >= 50:
        summary = "The website is moderately optimized but needs improvements."
    else:
        summary = "The website requires significant improvements in multiple areas."

    return {
        "summary": summary,
        "issues": issues,
        "scores": {
            "seo": seo,
            "performance": performance,
            "accessibility": accessibility,
            "security": security,
            "overall": round(overall, 2)
        }
    }
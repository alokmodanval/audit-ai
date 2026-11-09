def format_ai_response(raw_text):
    """
    Converts raw AI text into structured format
    """

    if not raw_text:
        return {
            "summary": "",
            "issues": [],
            "recommendations": []
        }

    lines = raw_text.split("\n")

    summary = ""
    issues = []
    recommendations = []

    current_section = None

    for line in lines:
        line = line.strip()

        if not line:
            continue

        # Detect sections
        if "summary" in line.lower():
            current_section = "summary"
            continue
        elif "issues" in line.lower():
            current_section = "issues"
            continue
        elif "recommendation" in line.lower():
            current_section = "recommendations"
            continue

        # Assign content
        if current_section == "summary":
            summary += " " + line

        elif current_section == "issues":
            issues.append(line.replace("-", "").strip())

        elif current_section == "recommendations":
            recommendations.append(line.replace("-", "").strip())

    return {
        "summary": summary.strip(),
        "issues": issues,
        "recommendations": recommendations
    }


# ----------------------------
# Optional: Format final API output
# ----------------------------
def format_final_output(audit_data, ai_data):
    return {
        "scores": audit_data,
        "ai_analysis": ai_data
    }
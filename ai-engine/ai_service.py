import os

# Try importing OpenAI (optional)
try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    OPENAI_AVAILABLE = True
except:
    OPENAI_AVAILABLE = False

from processors.audit_processor import process_audit_data
from utils.formatter import format_ai_response


# ----------------------------
# Load Prompt Template
# ----------------------------
def load_prompt(template_name):
    path = os.path.join("prompt_templates", template_name)

    try:
        with open(path, "r") as file:
            return file.read()
    except:
        return ""


# ----------------------------
# Generate AI Suggestions
# ----------------------------
def generate_ai_suggestions(audit_data):
    """
    Main AI function
    """

    # Step 1: Process raw audit data
    processed = process_audit_data(audit_data)

    # Step 2: Load prompt
    prompt_template = load_prompt("audit_prompt.txt")

    prompt = prompt_template.format(
        seo=processed["scores"]["seo"],
        performance=processed["scores"]["performance"],
        accessibility=processed["scores"]["accessibility"],
        security=processed["scores"]["security"]
    )

    # ----------------------------
    # Case 1: OpenAI Available
    # ----------------------------
    if OPENAI_AVAILABLE:
        try:
            response = client.chat.completions.create(
                model="gpt-4.1-mini",
                messages=[
                    {"role": "system", "content": "You are a helpful audit assistant."},
                    {"role": "user", "content": prompt}
                ]
            )

            raw_text = response.choices[0].message.content

            return format_ai_response(raw_text)

        except Exception as e:
            return {
                "error": "AI failed",
                "details": str(e)
            }

    # ----------------------------
    # Case 2: Fallback (No API)
    # ----------------------------
    else:
        return {
            "summary": processed["summary"],
            "issues": processed["issues"],
            "recommendations": [
                "Improve SEO by adding meta tags",
                "Optimize images for better performance",
                "Use HTTPS and security headers",
                "Improve accessibility with proper labels"
            ]
        }
import requests
import json

OLLAMA_URL = "http://127.0.0.1:11434/api/generate"


def extract_json(text):
    try:
        start = text.find("{")
        end = text.rfind("}") + 1
        if start != -1 and end != -1:
            return text[start:end]
        return None
    except:
        return None


def clean_explanation_text(text):
    if not text:
        return "No explanation available."

    bad_markers = [
        "## Instruction",
        "Instruction 2",
        "More difficult",
        "Additional Constraints",
        "-----",
        "--- **Instruction",
    ]

    for marker in bad_markers:
        if marker in text:
            text = text.split(marker)[0].strip()

    text = text.replace("\n", " ").replace("  ", " ").strip()

    return text if text else "No explanation available."


def generate_ai_suggestions(url, performance, seo, accessibility, security):
    try:
        prompt = f"""
You are a website audit assistant.

Return ONLY valid JSON.
Do not include markdown.
Do not include extra instructions.
Do not include headings outside JSON.

Format:
{{
  "summary": "one short sentence",
  "issues": ["issue 1", "issue 2"],
  "recommendations": ["recommendation 1", "recommendation 2"]
}}

Data:
Performance: {performance}
SEO: {seo}
Accessibility: {accessibility}
Security: {security}
"""

        response = requests.post(
            OLLAMA_URL,
            json={
                "model": "phi3",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.2,
                    "num_predict": 180,
                },
            },
            timeout=120,
        )

        if response.status_code != 200:
            print("Ollama HTTP Error:", response.status_code, response.text)
            return fallback_response()

        data = response.json()
        content = data.get("response", "").strip()

        if not content:
            return fallback_response()

        json_text = extract_json(content)
        if not json_text:
            return fallback_response()

        parsed = json.loads(json_text)

        return {
            "summary": parsed.get("summary", "No summary available"),
            "issues": parsed.get("issues", []),
            "recommendations": parsed.get("recommendations", []),
        }

    except Exception as e:
        print("Ollama AI Error:", e)
        return fallback_response()


def explain_issue(issue):
    try:
        prompt = f"""
Explain this website audit point in very simple language.

Rules:
- Maximum 3 short sentences
- Plain text only
- No markdown
- No bullets
- No headings
- No extra instructions
- Do not mention prompts or constraints
- Do not add examples unless necessary

Audit point:
{issue}
"""

        response = requests.post(
            OLLAMA_URL,
            json={
                "model": "phi3",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.1,
                    "num_predict": 90,
                    "stop": [
                        "##",
                        "Instruction",
                        "-----",
                        "---",
                    ],
                },
            },
            timeout=60,
        )

        if response.status_code != 200:
            print("Explain HTTP Error:", response.status_code, response.text)
            return "Explanation not available."

        data = response.json()
        content = data.get("response", "").strip()

        return clean_explanation_text(content)

    except Exception as e:
        print("Explain Error:", e)
        return "Explanation not available."


def fallback_response():
    return {
        "summary": "AI suggestions unavailable.",
        "issues": [
            "AI model did not respond correctly"
        ],
        "recommendations": [
            "Ensure Ollama is running",
            "Run: ollama run phi3",
            "Check system RAM availability",
            "Try again after a few seconds"
        ],
    }
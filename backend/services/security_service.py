import requests

def analyze_security(url):
    score = 0

    # HTTPS check
    if url.startswith("https"):
        score += 50

    try:
        response = requests.get(url)
        headers = response.headers

        # Security headers
        if 'X-Frame-Options' in headers:
            score += 25

        if 'X-Content-Type-Options' in headers:
            score += 25

    except:
        pass

    return score
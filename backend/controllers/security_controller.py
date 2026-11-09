from services.security_service import analyze_security

def get_security_score(url):
    return analyze_security(url)
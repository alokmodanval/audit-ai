from services.accessibility_service import analyze_accessibility

def get_accessibility_score(html):
    return analyze_accessibility(html)
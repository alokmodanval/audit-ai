from services.seo_service import analyze_seo

def get_seo_score(html):
    return analyze_seo(html)
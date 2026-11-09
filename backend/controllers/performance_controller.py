from services.performance_service import analyze_performance

def get_performance_score(url):
    return analyze_performance(url)
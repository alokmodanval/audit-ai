import random

def analyze_lighthouse(url):
    """
    Simulated Lighthouse scores (for demo purposes)
    You can replace this later with real API
    """
    return {
        "performance": random.randint(60, 95),
        "seo": random.randint(60, 95),
        "accessibility": random.randint(60, 95),
        "best_practices": random.randint(60, 95)
    }
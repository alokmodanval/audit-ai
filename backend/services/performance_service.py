# backend/services/performance_service.py

import requests
from bs4 import BeautifulSoup

def analyze_performance(url):
    """
    Perform a simple performance audit.
    Returns a dictionary with dummy scores and metrics for now.
    Later you can integrate with Lighthouse or real performance tools.
    """
    try:
        # Basic request timing as a placeholder
        response = requests.get(url, timeout=10)
        status = response.status_code

        # Dummy performance metrics
        performance_data = {
            "status_code": status,
            "load_time_sec": response.elapsed.total_seconds(),
            "score": 85  # Placeholder score (0-100)
        }

        return performance_data

    except requests.exceptions.RequestException as e:
        print(f"Performance analysis error: {e}")
        return {
            "status_code": None,
            "load_time_sec": None,
            "score": 0,
            "error": str(e)
        }
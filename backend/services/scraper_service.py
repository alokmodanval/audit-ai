import requests

def get_html(url):
    try:
        response = requests.get(url, timeout=10)
        return response.text
    except:
        return None
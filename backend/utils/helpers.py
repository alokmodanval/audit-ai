def format_response(success=True, message="", data=None):
    return {
        "success": success,
        "message": message,
        "data": data
    }


def normalize_url(url):
    if not url.startswith("http"):
        return "https://" + url
    return url
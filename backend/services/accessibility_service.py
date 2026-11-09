from bs4 import BeautifulSoup

def analyze_accessibility(html):
    soup = BeautifulSoup(html, 'html.parser')
    score = 0

    # Image alt tags
    images = soup.find_all('img')
    if images:
        alt_count = sum(1 for img in images if img.get('alt'))
        score += int((alt_count / len(images)) * 40)

    # Labels for forms
    if soup.find_all('label'):
        score += 20

    # Buttons
    if soup.find_all('button'):
        score += 20

    # Language attribute
    if soup.html and soup.html.get('lang'):
        score += 20

    return min(score, 100)
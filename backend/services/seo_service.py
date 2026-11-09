from bs4 import BeautifulSoup

def analyze_seo(html):
    soup = BeautifulSoup(html, 'html.parser')
    score = 0

    # Title
    if soup.title and soup.title.string:
        score += 20

    # Meta description
    if soup.find('meta', attrs={'name': 'description'}):
        score += 20

    # H1 tags
    if soup.find_all('h1'):
        score += 20

    # Image alt tags
    images = soup.find_all('img')
    if images:
        alt_count = sum(1 for img in images if img.get('alt'))
        score += int((alt_count / len(images)) * 20)

    # Links
    if len(soup.find_all('a')) > 5:
        score += 20

    return min(score, 100)
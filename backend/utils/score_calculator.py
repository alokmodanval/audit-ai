def calculate_overall_score(seo, performance, accessibility, security):
    try:
        total = (seo + performance + accessibility + security) / 4
        return round(total, 2)
    except:
        return 0
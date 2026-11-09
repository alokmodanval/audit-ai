import re


# ----------------------------
# URL Validator
# ----------------------------
def is_valid_url(url):
    pattern = re.compile(
        r'^(https?:\/\/)?'  # http or https
        r'([\w\-]+\.)+[\w\-]+'  # domain
        r'(\:[0-9]+)?(\/.*)?$'  # port and path
    )
    return re.match(pattern, url) is not None


# ----------------------------
# Email Validator
# ----------------------------
def is_valid_email(email):
    pattern = re.compile(
        r'^[\w\.-]+@[\w\.-]+\.\w+$'
    )
    return re.match(pattern, email) is not None


# ----------------------------
# Password Validator
# ----------------------------
def is_strong_password(password):
    return (
        len(password) >= 6 and
        any(char.isdigit() for char in password) and
        any(char.isalpha() for char in password)
    )
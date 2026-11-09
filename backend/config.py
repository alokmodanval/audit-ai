import os

# =========================
# Base Configuration
# =========================
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    DEBUG = True

    # Database
    DATABASE = os.getenv("DATABASE_URL", "audit.db")

    # API Keys (for future use)
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    LIGHTHOUSE_API_KEY = os.getenv("LIGHTHOUSE_API_KEY", "")

    # App Settings
    APP_NAME = "Audit AI"
    VERSION = "1.0.0"


# =========================
# Development Config
# =========================
class DevelopmentConfig(Config):
    DEBUG = True


# =========================
# Production Config
# =========================
class ProductionConfig(Config):
    DEBUG = False


# =========================
# Select Active Config
# =========================
config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}
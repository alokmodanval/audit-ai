-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- REPORTS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    url TEXT NOT NULL,
    performance INTEGER,
    seo INTEGER,
    accessibility INTEGER,
    security INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================
-- OPTIONAL: AUDIT DETAILS TABLE
-- (For storing detailed results)
-- =========================
CREATE TABLE IF NOT EXISTS audit_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id INTEGER,
    issue_type TEXT,
    issue_description TEXT,
    recommendation TEXT,

    FOREIGN KEY (report_id) REFERENCES reports(id)
);
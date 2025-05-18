import sqlite3
import smtplib
import time
import re
from email.mime.text import MIMEText

DB_PATH = "dns_logs.db"
EMAIL_FROM = "dns-alert@yourdomain.com"
EMAIL_TO = "admin@yourdomain.com"
SMTP_HOST = "smtp.yourdomain.com"
SMTP_PORT = 587
SMTP_USER = "dns-alert@yourdomain.com"
SMTP_PASS = "yourpassword"

INTERVAL = 60
SUSPICIOUS_PATTERN = re.compile(r"\.(onion|exe|apk|ru|top|zip|click|crypto|pw)$", re.IGNORECASE)
sent_cache = set()

while True:
    try:
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute("SELECT id, timestamp, query, client FROM logs ORDER BY id DESC LIMIT 200")
        for row in cur.fetchall():
            log_id, ts, query, client = row
            if log_id in sent_cache:
                continue
            if SUSPICIOUS_PATTERN.search(query):
                msg = MIMEText(f"Suspicious DNS Query:\n\nTime: {ts}\nClient: {client}\nQuery: {query}")
                msg["Subject"] = "[DNS Alert] Suspicious Query"
                msg["From"] = EMAIL_FROM
                msg["To"] = EMAIL_TO

                with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                    server.starttls()
                    server.login(SMTP_USER, SMTP_PASS)
                    server.sendmail(EMAIL_FROM, EMAIL_TO, msg.as_string())
                sent_cache.add(log_id)
    except Exception as e:
        print("[ERROR]", e)
    time.sleep(INTERVAL)

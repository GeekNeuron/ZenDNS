import sqlite3
import time
import requests
import re

DB_PATH = "dns_logs.db"
TELEGRAM_TOKEN = "your_bot_token"
CHAT_ID = "your_chat_id"
INTERVAL = 60

SUSPICIOUS_PATTERN = re.compile(r"\.(onion|exe|apk|ru|top|zip|click|crypto|pw)$", re.IGNORECASE)
sent_cache = set()

while True:
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("SELECT id, timestamp, query, client FROM logs ORDER BY id DESC LIMIT 200")
        for row in c.fetchall():
            log_id, ts, query, client = row
            if log_id in sent_cache:
                continue
            if SUSPICIOUS_PATTERN.search(query):
                msg = f"⚠ Suspicious DNS Query\nTime: {ts}\nClient: {client}\nQuery: {query}"
                requests.post(
                    f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
                    data={"chat_id": CHAT_ID, "text": msg}
                )
                sent_cache.add(log_id)
    except Exception as e:
        print("[ERROR]", e)
    time.sleep(INTERVAL)

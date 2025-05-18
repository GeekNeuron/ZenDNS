import sqlite3
import time

conn = sqlite3.connect("dns_logs.db")
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    client TEXT,
    query TEXT,
    blocked INTEGER DEFAULT 0
)''')
conn.commit()
print("[INFO] Log store initialized...")

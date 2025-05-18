# مسیر: backend/analytics_api.py
from fastapi import APIRouter
import sqlite3
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/analytics/queries-per-hour")
def queries_per_hour():
    conn = sqlite3.connect("dns_logs.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    now = datetime.utcnow()
    data = []
    for i in range(12):
        start = now - timedelta(hours=i+1)
        end = now - timedelta(hours=i)
        count = cur.execute("""
            SELECT COUNT(*) FROM logs
            WHERE timestamp BETWEEN ? AND ?
        """, (start.isoformat(), end.isoformat())).fetchone()[0]
        data.append({"hour": f"{end.hour}:00", "queries": count})

    return list(reversed(data))

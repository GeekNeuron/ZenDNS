from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse, StreamingResponse
import sqlite3
import csv
import io

app = FastAPI()

def query_logs(q=None, ip=None):
    conn = sqlite3.connect("dns_logs.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    sql = "SELECT * FROM logs WHERE 1=1"
    params = []

    if q:
        sql += " AND query LIKE ?"
        params.append(f"%{q}%")
    if ip:
        sql += " AND client = ?"
        params.append(ip)

    sql += " ORDER BY id DESC LIMIT 300"
    rows = cur.execute(sql, params).fetchall()
    return [dict(r) for r in rows]

@app.get("/logs")
def get_logs(q: str = Query(None), ip: str = Query(None)):
    return query_logs(q, ip)

@app.get("/export")
def export_csv():
    logs = query_logs()
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["timestamp", "client", "query", "blocked"])
    writer.writeheader()
    writer.writerows(logs)
    return StreamingResponse(io.BytesIO(output.getvalue().encode()), media_type="text/csv")

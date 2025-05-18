import asyncio
import sqlite3
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
clients = set()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.add(websocket)
    try:
        while True:
            await asyncio.sleep(2)
            logs = get_latest_logs()
            await websocket.send_text(json.dumps(logs))
    except WebSocketDisconnect:
        clients.remove(websocket)

def get_latest_logs():
    conn = sqlite3.connect("dns_logs.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    rows = cur.execute("SELECT * FROM logs ORDER BY id DESC LIMIT 10").fetchall()
    return [dict(r) for r in rows]

if __name__ == "__main__":
    uvicorn.run("realtime_ws:app", host="0.0.0.0", port=9001)

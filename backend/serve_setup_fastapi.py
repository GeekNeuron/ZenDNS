from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()
app.mount("/setup", StaticFiles(directory="public", html=True), name="setup")

@app.get("/")
def index():
    return {"message": "ZenDNS API Root"}

if __name__ == "__main__":
    uvicorn.run("serve_setup_fastapi:app", host="0.0.0.0", port=8088)

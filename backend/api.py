# File: backend/api.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from analytics_api import router as analytics_router
# from filters_api import router as filters_router  ← اضافه می‌شود در مرحله بعد

app = FastAPI(title="ZenDNS API", version="1.0")

# Optional: برای پشتیبانی از frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root
@app.get("/")
def root():
    return {"message": "ZenDNS API root"}

# Routers
app.include_router(analytics_router, prefix="/analytics")
# app.include_router(filters_router, prefix="/filters") ← بعداً فعال می‌شود

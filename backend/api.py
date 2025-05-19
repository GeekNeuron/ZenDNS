from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from analytics_api import router as analytics_router
from filters_api import router as filters_router

app = FastAPI(title="ZenDNS API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "ZenDNS API root"}

app.include_router(analytics_router, prefix="/analytics")
app.include_router(filters_router, prefix="/filters")

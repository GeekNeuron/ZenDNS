from fastapi import APIRouter, HTTPException
import json
from typing import List
from pathlib import Path

router = APIRouter()
FILTER_FILE = Path("public/filters.json")

if not FILTER_FILE.exists():
    FILTER_FILE.write_text(json.dumps({"block": [], "allow": []}, indent=2))

def load_filters():
    return json.loads(FILTER_FILE.read_text())

def save_filters(data):
    FILTER_FILE.write_text(json.dumps(data, indent=2))

@router.get("/list")
def list_all():
    return load_filters()

@router.post("/block")
def block_domain(domain: str):
    data = load_filters()
    if domain in data["block"]:
        raise HTTPException(400, detail="Already blocked")
    data["block"].append(domain)
    save_filters(data)
    return {"status": "blocked", "domain": domain}

@router.post("/allow")
def allow_domain(domain: str):
    data = load_filters()
    if domain in data["allow"]:
        raise HTTPException(400, detail="Already allowed")
    data["allow"].append(domain)
    save_filters(data)
    return {"status": "allowed", "domain": domain}

@router.delete("/block")
def unblock_domain(domain: str):
    data = load_filters()
    if domain not in data["block"]:
        raise HTTPException(404, detail="Not found")
    data["block"].remove(domain)
    save_filters(data)
    return {"status": "unblocked", "domain": domain}

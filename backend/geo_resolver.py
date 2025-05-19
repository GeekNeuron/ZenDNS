# File: backend/geo_resolver.py
import geoip2.database

reader = geoip2.database.Reader("GeoLite2-City.mmdb")

def get_country(ip: str) -> str:
    try:
        response = reader.city(ip)
        return response.country.iso_code or "UNKNOWN"
    except:
        return "UNKNOWN"

def get_location(ip: str) -> dict:
    try:
        response = reader.city(ip)
        return {
            "ip": ip,
            "country": response.country.iso_code,
            "city": response.city.name,
            "lat": response.location.latitude,
            "lon": response.location.longitude
        }
    except:
        return {"ip": ip, "country": "UNKNOWN"}

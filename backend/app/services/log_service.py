from app.core.database import db
from datetime import datetime

log_collection = db["logs"]

async def log_event(data: dict):
    print("🔥 log_event called with:", data)   # 👈 ADD THIS
    data["timestamp"] = datetime.utcnow()
    await log_collection.insert_one(data)
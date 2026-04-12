#connnecting with mongodb and its value getting store
from app.core.database import db


user_collection=db["users"]

async def user_collection_data(user_data:dict):



    # Check the user is still exits or not?this is the first part to check of the user existence
    existing_users= await user_collection.find_one({
        "email":user_data.get("email")
    })


    if existing_users:
        return "User Already Exists"

    # insert if not exists the user
    result=await user_collection.insert_one(user_data)
    return str(result.inserted_id)
    

from app.core.database import db

enrollment_users=db["enrollments"]

async def  enroll_user(user_data:dict):

    result=await enrollment_users.insert_one(user_data)

    return{
        "Message":"User enrolled sucessfully",
        "id":str(result.inserted_id)
    }
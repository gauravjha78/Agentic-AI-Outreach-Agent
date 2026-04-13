from fastapi import FastAPI
from app.core.config import settings
from app.core.database import db
from app.models.user_profile import Profile

from app.services.user_services import user_collection_data


from app.services.segmentation_service import segment_users


from app.agents.targeting_agents import targeting_agents

from app.agents.campaign_agents import campaing_agents

from app.agents.outreach_agents import out_reach_agent

from app.agents.enrollment_agent import enroll_user

from app.models.enrollment_model import Enrollment

# Now to connect the frontend and backend so we will use the CORS to connect it smoothly ok
from fastapi.middleware.cors import CORSMiddleware

# Use HttpExtention for validation in insert part
from fastapi import HTTPException

# Now putting the new data which is segments
from app.services.segmentation_service import segment_user

# Now about the Email which i have to send to the user
from app.services.email_service import send_emails

# Background Task use FastaAPI background task so that the AI message will work on background
from fastapi import BackgroundTasks

#Chat bot
from app.services.chat_service import chat_with_ai
from pydantic import BaseModel

# log events
from app.services.log_service import log_event


app=FastAPI(title="This is the test command")

@app.get("/")
async def check():
    return {"Server build sucuessful"}

@app.get("/health")
async def health():
    return {"Status: ok"}


# checking our env is working fine or not
@app.get("/model")
async def model():
    return {
        "model-name":{settings.MODEL},
        "database":{settings.DATABASE_NAME}
    }


# checking the connection between the mongoDB and our code

@app.get("/database")
async def database():
    collection= await db.list_collection_names()
    return{
        "collection":collection
    }

#checking the pydantic is working or not

@app.post("/profile")
async def profile(user:Profile):
    return {
        "User create: Successfully"
        "Proile user":user
    }




async def send_ai_email(user):

    print("🔥 send_ai_email running")

    # check if AI g=failed to generate the text my custom chat will come.

    try:
        ai_response = await out_reach_agent(user)

# 👉 Handle list response from AI
        # if isinstance(ai_response, list):
        #     ai_message = ai_response[0].get("message", "")
        # else:
        #     ai_message = ai_response
        ai_message=ai_response

# 👉 Clean unwanted "Subject:" if present
        if "Subject:" in ai_message:
            ai_message = ai_message.split("\n", 1)[-1].strip()
            

        print("🔥 AI success")

        await log_event({
            "type": "AI_SUCCESS",
            "email": user["email"]
        })

    except Exception as e:
        print("🔥 AI failed", e)

        ai_message = f"""
Hey {user['name']},

Thanks for showing interest in {user['interest']} 🚀

Visit our website to learn more.

– Team
{user['name']}
"""

        await log_event({
            "type": "AI_FAILED",
            "email": user["email"],
            "error": str(e)
        })

    send_emails(
        to_email=user["email"],
        subject="Welcome 🚀",
        body=ai_message
    )

    print("🔥 Email sent")

    await log_event({
        "type": "EMAIL_SENT",
        "email": user["email"]
    })


@app.post("/insert")
async def insert(user:Profile, background_task:BackgroundTasks):

    value=user.dict()

    # Use the method to put the segment coloumn in the data-base

    # 1.Create the segment
    segment=segment_user(value)
    #2 . Data in Segment
    value["segment"]=segment


    # Put the validation if some unduthorize user click on it without any value inserted it will throw error to them
    if not value["name"].strip() or not value["interest"].strip() or not value["location"].strip():
        raise HTTPException(status_code=400 , detail="All the feild are required..")
    

    user_id=await user_collection_data(value)
# Background working Task
    background_task.add_task(send_ai_email,value)

    return {
        "MongoDB connected sucessfully"
        "user id":user_id,
        "segment":segment
    }




# Taking the segments from the user based on interest
@app.get("/segments")
async def segments():
    
    get_segments=await segment_users()
    return {"user based on list are":get_segments}
    


@app.get("/agent")
async def agent():

    result=await targeting_agents()
    
    return {
        "result of the AI response is":result
    }


@app.get("/campain")
async def campain():
    result =await campaing_agents()

    return{
        "Campain Agent":result
    }


@app.get("/outreach")
async def outreach():
    result= await out_reach_agent()

    return{
        "oureach":result
    }


@app.post("/enroll")
async def enroll(data:Enrollment):
    value=await enroll_user(data.dict())
    return value



# Chat Bot
class ChatRequest(BaseModel):
    message:str

@app.post("/chat")
async def chat(request:ChatRequest):
    reply=await chat_with_ai(request.message)
    return {"reply":reply}


# Connecting the frontend and backend

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # this is frontend URL "http://localhost:3000" so now "*" will allow all origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# this is where i will store and check the monitoring system so that i can count the number of user register
# also to check how many email did we send and how many AI have send

@app.get("/stats")
async def get_stats():
    total_users=await db["users"].count_documents({})
    emails_sent = await db["logs"].count_documents({"type": "EMAIL_SENT"})
    ai_failed = await db["logs"].count_documents({"type": "AI_FAILED"})
    ai_success = await db["logs"].count_documents({"type": "AI_SUCCESS"})

    return{
        "total_users":total_users,
        "emails_send":emails_sent,
        "ai_failed":ai_failed,
        "ai_sucess":ai_success
    }

@app.get("/logs")
async def logs():

    result = []

    async for log in db["logs"].find().sort("timestamp", -1):
        log["_id"] = str(log["_id"])
        result.append(log)

    return {"logs": result}
    
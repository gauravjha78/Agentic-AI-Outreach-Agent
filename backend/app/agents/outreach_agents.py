from openai import OpenAI
from app.core.config import settings
from app.agents.campaign_agents import campaing_agents
from app.core.database import db

client = OpenAI(
    base_url=settings.OPENROUTER_BASE_URL,
    api_key=settings.OPENROUTER_API_KEY,
)

user_collections = db["users"]

async def out_reach_agent(user):

    campaign = await campaing_agents()

    # users=[]
    # async for user in user_collections.find():
    #     users.append(user)

    # messages=[]
    # for user in users:

    prompt = f""" 
You are an outreach assistant.

Write a SHORT and CLEAN email (max 4-5 lines).

Campaign:
{campaign}

User:
Name: {user.get("name")}
Interest: {user.get("interest")}
Segment: {user.get("segment")}

Rules:
- Start the email with: Hi {user.get("name")}
- Do NOT use any other name
- Do NOT use placeholders
- Keep it under 80 words
- Make it friendly and simple
- Add a clear call to action

Generate only the email message.
"""
        
    response = client.chat.completions.create(
        model=settings.MODEL,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    # ❌ old logic (batch mode)
    # messages.append({
    #     "message": response.choices[0].message.content
    # })
    # return messages

    # ✅ correct logic (single user)
    return response.choices[0].message.content
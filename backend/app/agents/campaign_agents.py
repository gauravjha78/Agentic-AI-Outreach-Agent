from openai import OpenAI
from app.core.config import settings
from app.agents.targeting_agents import targeting_agents

openai=OpenAI(
    base_url=settings.OPENROUTER_BASE_URL,
    api_key=settings.OPENROUTER_API_KEY,
)

async def campaing_agents():

    result=await targeting_agents()

    prompt = f"""
    You are a campaign strategist.

    Based on this targeting result:

    {result}

Generate:
    1. Campaign Name
    2. Target Audience
    3. Campaign Message
    4. Call to Action



    """

    response=openai.chat.completions.create(
    model=settings.MODEL,
    messages=[
        {"role":"user","content":prompt}
    ]
)
    return response.choices[0].message.content
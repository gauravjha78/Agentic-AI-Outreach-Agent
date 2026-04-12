from openai import OpenAI
from app.core.config import settings
from app.services.segmentation_service import segment_users


# Create the AI agent

client=OpenAI(
    base_url=settings.OPENROUTER_BASE_URL,
    api_key=settings.OPENROUTER_API_KEY
)

async def targeting_agents():

    segments= await segment_users()

    prompt=f"""
    You are a AI targeting expert.

    Analyze this user segments and select the best targeting audience.

    Segments:
    {segments}

    Return the best segment and explain why.
    """

    response=client.chat.completions.create(
        model=settings.MODEL,
        messages=[
            {"role":"user","content":prompt}
        ]
    )

    return response.choices[0].message.content
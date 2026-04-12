from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from app.core.config import settings

# Initialize LLM
llm = ChatOpenAI(
    base_url=settings.OPENROUTER_BASE_URL,
    api_key=settings.OPENROUTER_API_KEY,
    model=settings.MODEL
)

async def chat_with_ai(user_message: str):

    system_prompt = """
You are a smart AI assistant for a tech learning platform.

You help users with:
- AI / Machine Learning
- Web Development (React, Next.js, etc.)
- Backend (FastAPI, Node.js)
- DevOps & Cloud
- Career guidance in tech
- Enrollment help

Rules:
- Keep answers short (3-5 lines)
- Use line breaks for readability
- Be friendly and practical
- Suggest next steps or learning path
- Use **bold** for important terms
- If user is confused, guide them clearly
"""

    response = llm.invoke([
        HumanMessage(content=system_prompt + "\nUser: " + user_message)
    ])

    return response.content
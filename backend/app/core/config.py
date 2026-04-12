from dotenv import load_dotenv
import os

load_dotenv()

class Settings:

    OPENROUTER_API_KEY=os.getenv("OPENROUTER_API_KEY")
    OPENROUTER_BASE_URL=os.getenv("OPENROUTER_BASE_URL")
    MODEL=os.getenv("MODEL")

    MONGO_URL=os.getenv("MONGO_URL")
    DATABASE_NAME=os.getenv("DATABASE_NAME")

    
settings=Settings()



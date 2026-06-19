import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel, HttpUrl

# Load environment variables from .env file
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

class Settings(BaseModel):
    BASE_URL: str = os.getenv("BASE_URL", "https://httpbin.org")
    TIMEOUT: int = int(os.getenv("TIMEOUT", "10"))

settings = Settings()
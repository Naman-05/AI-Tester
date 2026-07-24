import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel, Field

# Load environment variables from .env file
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)


class Settings(BaseModel):
    """Application settings loaded from .env with defaults."""

    BASE_URL: str = Field(default="https://jsonplaceholder.typicode.com", alias="BASE_URL")
    TIMEOUT: int = Field(default=10, alias="TIMEOUT")
    LOG_LEVEL: str = Field(default="INFO", alias="LOG_LEVEL")


settings = Settings()

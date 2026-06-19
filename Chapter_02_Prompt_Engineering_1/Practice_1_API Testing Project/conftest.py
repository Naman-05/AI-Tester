import pytest
from config import settings
from client.api_client import APIClient

@pytest.fixture(scope="session")
def api_client():
    """Provides a configured, reusable instance of the API client."""
    return APIClient(base_url=settings.BASE_URL, timeout=settings.TIMEOUT)
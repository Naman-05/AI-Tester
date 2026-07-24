import pytest
from config import settings
from core.api_client import APIClient
from core.utils import setup_logger, load_json_file, load_json_list
from pages.users_api import UsersAPI
from pages.posts_api import PostsAPI


@pytest.fixture(scope="session")
def api_client():
    """Provides a configured, reusable instance of the API client."""
    client = APIClient(base_url=settings.BASE_URL, timeout=settings.TIMEOUT)
    yield client
    client.close()


@pytest.fixture(scope="session")
def logger():
    """Provides a configured logger instance."""
    return setup_logger(
        name="api_framework",
        log_file="logs/framework.log",
        level=settings.LOG_LEVEL,
    )


@pytest.fixture(scope="session")
def users_api(api_client):
    """Provides a UsersAPI page object instance."""
    return UsersAPI(client=api_client)


@pytest.fixture(scope="session")
def posts_api(api_client):
    """Provides a PostsAPI page object instance."""
    return PostsAPI(client=api_client)


@pytest.fixture(scope="session")
def valid_users():
    """Load valid user test data from fixtures."""
    return load_json_list("fixtures/valid_users.json")


@pytest.fixture(scope="session")
def invalid_users():
    """Load invalid user test data from fixtures."""
    return load_json_list("fixtures/invalid_users.json")


@pytest.fixture(scope="session")
def posts():
    """Load post test data from fixtures."""
    return load_json_list("fixtures/posts.json")

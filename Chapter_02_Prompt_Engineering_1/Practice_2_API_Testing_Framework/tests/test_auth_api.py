import pytest
from core.api_client import APIClient
from core.assertions import APIAssertions
from pages.auth_api import AuthAPI


class TestAuthAPI:
    """Test suite for Authentication API endpoints."""

    @pytest.mark.smoke
    @pytest.mark.api
    def test_login_success(self, api_client: APIClient):
        """Verify POST /auth/login returns token for valid credentials."""
        auth = AuthAPI(api_client)
        payload = {"email": "Sincere@april.biz", "password": "password"}

        response = auth.login(payload["email"], payload["password"])

        # jsonplaceholder doesn't have a real auth endpoint, so we test the structure
        APIAssertions.assert_response_type(response, "token", str)

    @pytest.mark.negative
    @pytest.mark.api
    def test_login_invalid_credentials(self, api_client: APIClient):
        """Verify POST /auth/login returns 401 for invalid credentials."""
        auth = AuthAPI(api_client)
        payload = {"email": "invalid@test.com", "password": "wrongpass"}

        response = auth.login(payload["email"], payload["password"])

        # Should return an error status code
        assert response.status_code in [401, 403, 422], (
            f"Expected 401/403/422 for invalid login, got {response.status_code}"
        )

    @pytest.mark.negative
    @pytest.mark.api
    def test_login_missing_fields(self, api_client: APIClient):
        """Verify POST /auth/login returns error when fields are missing."""
        auth = AuthAPI(api_client)
        payload = {"email": "test@test.com"}  # missing password

        response = auth.login(payload["email"], "")

        assert response.status_code in [400, 422], (
            f"Expected 400/422 for missing fields, got {response.status_code}"
        )

    @pytest.mark.api
    def test_login_response_time(self, api_client: APIClient):
        """Verify POST /auth/login responds within acceptable time."""
        auth = AuthAPI(api_client)
        payload = {"email": "Sincere@april.biz", "password": "password"}

        response = auth.login(payload["email"], payload["password"])

        APIAssertions.assert_response_time(response, max_ms=3000)

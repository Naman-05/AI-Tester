import pytest
from core.api_client import APIClient
from core.assertions import APIAssertions
from pages.users_api import UsersAPI


class TestUsersAPI:
    """Comprehensive test suite for Users API endpoints."""

    @pytest.mark.smoke
    @pytest.mark.api
    def test_get_all_users(self, api_client: APIClient, users_api: UsersAPI):
        """Verify GET /users returns a list of users with status 200."""
        response = users_api.get_all_users()

        APIAssertions.assert_status_code(response, 200)
        APIAssertions.assert_response_type(response, "users", list)
        APIAssertions.assert_response_time(response, max_ms=3000)

        assert len(response.json()["users"]) > 0, "Users list should not be empty"

    @pytest.mark.smoke
    @pytest.mark.api
    def test_get_user_by_id(self, api_client: APIClient, users_api: UsersAPI):
        """Verify GET /users/{id} returns a single user with status 200."""
        response = users_api.get_user_by_id(1)

        APIAssertions.assert_status_code(response, 200)
        APIAssertions.assert_response_key(response, "id")
        APIAssertions.assert_response_value(response, "id", 1)
        APIAssertions.assert_response_key(response, "name")
        APIAssertions.assert_response_key(response, "email")

    @pytest.mark.smoke
    @pytest.mark.api
    def test_get_user_by_id_not_found(self, api_client: APIClient, users_api: UsersAPI):
        """Verify GET /users/{id} returns 404 for non-existent user."""
        response = users_api.get_user_by_id(9999)

        APIAssertions.assert_status_code(response, 404)

    @pytest.mark.regression
    @pytest.mark.api
    def test_create_user(self, api_client: APIClient, users_api: UsersAPI):
        """Verify POST /users creates a new user with status 201."""
        payload = {
            "name": "John Doe",
            "username": "johndoe",
            "email": "john.doe@example.com",
            "address": {
                "street": "123 Main St",
                "suite": "Apt. 456",
                "city": "New York",
                "zipcode": "10001",
                "geo": {"lat": "40.7128", "lng": "-74.0060"},
            },
            "phone": "555-0100",
            "website": "johndoe.com",
            "company": {
                "name": "Test Corp",
                "catchPhrase": "Testing API endpoints",
                "bs": "test-driven development",
            },
        }

        response = users_api.create_user(payload)

        APIAssertions.assert_status_code(response, 201)
        APIAssertions.assert_response_key(response, "id")
        APIAssertions.assert_response_value(response, "name", "John Doe")
        APIAssertions.assert_response_value(response, "username", "johndoe")
        APIAssertions.assert_response_value(response, "email", "john.doe@example.com")
        APIAssertions.assert_response_type(response, "id", int)

    @pytest.mark.regression
    @pytest.mark.api
    def test_update_user_full(self, api_client: APIClient, users_api: UsersAPI):
        """Verify PUT /users/{id} fully updates a user with status 200."""
        payload = {
            "name": "Jane Smith Updated",
            "username": "janesmith_updated",
            "email": "jane.smith@example.com",
        }

        response = users_api.update_user(1, payload)

        APIAssertions.assert_status_code(response, 200)
        APIAssertions.assert_response_value(response, "name", "Jane Smith Updated")
        APIAssertions.assert_response_value(response, "username", "janesmith_updated")
        APIAssertions.assert_response_value(response, "email", "jane.smith@example.com")

    @pytest.mark.regression
    @pytest.mark.api
    def test_update_user_partial(self, api_client: APIClient, users_api: UsersAPI):
        """Verify PATCH /users/{id} partially updates a user with status 200."""
        payload = {"name": "Jane Smith Patched"}

        response = users_api.patch_user(1, payload)

        APIAssertions.assert_status_code(response, 200)
        APIAssertions.assert_response_value(response, "name", "Jane Smith Patched")

    @pytest.mark.regression
    @pytest.mark.api
    def test_delete_user(self, api_client: APIClient, users_api: UsersAPI):
        """Verify DELETE /users/{id} deletes a user with status 200."""
        response = users_api.delete_user(1)

        APIAssertions.assert_status_code(response, 200)
        APIAssertions.assert_response_value(response, "name", "Jane Smith Patched")

    @pytest.mark.negative
    @pytest.mark.api
    def test_create_user_with_invalid_data(self, api_client: APIClient, users_api: UsersAPI):
        """Verify POST /users returns 422 for invalid payload."""
        payload = {"name": ""}

        response = users_api.create_user(payload)

        APIAssertions.assert_status_code(response, 422)

    @pytest.mark.api
    def test_get_users_response_time(self, api_client: APIClient, users_api: UsersAPI):
        """Verify GET /users responds within acceptable time."""
        response = users_api.get_all_users()

        APIAssertions.assert_response_time(response, max_ms=3000)
        APIAssertions.assert_json_is_valid(response)

    @pytest.mark.api
    def test_get_user_response_headers(self, api_client: APIClient, users_api: UsersAPI):
        """Verify GET /users/{id} returns correct content-type header."""
        response = users_api.get_user_by_id(1)

        APIAssertions.assert_header(response, "Content-Type", "application/json; charset=utf-8")

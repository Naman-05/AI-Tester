import pytest
from core.api_client import APIClient
from core.assertions import APIAssertions


class TestErrorHandling:
    """Negative test cases for error handling and edge scenarios."""

    @pytest.mark.negative
    @pytest.mark.api
    def test_invalid_endpoint_returns_404(self, api_client: APIClient):
        """Verify accessing a non-existent endpoint returns 404."""
        response = api_client.get("nonexistent/endpoint")

        APIAssertions.assert_status_code(response, 404)

    @pytest.mark.negative
    @pytest.mark.api
    def test_get_non_existent_user(self, api_client: APIClient):
        """Verify GET /users/{id} returns 404 for non-existent user."""
        response = api_client.get("users/9999")

        APIAssertions.assert_status_code(response, 404)

    @pytest.mark.negative
    @pytest.mark.api
    def test_get_non_existent_post(self, api_client: APIClient):
        """Verify GET /posts/{id} returns 404 for non-existent post."""
        response = api_client.get("posts/9999")

        APIAssertions.assert_status_code(response, 404)

    @pytest.mark.negative
    @pytest.mark.api
    def test_create_user_with_empty_body(self, api_client: APIClient):
        """Verify POST /users with empty body returns 422."""
        response = api_client.post("users", json_data={})

        APIAssertions.assert_status_code(response, 422)

    @pytest.mark.negative
    @pytest.mark.api
    def test_create_post_with_empty_body(self, api_client: APIClient):
        """Verify POST /posts with empty body returns 422."""
        response = api_client.post("posts", json_data={})

        APIAssertions.assert_status_code(response, 422)

    @pytest.mark.negative
    @pytest.mark.api
    def test_delete_non_existent_user(self, api_client: APIClient):
        """Verify DELETE /users/{id} for non-existent user returns 404."""
        response = api_client.delete("users/9999")

        APIAssertions.assert_status_code(response, 404)

    @pytest.mark.negative
    @pytest.mark.api
    def test_delete_non_existent_post(self, api_client: APIClient):
        """Verify DELETE /posts/{id} for non-existent post returns 404."""
        response = api_client.delete("posts/9999")

        APIAssertions.assert_status_code(response, 404)

    @pytest.mark.api
    def test_response_content_type_is_json(self, api_client: APIClient):
        """Verify GET /users returns application/json content type."""
        response = api_client.get("users")

        APIAssertions.assert_header(response, "Content-Type", "application/json; charset=utf-8")

    @pytest.mark.api
    def test_response_is_valid_json(self, api_client: APIClient):
        """Verify GET /users returns valid JSON body."""
        response = api_client.get("users")

        APIAssertions.assert_json_is_valid(response)

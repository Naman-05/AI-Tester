import pytest
from core.api_client import APIClient
from core.assertions import APIAssertions
from pages.posts_api import PostsAPI


class TestPostsAPI:
    """Comprehensive test suite for Posts API endpoints."""

    @pytest.mark.smoke
    @pytest.mark.api
    def test_get_all_posts(self, api_client: APIClient, posts_api: PostsAPI):
        """Verify GET /posts returns a list of posts with status 200."""
        response = posts_api.get_all_posts()

        APIAssertions.assert_status_code(response, 200)
        APIAssertions.assert_response_type(response, "posts", list)
        APIAssertions.assert_response_time(response, max_ms=3000)

        assert len(response.json()["posts"]) > 0, "Posts list should not be empty"

    @pytest.mark.smoke
    @pytest.mark.api
    def test_get_post_by_id(self, api_client: APIClient, posts_api: PostsAPI):
        """Verify GET /posts/{id} returns a single post with status 200."""
        response = posts_api.get_post_by_id(1)

        APIAssertions.assert_status_code(response, 200)
        APIAssertions.assert_response_key(response, "id")
        APIAssertions.assert_response_value(response, "id", 1)
        APIAssertions.assert_response_key(response, "title")
        APIAssertions.assert_response_key(response, "body")

    @pytest.mark.smoke
    @pytest.mark.api
    def test_get_post_by_id_not_found(self, api_client: APIClient, posts_api: PostsAPI):
        """Verify GET /posts/{id} returns 404 for non-existent post."""
        response = posts_api.get_post_by_id(9999)

        APIAssertions.assert_status_code(response, 404)

    @pytest.mark.regression
    @pytest.mark.api
    def test_create_post(self, api_client: APIClient, posts_api: PostsAPI):
        """Verify POST /posts creates a new post with status 201."""
        payload = {
            "title": "Test Post Title",
            "body": "This is the body of the test post.",
            "userId": 1,
        }

        response = posts_api.create_post(payload)

        APIAssertions.assert_status_code(response, 201)
        APIAssertions.assert_response_key(response, "id")
        APIAssertions.assert_response_value(response, "title", "Test Post Title")
        APIAssertions.assert_response_value(response, "body", "This is the body of the test post.")
        APIAssertions.assert_response_value(response, "userId", 1)
        APIAssertions.assert_response_type(response, "id", int)

    @pytest.mark.regression
    @pytest.mark.api
    def test_update_post_full(self, api_client: APIClient, posts_api: PostsAPI):
        """Verify PUT /posts/{id} fully updates a post with status 200."""
        payload = {
            "title": "Updated Post Title",
            "body": "This is the updated body of the post.",
            "userId": 1,
        }

        response = posts_api.update_post(1, payload)

        APIAssertions.assert_status_code(response, 200)
        APIAssertions.assert_response_value(response, "title", "Updated Post Title")
        APIAssertions.assert_response_value(response, "body", "This is the updated body of the post.")

    @pytest.mark.regression
    @pytest.mark.api
    def test_update_post_partial(self, api_client: APIClient, posts_api: PostsAPI):
        """Verify PATCH /posts/{id} partially updates a post with status 200."""
        payload = {"title": "Partially Updated Title"}

        response = posts_api.patch_post(1, payload)

        APIAssertions.assert_status_code(response, 200)
        APIAssertions.assert_response_value(response, "title", "Partially Updated Title")

    @pytest.mark.regression
    @pytest.mark.api
    def test_delete_post(self, api_client: APIClient, posts_api: PostsAPI):
        """Verify DELETE /posts/{id} deletes a post with status 200."""
        response = posts_api.delete_post(1)

        APIAssertions.assert_status_code(response, 200)
        APIAssertions.assert_response_value(response, "title", "Partially Updated Title")

    @pytest.mark.negative
    @pytest.mark.api
    def test_create_post_with_invalid_data(self, api_client: APIClient, posts_api: PostsAPI):
        """Verify POST /posts returns 422 for invalid payload."""
        payload = {"title": ""}

        response = posts_api.create_post(payload)

        APIAssertions.assert_status_code(response, 422)

    @pytest.mark.api
    def test_get_posts_response_time(self, api_client: APIClient, posts_api: PostsAPI):
        """Verify GET /posts responds within acceptable time."""
        response = posts_api.get_all_posts()

        APIAssertions.assert_response_time(response, max_ms=3000)
        APIAssertions.assert_json_is_valid(response)

    @pytest.mark.api
    def test_get_post_response_headers(self, api_client: APIClient, posts_api: PostsAPI):
        """Verify GET /posts/{id} returns correct content-type header."""
        response = posts_api.get_post_by_id(1)

        APIAssertions.assert_header(response, "Content-Type", "application/json; charset=utf-8")

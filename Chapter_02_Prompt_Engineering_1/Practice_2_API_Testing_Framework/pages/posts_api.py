from core.api_client import APIClient


class PostsAPI:
    """Page Object for Posts API endpoints (jsonplaceholder.typicode.com)."""

    def __init__(self, client: APIClient):
        self.client = client
        self.endpoint = "posts"

    def get_all_posts(self):
        """GET /posts - Retrieve all posts. Returns raw Response object."""
        return self.client.get(self.endpoint)

    def get_post_by_id(self, post_id: int):
        """GET /posts/{id} - Retrieve a specific post by ID. Returns raw Response object."""
        return self.client.get(f"{self.endpoint}/{post_id}")

    def create_post(self, payload: dict):
        """POST /posts - Create a new post. Returns raw Response object."""
        return self.client.post(self.endpoint, json_data=payload)

    def update_post(self, post_id: int, payload: dict):
        """PUT /posts/{id} - Full update of a post. Returns raw Response object."""
        return self.client.put(f"{self.endpoint}/{post_id}", json_data=payload)

    def patch_post(self, post_id: int, payload: dict):
        """PATCH /posts/{id} - Partial update of a post. Returns raw Response object."""
        return self.client.patch(f"{self.endpoint}/{post_id}", json_data=payload)

    def delete_post(self, post_id: int):
        """DELETE /posts/{id} - Delete a post. Returns raw Response object."""
        return self.client.delete(f"{self.endpoint}/{post_id}")

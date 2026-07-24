from core.api_client import APIClient


class UsersAPI:
    """Page Object for Users API endpoints (jsonplaceholder.typicode.com)."""

    def __init__(self, client: APIClient):
        self.client = client
        self.endpoint = "users"

    def get_all_users(self):
        """GET /users - Retrieve all users. Returns raw Response object."""
        return self.client.get(self.endpoint)

    def get_user_by_id(self, user_id: int):
        """GET /users/{id} - Retrieve a specific user by ID. Returns raw Response object."""
        return self.client.get(f"{self.endpoint}/{user_id}")

    def create_user(self, payload: dict):
        """POST /users - Create a new user. Returns raw Response object."""
        return self.client.post(self.endpoint, json_data=payload)

    def update_user(self, user_id: int, payload: dict):
        """PUT /users/{id} - Full update of a user. Returns raw Response object."""
        return self.client.put(f"{self.endpoint}/{user_id}", json_data=payload)

    def patch_user(self, user_id: int, payload: dict):
        """PATCH /users/{id} - Partial update of a user. Returns raw Response object."""
        return self.client.patch(f"{self.endpoint}/{user_id}", json_data=payload)

    def delete_user(self, user_id: int):
        """DELETE /users/{id} - Delete a user. Returns raw Response object."""
        return self.client.delete(f"{self.endpoint}/{user_id}")

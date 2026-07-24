from core.api_client import APIClient


class AuthAPI:
    """Page Object for Authentication API endpoints."""

    def __init__(self, client: APIClient):
        self.client = client
        self.endpoint = "auth"

    def login(self, email: str, password: str):
        """POST /auth/login - Authenticate user and get token. Returns raw Response object."""
        payload = {"email": email, "password": password}
        return self.client.post(f"{self.endpoint}/login", json_data=payload)

    def register(self, name: str, email: str, password: str):
        """POST /auth/register - Register a new user. Returns raw Response object."""
        payload = {"name": name, "email": email, "password": password}
        return self.client.post(f"{self.endpoint}/register", json_data=payload)

    def logout(self, token: str):
        """POST /auth/logout - Logout with valid token. Returns raw Response object."""
        headers = {"Authorization": f"Bearer {token}"}
        return self.client.post(f"{self.endpoint}/logout", headers=headers)

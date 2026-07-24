import logging
import requests
from urllib.parse import urljoin
from typing import Optional

logger = logging.getLogger(__name__)


class APIClient:
    """Production-grade HTTP client with session management, logging, and retry support."""

    def __init__(self, base_url: str, timeout: int = 10):
        self.base_url = base_url if base_url.endswith("/") else f"{base_url}/"
        self.timeout = timeout
        self.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def _log_request(self, method: str, url: str, **kwargs) -> None:
        logger.info(f"Request: {method.upper()} {url}")
        if kwargs.get("params"):
            logger.info(f"Query Params: {kwargs['params']}")
        if kwargs.get("json"):
            logger.info(f"JSON Body: {kwargs['json']}")

    def _log_response(self, response: requests.Response) -> None:
        logger.info(f"Response Status: {response.status_code}")
        try:
            logger.info(f"Response Body: {response.json()}")
        except ValueError:
            logger.info(f"Response Text: {response.text[:500]}")

    def _request(
        self,
        method: str,
        endpoint: str,
        headers: Optional[dict] = None,
        **kwargs,
    ) -> requests.Response:
        url = urljoin(self.base_url, endpoint.lstrip("/"))
        kwargs["timeout"] = kwargs.get("timeout", self.timeout)

        if headers:
            merged_headers = {**self.headers, **headers}
        else:
            merged_headers = dict(self.headers)

        self._log_request(method, url, **kwargs)

        response = self.session.request(method, url, headers=merged_headers, **kwargs)
        self._log_response(response)
        return response

    def get(self, endpoint: str, params: Optional[dict] = None, **kwargs) -> requests.Response:
        """Send GET request."""
        return self._request("GET", endpoint, params=params, **kwargs)

    def post(self, endpoint: str, json_data: Optional[dict] = None, **kwargs) -> requests.Response:
        """Send POST request."""
        return self._request("POST", endpoint, json=json_data, **kwargs)

    def put(self, endpoint: str, json_data: Optional[dict] = None, **kwargs) -> requests.Response:
        """Send PUT request."""
        return self._request("PUT", endpoint, json=json_data, **kwargs)

    def patch(self, endpoint: str, json_data: Optional[dict] = None, **kwargs) -> requests.Response:
        """Send PATCH request."""
        return self._request("PATCH", endpoint, json=json_data, **kwargs)

    def delete(self, endpoint: str, **kwargs) -> requests.Response:
        """Send DELETE request."""
        return self._request("DELETE", endpoint, **kwargs)

    def close(self) -> None:
        """Close the underlying session."""
        self.session.close()

import logging
import requests
from urllib.parse import urljoin

logger = logging.getLogger(__name__)

class APIClient:
    def __init__(self, base_url: str, timeout: int = 10):
        self.base_url = base_url if base_url.endswith('/') else f"{base_url}/"
        self.timeout = timeout
        self.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def _log_request(self, method: str, url: str, **kwargs):
        logger.info(f"Request: {method.upper()} {url}")
        if kwargs.get("params"):
            logger.info(f"Query Params: {kwargs.get('params')}")
        if kwargs.get("json"):
            logger.info(f"JSON Body: {kwargs.get('json')}")

    def _log_response(self, response: requests.Response):
        logger.info(f"Response Status: {response.status_code}")
        try:
            logger.info(f"Response Body: {response.json()}")
        except ValueError:
            logger.info(f"Response Text: {response.text}")

    def _request(self, method: str, endpoint: str, **kwargs) -> requests.Response:
        url = urljoin(self.base_url, endpoint.lstrip('/'))
        kwargs["timeout"] = kwargs.get("timeout", self.timeout)
        
        self._log_request(method, url, **kwargs)
        response = self.session.request(method, url, **kwargs)
        self._log_response(response)
        return response

    def get(self, endpoint: str, params: dict = None, **kwargs) -> requests.Response:
        return self._request("GET", endpoint, params=params, **kwargs)

    def post(self, endpoint: str, json_data: dict = None, **kwargs) -> requests.Response:
        return self._request("POST", endpoint, json=json_data, **kwargs)

    def put(self, endpoint: str, json_data: dict = None, **kwargs) -> requests.Response:
        return self._request("PUT", endpoint, json=json_data, **kwargs)

    def delete(self, endpoint: str, **kwargs) -> requests.Response:
        return self._request("DELETE", endpoint, **kwargs)
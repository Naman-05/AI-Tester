import logging
from typing import Any, Optional

logger = logging.getLogger(__name__)


class APIAssertions:
    """Custom assertion helpers for API testing."""

    @staticmethod
    def assert_status_code(response, expected_status: int) -> None:
        """Assert that the response status code matches the expected value."""
        assert response.status_code == expected_status, (
            f"Expected status {expected_status}, got {response.status_code}. "
            f"Body: {response.text[:500]}"
        )
        logger.info(f"Status code assertion passed: {response.status_code}")

    @staticmethod
    def assert_response_time(response, max_ms: float) -> None:
        """Assert that the response time is within the acceptable threshold."""
        actual_ms = response.elapsed.total_seconds() * 1000
        assert actual_ms <= max_ms, (
            f"Response time {actual_ms:.2f}ms exceeded maximum of {max_ms}ms"
        )
        logger.info(f"Response time assertion passed: {actual_ms:.2f}ms")

    @staticmethod
    def assert_response_key(response, key: str) -> None:
        """Assert that the response JSON contains a specific key."""
        data = response.json()
        assert key in data, f"Key '{key}' not found in response. Keys: {list(data.keys())}"
        logger.info(f"Response key assertion passed: '{key}' exists")

    @staticmethod
    def assert_response_value(response, key: str, expected_value: Any) -> None:
        """Assert that a specific key in the response has the expected value."""
        data = response.json()
        assert key in data, f"Key '{key}' not found in response."
        assert data[key] == expected_value, (
            f"Expected {key}={expected_value}, got {data[key]}"
        )
        logger.info(f"Response value assertion passed: {key}={expected_value}")

    @staticmethod
    def assert_response_keys(response, keys: list) -> None:
        """Assert that the response JSON contains all specified keys."""
        data = response.json()
        missing = [k for k in keys if k not in data]
        assert not missing, f"Missing keys in response: {missing}"
        logger.info(f"Response keys assertion passed: all {keys} found")

    @staticmethod
    def assert_response_type(response, key: str, expected_type: type) -> None:
        """Assert that a specific key in the response has the expected Python type."""
        data = response.json()
        assert key in data, f"Key '{key}' not found in response."
        assert isinstance(data[key], expected_type), (
            f"Expected {key} to be {expected_type.__name__}, got {type(data[key]).__name__}"
        )
        logger.info(f"Response type assertion passed: {key} is {expected_type.__name__}")

    @staticmethod
    def assert_response_length(response, key: str, expected_length: int) -> None:
        """Assert that a list/key in the response has the expected length."""
        data = response.json()
        assert key in data, f"Key '{key}' not found in response."
        assert len(data[key]) == expected_length, (
            f"Expected length {expected_length}, got {len(data[key])}"
        )
        logger.info(f"Response length assertion passed: {key} has length {expected_length}")

    @staticmethod
    def assert_header(response, header_name: str, expected_value: Optional[str] = None) -> None:
        """Assert that a response header exists and optionally matches a value."""
        assert header_name in response.headers, (
            f"Header '{header_name}' not found in response. Headers: {list(response.headers.keys())}"
        )
        if expected_value:
            assert response.headers[header_name] == expected_value, (
                f"Expected header '{header_name}'={expected_value}, "
                f"got {response.headers[header_name]}"
            )
        logger.info(f"Header assertion passed: {header_name}")

    @staticmethod
    def assert_json_is_valid(response) -> None:
        """Assert that the response body is valid JSON."""
        try:
            response.json()
        except ValueError:
            raise AssertionError("Response body is not valid JSON")
        logger.info("JSON validity assertion passed")

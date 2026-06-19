# API Testing Framework

A production-ready, modular Python API automation framework built with pytest and requests.

## Features

- **Modular Architecture**: Clean separation of concerns with dedicated modules for configuration, client, utilities, and tests
- **Comprehensive Logging**: Built-in logging for API requests/responses and test execution
- **Environment Configuration**: Support for multiple environments via `.env` files
- **HTML Reports**: Auto-generated pytest HTML reports with detailed test metrics
- **Reusable Components**: APIClient wrapper for common operations (GET, POST, PUT, DELETE)
- **Validators**: Helper functions for response validation and assertions
- **Best Practices**: Follows SOLID principles and pytest conventions

## Project Structure

```
Project_api_testing_framework_python/
├── config/
│   ├── __init__.py
│   └── settings.py                 # Configuration management
├── client/
│   ├── __init__.py
│   └── api_client.py              # Base API client wrapper
├── utils/
│   ├── __init__.py
│   ├── validators.py              # Response validation helpers
│   └── logger.py                  # Logging configuration
├── tests/
│   ├── __init__.py
│   ├── conftest.py                # Pytest fixtures
│   ├── test_get_requests.py        # GET request tests
│   ├── test_post_requests.py       # POST request tests
│   ├── test_put_requests.py        # PUT request tests
│   └── test_delete_requests.py     # DELETE request tests
├── reports/                        # Generated HTML reports
├── logs/                           # Generated log files
├── .env.example                    # Example environment variables
├── .env                            # Local environment variables (gitignored)
├── pytest.ini                      # Pytest configuration
├── requirements.txt                # Python dependencies
└── README.md                       # This file
```

## Prerequisites

- Python 3.8+
- pip (Python package manager)

## Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd Project_api_testing_framework_python
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate          # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Running Tests

### Run all tests
```bash
pytest
```

### Run specific test file
```bash
pytest tests/test_get_requests.py
```

### Run specific test function
```bash
pytest tests/test_get_requests.py::test_get_success
```

### Run with verbose output
```bash
pytest -v
```

### Run and generate HTML report
```bash
pytest --html=reports/report.html --self-contained-html
```

### Run with markers (if configured)
```bash
pytest -m smoke
```

## Viewing Test Reports

After running tests with the HTML report flag, open the report in your browser:
```bash
# On macOS/Linux
open reports/report.html

# On Windows
start reports/report.html
```

## Configuration

Edit `.env` file to customize:

```
BASE_URL=https://httpbin.org
TIMEOUT=10
LOG_LEVEL=INFO
```

## Framework Components

### APIClient
Base wrapper for HTTP requests with built-in:
- Request/response logging
- Timeout handling
- Error handling
- Headers management

### Validators
Utility functions for common assertions:
- `validate_status_code()` - Verify response status
- `validate_response_structure()` - Validate JSON structure
- `validate_response_data()` - Verify data presence

### Logger
Centralized logging configuration for:
- Request details
- Response details
- Test execution flow

## Example Usage

```python
from client.api_client import APIClient
from utils.validators import validate_status_code

def test_api_endpoint(config):
    client = APIClient(base_url=config["base_url"])
    response = client.get("/get", params={"key": "value"})
    validate_status_code(response, 200)
    assert "url" in response.json()
```

## Extending the Framework

### Adding New Test Modules
1. Create new test file in `tests/` directory
2. Import fixtures from `conftest.py`
3. Write test functions following naming convention `test_*`

### Adding Custom Validators
1. Add function to `utils/validators.py`
2. Import and use in test files

### Adding New Endpoints
1. Create new test file for endpoint group
2. Use `APIClient` to make requests
3. Implement appropriate assertions

## Best Practices

- Keep tests independent and idempotent
- Use fixtures for setup/teardown
- Implement explicit assertions with meaningful messages
- Log important API interactions
- Use environment variables for configuration
- Maintain DRY principle with helper functions

## Troubleshooting

**Module not found errors**: Ensure you're in project root and virtual environment is activated

**Connection timeout**: Verify `BASE_URL` in `.env` and network connectivity

**Report not generating**: Ensure `reports/` directory exists or pytest will create it

## Dependencies

- `pytest` - Testing framework
- `requests` - HTTP library
- `pytest-html` - HTML reporting
- `python-dotenv` - Environment variable management

## License

Open source - feel free to use and modify

## Contributing

Follow PEP 8 conventions and ensure all tests pass before committing

# Python API Testing Framework — Practice 2

## 📁 Project Structure

```
Practice_2_API_Testing_Framework/
├── S-Plan.md              # Detailed project plan (RICE-POT methodology)
├── README.md              # This file
├── config.py              # Pydantic settings + env loading
├── conftest.py            # Shared pytest fixtures
├── pytest.ini             # pytest configuration
├── requirements.txt       # Dependencies
├── .env                   # Environment variables
├── core/                  # Core framework modules
│   ├── api_client.py      # Base APIClient class
│   ├── assertions.py      # Custom assertion helpers
│   └── utils.py           # Logging, JSON loaders, formatters
├── pages/                 # API endpoint page objects
│   ├── users_api.py       # Users CRUD endpoints
│   ├── posts_api.py       # Posts CRUD endpoints
│   └── auth_api.py        # Authentication endpoints
├── fixtures/              # Test data files (JSON)
│   ├── valid_users.json
│   ├── invalid_users.json
│   └── posts.json
├── tests/                 # Test case modules
│   ├── test_users_api.py
│   ├── test_posts_api.py
│   ├── test_auth_api.py
│   └── test_error_handling.py
├── reports/               # Auto-generated HTML reports
└── logs/                  # Execution logs
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run All Tests
```bash
pytest
```

### 3. Run with Verbose Output
```bash
pytest -v --tb=long -s
```

### 4. Run Specific Test File
```bash
pytest tests/test_users_api.py -v
```

### 5. Run Smoke Tests Only
```bash
pytest -m smoke -v
```

## 📊 Reports
- HTML report generated at: `reports/report.html`
- Logs written to: `logs/framework.log`

## 🔧 Configuration
Edit `.env` to change the base URL, timeout, or log level.

## 📖 Framework Details
See [S-Plan.md](S-Plan.md) for the complete architecture, design principles, and implementation plan.
# Python API Testing Framework — Practice 2

## 📁 Project Structure

```
Practice_2_API_Testing_Framework/
├── S-Plan.md              # Detailed project plan (RICE-POT methodology)
├── README.md              # This file
├── config.py              # Pydantic settings + env loading
├── conftest.py            # Shared pytest fixtures
├── pytest.ini             # pytest configuration
├── requirements.txt       # Dependencies
├── .env                   # Environment variables
├── core/                  # Core framework modules
│   ├── api_client.py      # Base APIClient class
│   ├── assertions.py      # Custom assertion helpers
│   └── utils.py           # Logging, JSON loaders, formatters
├── pages/                 # API endpoint page objects
│   ├── users_api.py       # Users CRUD endpoints
│   ├── posts_api.py       # Posts CRUD endpoints
│   └── auth_api.py        # Authentication endpoints
├── fixtures/              # Test data files (JSON)
│   ├── valid_users.json
│   ├── invalid_users.json
│   └── posts.json
├── tests/                 # Test case modules
│   ├── test_users_api.py
│   ├── test_posts_api.py
│   ├── test_auth_api.py
│   └── test_error_handling.py
├── reports/               # Auto-generated HTML reports
└── logs/                  # Execution logs
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run All Tests
```bash
pytest
```

### 3. Run with Verbose Output
```bash
pytest -v --tb=long -s
```

### 4. Run Specific Test File
```bash
pytest tests/test_users_api.py -v
```

### 5. Run Smoke Tests Only
```bash
pytest -m smoke -v
```

## 📊 Reports
- HTML report generated at: `reports/report.html`
- Logs written to: `logs/framework.log`

## 🔧 Configuration
Edit `.env` to change the base URL, timeout, or log level.

## 📖 Framework Details
See [S-Plan.md](S-Plan.md) for the complete architecture, design principles, and implementation plan.

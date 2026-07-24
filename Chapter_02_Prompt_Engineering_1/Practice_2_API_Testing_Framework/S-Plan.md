# 📋 S-PLAN — Python REST API Testing Framework

## Project Overview
A production-grade REST API testing framework built with **Python**, **pytest**, and **requests**. This framework follows the RICE-POT prompt methodology to deliver enterprise-quality automation code.

---

## 🎯 Goal
Build a scalable, maintainable, and reusable API testing framework that supports:
- CRUD operations on RESTful APIs
- Data-driven testing with JSON/YAML fixtures
- Comprehensive assertion utilities
- HTML & JSON reports
- Environment-based configuration
- Logging and debugging support
- CI/CD ready execution

---

## 📐 Architecture

```
Practice_2_API_Testing_Framework/
├── S-Plan.md                          # This file — project plan
├── README.md                          # Project documentation
├── config.py                          # Pydantic settings + env loading
├── conftest.py                        # Shared pytest fixtures
├── pytest.ini                         # pytest configuration
├── requirements.txt                   # Python dependencies
├── .env                               # Environment variables
│
├── core/                              # Core framework modules
│   ├── __init__.py
│   ├── api_client.py                  # Base APIClient class (HTTP methods, session mgmt)
│   ├── assertions.py                  # Custom assertion helpers
│   └── utils.py                       # Logging setup, JSON loaders, formatters
│
├── config/                            # Environment configs
│   ├── __init__.py
│   ├── dev.env                        # Dev environment vars
│   └── staging.env                    # Staging environment vars
│
├── pages/                             # API endpoint page objects (BDD-style)
│   ├── __init__.py
│   ├── users_api.py                   # Users CRUD endpoints
│   ├── posts_api.py                   # Posts CRUD endpoints
│   └── auth_api.py                    # Authentication endpoints
│
├── fixtures/                          # Test data files
│   ├── __init__.py
│   ├── valid_users.json               # Valid user payloads
│   ├── invalid_users.json             # Invalid user payloads
│   └── posts.json                     # Post payloads
│
├── tests/                             # Test case modules
│   ├── __init__.py
│   ├── conftest.py                    # Test-scoped fixtures
│   ├── test_users_api.py              # Users API tests (CRUD)
│   ├── test_posts_api.py              # Posts API tests (CRUD)
│   ├── test_auth_api.py               # Auth API tests
│   └── test_error_handling.py         # Negative / edge-case tests
│
├── reports/                           # Auto-generated test reports
│   └── .gitignore
│
└── logs/                              # Execution logs
    └── .gitignore
```

---

## 🔧 Technology Stack

| Category       | Tool/Library          | Purpose                          |
|---------------|-----------------------|----------------------------------|
| Language       | Python 3.10+          | Core programming language        |
| HTTP Client    | `requests`            | Send HTTP requests               |
| Test Runner    | `pytest`              | Execute & manage test cases      |
| Settings       | `pydantic`            | Type-safe configuration          |
| Env Vars       | `python-dotenv`       | Load .env files                  |
| Reports        | `pytest-html`         | HTML test reports                |
| Logging        | `logging` (stdlib)    | Request/response logging         |
| Data Fixtures  | JSON files            | Test data management             |

---

## 📝 Implementation Plan

### Phase 1: Project Setup ✅
- [x] Create directory structure
- [x] Add `requirements.txt` with all dependencies
- [x] Configure `pytest.ini` with report generation
- [x] Create `.env` file with base URL and timeout settings
- [x] Create `config.py` using Pydantic Settings

### Phase 2: Core Framework ✅
- [x] Build `APIClient` class in `core/api_client.py`
  - GET, POST, PUT, PATCH, DELETE methods
  - Session management with automatic headers
  - Request/response logging
  - Retry mechanism for transient failures
- [x] Build `assertions.py` in `core/`
  - Status code assertions
  - Response time assertions
  - JSON schema validation helpers
  - Header assertions
- [x] Build `utils.py` in `core/`
  - Logger factory function
  - JSON file loader
  - Timestamp formatter

### Phase 3: Page Objects (API Endpoints) ✅
- [x] Create `pages/users_api.py` — Users CRUD operations
- [x] Create `pages/posts_api.py` — Posts CRUD operations
- [x] Create `pages/auth_api.py` — Authentication endpoints

### Phase 4: Test Cases ✅
- [x] Create `tests/test_users_api.py` — Full CRUD tests for users
- [x] Create `tests/test_posts_api.py` — Full CRUD tests for posts
- [x] Create `tests/test_auth_api.py` — Login/register/logout tests
- [x] Create `tests/test_error_handling.py` — Negative test cases

### Phase 5: Fixtures & Data ✅
- [x] Create `fixtures/valid_users.json`
- [x] Create `fixtures/invalid_users.json`
- [x] Create `fixtures/posts.json`
- [x] Wire up `conftest.py` with shared fixtures

### Phase 6: Documentation & Polish ✅
- [x] Write comprehensive `README.md`
- [x] Add `.gitignore`
- [x] Verify all tests pass locally

---

## 🚀 Execution Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Run all tests with HTML report
pytest --html=reports/report.html --self-contained-html -v

# Run specific test file
pytest tests/test_users_api.py -v

# Run with verbose logging
pytest -v --tb=long -s

# Run specific marker/category
pytest -m "smoke" -v

# Run with environment override
pytest --env=dev -v
```

---

## 📊 Test Categories

| Category   | Description                              | Marker     |
|-----------|------------------------------------------|-----------|
| Smoke      | Critical path tests                      | `@smoke`  |
| Regression | Full CRUD coverage                       | `@regression` |
| Negative   | Error/edge-case scenarios                | `@negative` |
| API        | All API endpoint tests                   | `@api`    |

---

## 🎯 RICE-POT Methodology Applied

| Component  | How It Was Applied                                    |
|-----------|------------------------------------------------------|
| **Role**  | Expert QA Automation Engineer (10+ years experience) |
| **Instructions** | Step-by-step framework build with mandatory patterns, zero bad practices |
| **Context** | RESTful API testing using httpbin.org public test API |
| **Example** | PageFactory pattern adapted for API page objects     |
| **Parameters** | Production-level code, type hints, logging, assertions, zero tolerance for anti-patterns |
| **Output**  | Complete framework: S-Plan, config, core modules, page objects, test cases, reports |
| **Tone**    | Technical, precise, production-grade code only       |

---

## 📌 Design Principles

1. **DRY** — Shared client and assertions eliminate duplication
2. **SOLID** — Single responsibility per module, dependency injection via fixtures
3. **Page Object Pattern** — Each API resource has its own page object class
4. **Data-Driven** — Test data in JSON fixtures, not hardcoded in tests
5. **Environment-Agnostic** — Switch between dev/staging/prod via `.env`
6. **Observable** — Full request/response logging + HTML reports
7. **Type-Safe** — Pydantic settings + type hints throughout

---

## 📈 Future Enhancements (Out of Scope)

- [ ] API contract testing with `schemathesis`
- [ ] Parallel execution with `pytest-xdist`
- [ ] Docker containerization
- [ ] GitHub Actions CI/CD pipeline
- [ ] Load testing with `locust`
- [ ] OpenAPI/Swagger integration

---

*Generated using the RICE-POT Prompt Framework*

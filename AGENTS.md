# AGENTS.md — AI Tester Repository

This file helps AI coding agents understand the codebase and be immediately productive.

---

## 🏗️ Repository Overview

**AI Tester** is a learning repository for AI-powered testing, prompt engineering, and QA automation. It contains multiple chapters/projects exploring modern AI-assisted QA methodologies.

### Key Directories

| Path | Purpose |
|------|---------|
| `Chapter_02_Prompt_Engineering_1/` | Prompt engineering practice: API testing frameworks, Selenium, test case generation |
| `Chapter_03_BLAST_Framework/` | BLAST framework methodology documentation (Blueprint, Link, Architect, Stylize, Trigger) |
| `Chapter_05_AI_Agents_LangFlow/` | LangFlow visual AI agent workflows (JSON files) |
| `JiraTestPlanGenerator_BLAST_Framework/` | Full-stack React + Node.js app generating test plans from Jira issues |
| `QA-SKILLS/` | QA skills documentation (currently empty) |

---

## 🛠️ Build & Test Commands

### Python Projects (Chapter 02)

```bash
# Practice 1 - API Testing Project
cd "Chapter_02_Prompt_Engineering_1/Practice_1_API Testing Project"
pip install -r requirements.txt
pytest

# Practice 2 - API Testing Framework (structured)
cd "Chapter_02_Prompt_Engineering_1/Practice_2_API_Testing_Framework"
pip install -r requirements.txt
pytest                    # All tests
pytest -v --tb=long -s    # Verbose
pytest -m smoke -v        # Smoke tests only
pytest tests/test_users_api.py -v  # Specific file
```

### React/Node Project (Jira Test Plan Generator)

```bash
cd JiraTestPlanGenerator_BLAST_Framework
npm install
npm run dev      # Development server (Vite)
npm run build    # Production build
npm run preview  # Preview production build
```

### LangFlow Projects

```bash
# Start LangFlow CLI (see Commands_Start Langflow_CLI.txt)
# Import JSON workflows from Chapter_05_AI_Agents_LangFlow/Projects/
```

---

## 📐 Architecture Patterns

### Practice 2 API Framework (Page Object Model)

```
core/           # Reusable framework code
  api_client.py     # Base HTTP client with session management
  assertions.py     # Custom assertion helpers
  utils.py          # Logging, JSON loaders, formatters
pages/          # API endpoint page objects (BDD-style)
  users_api.py      # Users CRUD endpoints
  posts_api.py      # Posts CRUD endpoints
  auth_api.py       # Authentication endpoints
fixtures/       # Test data (JSON)
tests/          # Test cases organized by feature
```

### Jira Test Plan Generator (React + Express)

```
src/            # React frontend
  components/     # IssueInput, SettingsPanel, TestPlanDisplay
  App.jsx         # Main UI logic
api/            # API route handlers (Vercel serverless)
  groq/generate.js    # AI test plan generation
  jira/[key].js       # Jira issue proxy
server.js       # Express backend (local dev)
```

---

## 🔑 Key Conventions

### Python
- **Config**: Pydantic Settings in `config.py` + `.env` files
- **Fixtures**: Shared in `conftest.py`, test-scoped in `tests/conftest.py`
- **Logging**: Stdlib `logging` module, configured in `core/utils.py`
- **Reports**: `pytest-html` generates `reports/report.html`

### JavaScript/React
- **Module type**: ES modules (`"type": "module"` in package.json)
- **Styling**: CSS modules per component (`.css` files)
- **API calls**: Axios via proxy endpoints in `server.js` / `api/`
- **Env**: `.env` and `.env.local` (not committed)

### Prompt Engineering
- **Framework**: RICE-POT (Role, Instructions, Context, Example, Parameters, Output, Tone)
- **Templates**: In `Chapter_02_Prompt_Engineering_1/templates/`
- **Anti-hallucination**: Default Parameters block recommended for factual output

### BLAST Framework
- **Phases**: Blueprint → Link → Architect → Stylize → Trigger
- **Memory files**: `task_plan.md`, `findings.md`, `progress.md`, `gemini.md` (constitution)
- **3-Layer Architecture**: Architecture (SOPs) → Navigation (reasoning) → Tools (deterministic scripts)

---

## 📋 Important Files for Agents

| File | Why It Matters |
|------|----------------|
| `Chapter_02_Prompt_Engineering_1/Practice_2_API_Testing_Framework/S-Plan.md` | Full architecture & implementation plan |
| `Chapter_03_BLAST_Framework/B.L.A.S.T.md` | BLAST methodology (core framework doc) |
| `Chapter_02_Prompt_Engineering_1/Project_2_Selenium_Framework/SKILL.md` | RICE-POT prompt builder skill |
| `JiraTestPlanGenerator_BLAST_Framework/server.js` | Backend API proxies (Jira + Groq) |
| `Chapter_02_Prompt_Engineering_1/templates/` | Reusable prompt templates for QA tasks |

---

## ⚠️ Common Pitfalls

1. **Python path**: Use the `.venv` at repo root — activate before running tests
2. **Jira credentials**: Required in `Chapter_03_BLAST_Framework/.env` (JIRA_EMAIL, JIRA_TOKEN, JIRA_BASE_URL)
3. **Groq API key**: Required for AI generation (`GROQ_KEY` in same `.env`)
4. **LangFlow JSON**: Large files (~56KB–229KB) — use tools to inspect, don't read inline
5. **Node modules**: Not committed — run `npm install` in `JiraTestPlanGenerator_BLAST_Framework/`

---

## 🔗 Related Documentation

- [Root README](README.md) — Full directory structure & descriptions
- [Practice 1 README](Chapter_02_Prompt_Engineering_1/Practice_1_API%20Testing%20Project/README.md)
- [Practice 2 README](Chapter_02_Prompt_Engineering_1/Practice_2_API_Testing_Framework/README.md)
- [BLAST Framework](Chapter_03_BLAST_Framework/B.L.A.S.T.md)
- [RICE-POT Skill](Chapter_02_Prompt_Engineering_1/Project_2_Selenium_Framework/SKILL.md)
- [Prompt Templates](Chapter_02_Prompt_Engineering_1/templates/)
# AI Tester 🧪

A comprehensive learning repository for AI-powered testing, prompt engineering, and quality assurance automation. This repo contains practice projects, frameworks, and tools explored across multiple chapters focused on modern AI-assisted QA methodologies.

---

## 📂 Directory Structure & Overview

```
AI Tester/
├── README.md                          # This file — project overview
├── .gitignore                         # Git ignore rules for Python/Vercel/etc.
├── extract_pdf_text.py               # Python script for PDF text extraction
├── Commands_Start Langflow_CLI.txt   # CLI startup commands for LangFlow
├── Open Source and Close Source Models.png  # Reference diagram: open vs closed AI models
├── Types of PROMPT Frameworks.png    # Reference diagram: prompt engineering frameworks
│
├── Chapter_02_Prompt_Engineering_1/      # Prompt Engineering practice & projects
│   ├── Practice_1_API Testing Project/   # API testing with pytest + requests
│   ├── Practice_2_API_Testing_Framework/ # Structured API testing framework (S-Plan)
│   ├── Project_1_TC_Gen/                 # Test case generation (RestfulBooker + Jira)
│   ├── Project_2_Selenium_Framework/     # Selenium automation with SKILL.md guide
│   ├── Project_3/                        # Additional prompt engineering project
│   └── templates/                        # Prompt templates for AI-assisted QA
│
├── Chapter_03_BLAST_Framework/            # BLAST framework documentation
│   ├── .env                              # Environment configuration
│   ├── B.L.A.S.T.md                      # BLAST framework methodology overview
│   ├── Objective.md                      # Learning objectives
│   ├── findings.md                       # Research findings and insights
│   ├── gemini.md                         # Gemini model notes/integration
│   ├── progress.md                       # Milestone tracking log
│   └── task_plan.md                      # Task breakdown & plan
│
├── Chapter_05_AI_Agents_LangFlow/         # LangFlow AI Agent projects
│   ├── Projects/                         # LangFlow workflow JSON files
│   │   ├── LF_Project_1_Hello_World.json     # Starter LangFlow workflow
│   │   └── LF_Project_2_Flaky_Test_AI_Agent.json  # Flaky test AI agent workflow
│   ├── resultA.json                      # Experiment A output/results
│   └── resultB.json                      # Experiment B output/results
│
├── JiraTestPlanGenerator_BLAST_Framework/ # React + Vite app for Jira test plans
│   ├── src/                              # Source code (React components)
│   │   ├── App.jsx                       # Main application component
│   │   ├── App.css                       # Application styles
│   │   ├── index.css                     # Global styles
│   │   └── main.jsx                      # React entry point
│   ├── api/                              # API endpoint definitions
│   ├── dist/                             # Production build output
│   ├── node_modules/                     # NPM dependencies
│   ├── server.js                         # Backend server (Node.js)
│   ├── package.json / package-lock.json  # Dependency manifests
│   ├── vite.config.js                    # Vite build configuration
│   ├── vercel.json                       # Vercel deployment config
│   ├── index.html                        # HTML entry point
│   ├── .env / .env.local                 # Environment variables
│   └── .gitignore                        # Git ignore for Node/React project
│
├── QA-SKILLS/                            # QA skills documentation
│   (Contents — see directory listing)
│
└── [System directories]                  # Tooling & infrastructure
    ├── .git/                             # Git version control data
    ├── .playwright-mcp/                 # Playwright MCP console logs
    ├── .pytest_cache/                   # Pytest caching directory
    ├── .venv/                           # Python virtual environment
    ├── .vercel/                         # Vercel project metadata
    └── .vscode/                         # VS Code workspace settings
```

---

## 📁 Detailed Directory Descriptions

### Chapter_02_Prompt_Engineering_1
**Purpose:** Hands-on practice in prompt engineering for software testing. Covers test case generation, API testing frameworks, and Selenium automation using AI-powered prompts.

| Sub-directory | Description |
|---|---|
| `Practice_1_API Testing Project` | Initial API testing project using `pytest`, `requests`, and environment-based config. Includes conftest.py for fixtures, config.py, and requirements.txt. |
| `Practice_2_API_Testing_Framework` | A more structured API testing framework with an S-Plan design document. Adds deeper pytest patterns, comprehensive conftest fixtures, and a formal spec. |
| `Project_1_TC_Gen` | Test Case Generation project — generates test cases for RestfulBooker and Jira platforms. Contains the prompt-driven test case markdown file (`Restful-Booker-Jira-Test-Cases.md`) and PDF reference material. |
| `Project_2_Selenium_Framework` | Selenium browser automation framework practice. Includes a blank-template markdown and a detailed SKILL.md guide. |
| `Project_3` | Additional prompt engineering project — contents vary. |
| `templates/` | Reusable AI prompt templates for QA tasks: test case generation, PRD-driven test cases, API test generation, negative testing, security testing, and regression suite creation. |

### Chapter_03_BLAST_Framework
**Purpose:** Documentation and research around the BLAST framework methodology — a structured approach to prompt-based testing frameworks.

| File | Description |
|---|---|
| `B.L.A.S.T.md` | Core framework document explaining the BLAST methodology (likely an acronym for a prompt-based testing paradigm). |
| `Objective.md` | Learning goals and objectives for this chapter. |
| `findings.md` | Research findings, insights, and key takeaways. |
| `gemini.md` | Notes on integrating or using Google's Gemini model within the framework. |
| `progress.md` | Progress tracker with milestones completed and upcoming tasks. |
| `task_plan.md` | Detailed task breakdown plan for this chapter. |
| `.env` | Environment variables (API keys, config) for framework execution. |

### Chapter_05_AI_Agents_LangFlow
**Purpose:** Exploring LangFlow as a visual tool for building AI-powered testing agents and workflows.

| File/Folder | Description |
|---|---|
| `Projects/LF_Project_1_Hello_World.json` | Starter LangFlow workflow (~56 KB JSON) — basic hello-world agent pipeline. |
| `Projects/LF_Project_2_Flaky_Test_AI_Agent.json` | Advanced LangFlow workflow (~229 KB) — AI agent designed to detect and handle flaky tests. |
| `resultA.json` / `resultB.json` | Comparative experiment results between two different approaches or configurations. |

### JiraTestPlanGenerator_BLAST_Framework
**Purpose:** A full-stack React application (Vite + Node.js backend) that generates test plans from Jira issues using the BLAST framework methodology.

| Component | Description |
|---|---|
| `src/App.jsx` | Main React component — core UI logic for test plan generation, likely includes form inputs for Jira issue details and output display. |
| `src/App.css` / `index.css` / `main.jsx` | Styling and React entry point. |
| `api/` | API route definitions or documentation for backend endpoints. |
| `server.js` | Node.js server handling the test plan generation logic. |
| `dist/index.html` | Production build output — served on Vercel. |
| `vercel.json` | Deployment configuration for Vercel hosting. |

### QA-SKILLS
**Purpose:** Collection of QA skills documentation, techniques, and methodologies.

---

## 📄 Root-Level Files

| File | Description |
|---|---|
| `extract_pdf_text.py` | Python script for extracting text content from PDF files (used with Project_1_TC_Gen's Restful-booker.pdf). |
| `Commands_Start Langflow_CLI.txt` | CLI commands and instructions for starting LangFlow from the command line. |
| `Open Source and Close Source Models.png` | Reference diagram comparing open-source vs. proprietary AI models. |
| `Types of PROMPT Frameworks.png` | Reference diagram categorizing prompt engineering frameworks. |

---

## 🛠️ System Directories (Not Project Code)

| Directory | Purpose |
|---|---|
| `.git/` | Git version control metadata. |
| `.playwright-mcp/` | Playwright MCP (Model Context Protocol) console logs from browser automation sessions. |
| `.pytest_cache/` | Pytest caching for faster test reruns. |
| `.venv/` | Python virtual environment with installed dependencies. |
| `.vercel/` | Vercel project link metadata. |
| `.vscode/settings.json` | VS Code workspace settings (editor preferences). |

---

## 🎯 Key Topics Covered

- **Prompt Engineering** — Designing effective prompts for test case generation, API testing, and security testing
- **API Testing Frameworks** — pytest + requests-based automation with conftest fixtures
- **Selenium Browser Automation** — UI testing with AI-assisted framework design
- **BLAST Framework** — Structured prompt-based testing methodology documentation
- **LangFlow AI Agents** — Visual workflow builder for AI-powered testing agents
- **Jira Integration** — Generating test plans from Jira issues via a React web app

---

*Last updated: 2026-09-01*

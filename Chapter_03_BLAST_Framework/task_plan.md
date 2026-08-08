# Task Plan — Jira Test Plan Generator

## North Star
Build a lightweight React application that fetches JIRA issue data (KAN-9 / vwo48) and automatically generates a comprehensive test plan using GROQ's AI API.

## Integrations
- **Jira Cloud API** — Fetch issue details, description, acceptance criteria
- **GROQ API** (openai/gpt-oss-120b FREE tier) — Generate test plans from fetched data

## Source of Truth
- JIRA: `https://namansinghaljira.atlassian.net/`
- Credentials stored in `.env` file

## Delivery Payload
- React SPA (Vite + lightweight) with settings panel for credentials
- Fetches JIRA issue → sends to GROQ → displays formatted test plan
- Export test plan as Markdown / JSON

## Behavioral Rules
- Deterministic API calls, probabilistic AI generation
- Never expose tokens in UI or client-side code directly
- Graceful error handling for all API failures
- Clean, professional UI with clear status indicators

---

## Phases (BLAST Framework)

### Protocol 0: Initialization ✅
- [x] Create task_plan.md
- [x] Create findings.md
- [x] Create progress.md
- [x] Create gemini.md (Project Constitution)

### Phase 1: B - Blueprint
- [ ] Discovery questions answered
- [ ] JSON Data Schema defined in gemini.md
- [ ] Research JIRA API & GROQ API docs

### Phase 2: L - Link
- [ ] Verify JIRA API connection
- [ ] Verify GROQ API connection
- [ ] Build minimal fetch scripts

### Phase 3: A - Architect (3-Layer Build)
- [ ] Architecture SOPs (markdown)
- [ ] Navigation/routing logic
- [ ] Tools: JiraFetcher, TestPlanGenerator
- [ ] React UI components

### Phase 4: S - Stylize
- [ ] Clean CSS/HTML layout
- [ ] Settings panel for credentials
- [ ] Test plan display with export options
- [ ] Feedback iteration

### Phase 5: T - Trigger
- [ ] Build production bundle
- [ ] Deployment instructions
- [ ] Maintenance documentation

# Findings — Jira Test Plan Generator

## Research Findings

### JIRA Cloud API (REST v2)
- **Base URL**: `https://namansinghaljira.atlassian.net/`
- **Authentication**: Basic Auth (Email + API Token)
- **Key Endpoints**:
  - Get Issue: `GET /rest/api/3/issue/{issueIdOrKey}`
  - Search Issues: `GET /rest/api/3/search?jql=key=vwo48`
- **Response includes**: fields (summary, description, issuetype, status, custom fields)
- **Rate Limits**: ~1000 requests/min for cloud
- **Required Headers**: 
  - `Authorization: Basic {base64(email:token)}`
  - `Accept: application/json`

### GROQ API
- **Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
- **Model**: `openai/gpt-oss-120b` (FREE tier available)
- **Authentication**: Bearer token in header
- **Request Format**: Standard OpenAI chat completions format
- **Response**: JSON with generated test plan content

### React Application Architecture
- **Framework**: Vite + React (lightweight SPA)
- **State Management**: React hooks (useState, useEffect)
- **Styling**: Inline CSS / minimal CSS modules
- **No backend needed** — direct API calls from browser (credentials in settings panel)

### Constraints & Considerations
- CORS: JIRA may block browser requests → need proxy or serverless function option
- Security: Tokens stored in localStorage (user-controlled, not hardcoded)
- Error handling: Network failures, auth errors, rate limits
- Test plan format: Markdown output with sections for test cases

### GitHub Research
- Similar projects exist: JIRA API clients, AI test plan generators
- Best practice: Fetch issue → extract description/acceptance criteria → prompt GROQ → format output

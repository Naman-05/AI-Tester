# Gemini.md — Project Constitution

## Data Schemas

### JIRA Issue Response Schema (from API)
```json
{
  "key": "string",           // e.g., "KAN-9" or "vwo48"
  "fields": {
    "summary": "string",
    "description": "string",
    "issuetype": {
      "name": "string"       // e.g., "Story", "Task", "Bug"
    },
    "status": {
      "name": "string"
    },
    "priority": {
      "name": "string"
    },
    "labels": ["string"],
    "components": [
      { "name": "string" }
    ],
    "customfield_10019": "string",  // Acceptance Criteria (Jira Cloud)
    "customfield_10123": "string",  // Description (if different field)
    "reporter": { "displayName": "string" },
    "assignee": { "displayName": "string" }
  }
}
```

### Test Plan Output Schema (from GROQ)
```json
{
  "title": "string",
  "issueKey": "string",
  "summary": "string",
  "testStrategy": "string",
  "testCases": [
    {
      "id": "number",
      "name": "string",
      "type": "string",       // Functional, Negative, Edge Case, Security, Performance
      "preconditions": "string",
      "steps": "string",
      "expectedResult": "string",
      "priority": "string"    // High, Medium, Low
    }
  ],
  "edgeCases": ["string"],
  "negativeTestCases": ["string"],
  "securityConsiderations": ["string"],
  "performanceTests": ["string"],
  "notes": "string"
}
```

### Settings Schema (localStorage)
```json
{
  "jiraEmail": "string",
  "jiraToken": "string",
  "jiraBaseUrl": "string",
  "groqApiKey": "string",
  "groqModel": "string"      // default: "openai/gpt-oss-120b"
}
```

### Issue Input Schema (user input)
```json
{
  "issueKey": "string"       // e.g., "KAN-9" or "vwo48"
}
```

## Behavioral Rules

1. **Authentication**: JIRA uses Basic Auth with email + token from settings
2. **API Calls**: All API calls use HTTPS, proper headers, and error handling
3. **Token Storage**: Credentials stored in localStorage (user-controlled)
4. **CORS Handling**: If CORS blocks direct JIRA calls, provide serverless function option
5. **AI Generation**: GROQ receives issue data as context, generates structured test plan
6. **Error Handling**: All failures display user-friendly messages
7. **Data Privacy**: No credentials sent to third parties except GROQ API
8. **Export Options**: Test plan can be exported as Markdown or JSON

## Architectural Invariants

1. **3-Layer Separation**: UI (React) → Logic (fetch/generate) → External APIs (JIRA/GROQ)
2. **No Hardcoded Secrets**: All credentials from settings panel
3. **Atomic Operations**: Each API call is independent and retryable
4. **Progressive Enhancement**: Works without AI (manual test plan editing)
5. **Offline-First**: Settings persist, cached data available

## Maintenance Log

| Date | Change | Notes |
|------|--------|-------|
| 2026-08-08 | Project initialized | BLAST Protocol 0 + Phase 1 complete |

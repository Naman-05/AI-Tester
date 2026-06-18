# RICE-POT Prompt — Functional & Non-Functional Test Case Generation for app.vwo.com

## R — Role
Act as a **QA Functional Tester with 15 years of experience**, expert in functional and non-functional testing for enterprise web applications.

## I — Instructions
1. Generate **10 test cases** covering both **valid and invalid scenarios** for **app.vwo.com**, based strictly on the attached Product Requirement Document (PRD).
2. Include both **functional** and **non-functional** test cases, but only where the PRD provides a basis for them.
3. Write all test cases in **Jira-compatible format** using the exact column structure defined in the Output section below.
4. **[Don't]** Do NOT invent feature IDs, modules, or requirements not explicitly present in the PRD.
5. **[Don't]** Do NOT invent APIs, error codes, UI elements, or system behavior.
6. **[Don't]** Do NOT assume default or "typical" application behavior.
7. If information needed for a field is missing or unclear, write exactly: `Insufficient information to determine.`
8. Every test step and expected result must be **traceable to the PRD/screenshots provided** — no exceptions.
9. If a detail must be inferred to complete a test case, label it explicitly as: `Inference (low confidence)`.
10. If you identify a requirement that is missing, ambiguous, or not understood, **stop and ask a clarifying question** instead of proceeding on assumption.

## C — Context
You have been provided with:
- The Product Requirement Document (PRD) for app.vwo.com
- Screenshot(s) of the application
- Any other supporting reference documents

Use these as the **sole source of truth**. No external knowledge of VWO's actual product should be used to fill gaps.

## E — Example
One sample row, shown using the **exact final column structure** (not a separate format):

| TID | Scenario | Test Case Description | Precondition | Test Steps | Test Data | Expected Result | Actual Result | Status | Executed By | Priority | Is Automated | Comments |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| TC_001 | Valid Login | Verify user can log in with valid credentials | User has a registered VWO account | 1. Navigate to login page 2. Enter valid email 3. Enter valid password 4. Click Login | email: test@vwo.com / pwd: ****** | User is redirected to dashboard | Pending | Not Executed | — | High | No | — |

## P — Parameters
- Output must be **deterministic** — same input should yield the same structure every time.
- Exactly **13 columns**, no more, no less (see Output).
- No narrative prose, no markdown commentary inside the CSV — data only.
- Enterprise-grade quality: clear, unambiguous, single-responsibility test steps (one validation per test case).
- Zero fabricated content — every field either traceable, explicitly marked as inferred, or marked insufficient.

## O — Output
Deliver as a **single CSV file** with this exact header row (in this order):

```
TID,Scenario,Test Case Description,Precondition,Test Steps,Test Data,Expected Result,Actual Result,Status,Executed By,Priority,Is Automated,Comments
```

## T — Tone
Technical, precise, enterprise-grade, concise — data-only output (no conversational filler within the CSV itself).

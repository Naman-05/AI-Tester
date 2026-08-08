import React from 'react'
import './IssueInput.css'

function IssueInput({ issueKey, setIssueKey, onFetch, onGenerate, loading, issueData }) {
  return (
    <div className="issue-input">
      {/* Input Section */}
      <div className="input-section">
        <h2>📋 Enter JIRA Issue Key</h2>
        <p className="input-subtitle">
          Enter the JIRA issue key (e.g., KAN-9, vwo48, BUG-123) to fetch details and generate a test plan.
        </p>

        <div className="input-row">
          <input
            type="text"
            value={issueKey}
            onChange={(e) => setIssueKey(e.target.value.toUpperCase())}
            placeholder="e.g., KAN-9 or vwo48"
            className="issue-input-field"
            onKeyDown={(e) => e.key === 'Enter' && onFetch()}
          />
          <button
            className="btn btn-fetch"
            onClick={onFetch}
            disabled={loading || !issueKey.trim()}
          >
            {loading ? '⏳ Fetching...' : '🔍 Fetch Issue'}
          </button>
        </div>

        {!issueData && !loading && (
          <div className="quick-actions">
            <p className="quick-label">Quick Actions:</p>
            <button className="btn btn-quick" onClick={() => { setIssueKey('KAN-9'); onFetch(); }}>
              KAN-9
            </button>
            <button className="btn btn-quick" onClick={() => { setIssueKey('VWO48'); onFetch(); }}>
              VWO48
            </button>
          </div>
        )}
      </div>

      {/* Issue Data Preview */}
      {issueData && !loading && (
        <div className="issue-preview">
          <h3>✅ Issue Fetched Successfully</h3>
          <div className="issue-meta">
            <div className="meta-item">
              <span className="meta-label">Key:</span>
              <span className="meta-value">{issueData.key}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Summary:</span>
              <span className="meta-value">{issueData.fields.summary}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Type:</span>
              <span className="meta-value">{issueData.fields.issuetype.name}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Priority:</span>
              <span className="meta-value">{issueData.fields.priority?.name || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Status:</span>
              <span className="meta-value">{issueData.fields.status.name}</span>
            </div>
          </div>

          {issueData.fields.description && (
            <div className="description-box">
              <h4>Description:</h4>
              <p>{issueData.fields.description}</p>
            </div>
          )}

          <button
            className="btn btn-generate"
            onClick={onGenerate}
            disabled={loading}
          >
            {loading ? '⏳ Generating...' : '🤖 Generate Test Plan with AI'}
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>{issueData ? 'Generating test plan with GROQ AI...' : 'Fetching issue from JIRA...'}</p>
        </div>
      )}
    </div>
  )
}

export default IssueInput

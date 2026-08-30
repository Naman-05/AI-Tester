import React, { useState } from 'react'
import './TestPlanDisplay.css'

function TestPlanDisplay({ testPlan, issueData, onExportMarkdown, onExportJSON }) {
  const [viewMode, setViewMode] = useState('table') // 'table' or 'cards'
  const typeColors = {
    'Functional': '#3182ce',
    'Negative': '#c53030',
    'Edge Case': '#d69e2e',
    'Security': '#805ad5',
    'Performance': '#2f855a',
  }

  const priorityIcons = {
    'High': '🔴',
    'Medium': '🟡',
    'Low': '🟢',
  }

  return (
    <div className="test-plan-display">
      {/* Header */}
      <div className="plan-header">
        <div>
          <h2>{testPlan.title}</h2>
          <p className="plan-meta">
            Issue: {testPlan.issueKey} • Summary: {testPlan.summary}
          </p>
        </div>
        <div className="export-buttons">
          <button className="btn btn-export" onClick={onExportMarkdown}>
            📄 Export MD
          </button>
          <button className="btn btn-export" onClick={onExportJSON}>
            📦 Export JSON
          </button>
          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Spreadsheet Table View"
            >
              📊 Table
            </button>
            <button
              className={`toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Card View"
            >
              🃏 Cards
            </button>
          </div>
        </div>
      </div>

      {/* Test Strategy */}
      {testPlan.testStrategy && (
        <div className="plan-section strategy">
          <h3>🎯 Test Strategy</h3>
          <p>{testPlan.testStrategy}</p>
        </div>
      )}

      {/* Source Issue Info */}
      {issueData && (
        <div className="plan-section source">
          <h3>📌 Source Issue Details</h3>
          <div className="source-grid">
            <div className="source-item">
              <span className="source-label">Type</span>
              <span className="source-value">{issueData.fields.issuetype.name}</span>
            </div>
            <div className="source-item">
              <span className="source-label">Priority</span>
              <span className="source-value">{issueData.fields.priority?.name || 'N/A'}</span>
            </div>
            <div className="source-item">
              <span className="source-label">Status</span>
              <span className="source-value">{issueData.fields.status.name}</span>
            </div>
            {issueData.fields.components?.length > 0 && (
              <div className="source-item">
                <span className="source-label">Components</span>
                <span className="source-value">{issueData.fields.components.map(c => c.name).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Test Cases */}
      {testPlan.testCases && testPlan.testCases.length > 0 && (
        <div className="plan-section cases">
          <h3>🧪 Test Cases ({testPlan.testCases.length})</h3>
          
          {/* Spreadsheet Table View */}
          {viewMode === 'table' && (
            <div className="spreadsheet-container">
              <table className="spreadsheet-table">
                <thead>
                  <tr>
                    <th className="col-id">#</th>
                    <th className="col-name">Test Case Name</th>
                    <th className="col-type">Type</th>
                    <th className="col-priority">Priority</th>
                    <th className="col-preconditions">Preconditions</th>
                    <th className="col-steps">Test Steps</th>
                    <th className="col-expected">Expected Result</th>
                  </tr>
                </thead>
                <tbody>
                  {testPlan.testCases.map((tc, index) => (
                    <tr key={tc.id} className={`spreadsheet-row ${tc.priority === 'High' ? 'priority-high' : tc.priority === 'Medium' ? 'priority-medium' : ''}`}>
                      <td className="col-id">{tc.id}</td>
                      <td className="col-name">
                        <span className="case-name-cell">{tc.name}</span>
                      </td>
                      <td className="col-type">
                        <span className={`type-badge-table ${tc.type.toLowerCase().replace(' ', '-')}`}>
                          {tc.type}
                        </span>
                      </td>
                      <td className="col-priority">
                        <span className="priority-badge-table">
                          {priorityIcons[tc.priority] || '⚪'} {tc.priority}
                        </span>
                      </td>
                      <td className="col-preconditions">{tc.preconditions}</td>
                      <td className="col-steps">
                        <div className="steps-cell">{tc.steps}</div>
                      </td>
                      <td className="col-expected">
                        <span className="expected-cell">{tc.expectedResult}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Card View */}
          {viewMode === 'cards' && (
            <div className="cases-list">
              {testPlan.testCases.map((tc) => (
                <div key={tc.id} className="case-card">
                  <div className="case-header">
                    <span className="case-id">TC-{tc.id}</span>
                    <span className={`type-badge ${tc.type.toLowerCase().replace(' ', '-')}`}>
                      {tc.type}
                    </span>
                    <span className="priority-badge">
                      {priorityIcons[tc.priority] || '⚪'} {tc.priority}
                    </span>
                  </div>
                  <h4 className="case-name">{tc.name}</h4>
                  <div className="case-details">
                    <div className="detail-row">
                      <span className="detail-label">Preconditions:</span>
                      <span className="detail-value">{tc.preconditions}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Steps:</span>
                      <span className="detail-value steps">{tc.steps}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Expected Result:</span>
                      <span className="detail-value expected">{tc.expectedResult}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edge Cases */}
      {testPlan.edgeCases && testPlan.edgeCases.length > 0 && (
        <div className="plan-section edge-cases">
          <h3>⚡ Edge Cases</h3>
          <ul className="bullet-list">
            {testPlan.edgeCases.map((ec, i) => (
              <li key={i}>{ec}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Negative Test Cases */}
      {testPlan.negativeTestCases && testPlan.negativeTestCases.length > 0 && (
        <div className="plan-section negative-cases">
          <h3>❌ Negative Test Cases</h3>
          <ul className="bullet-list">
            {testPlan.negativeTestCases.map((ntc, i) => (
              <li key={i}>{ntc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Security Considerations */}
      {testPlan.securityConsiderations && testPlan.securityConsiderations.length > 0 && (
        <div className="plan-section security">
          <h3>🔒 Security Considerations</h3>
          <ul className="bullet-list">
            {testPlan.securityConsiderations.map((sc, i) => (
              <li key={i}>{sc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Performance Tests */}
      {testPlan.performanceTests && testPlan.performanceTests.length > 0 && (
        <div className="plan-section performance">
          <h3>⚙️ Performance Tests</h3>
          <ul className="bullet-list">
            {testPlan.performanceTests.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Notes */}
      {testPlan.notes && (
        <div className="plan-section notes">
          <h3>📝 Notes</h3>
          <p>{testPlan.notes}</p>
        </div>
      )}
    </div>
  )
}

export default TestPlanDisplay

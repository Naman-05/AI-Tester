import React, { useState, useEffect } from 'react'
import './SettingsPanel.css'

function SettingsPanel({ settings, onSave }) {
  const [form, setForm] = useState(settings)

  useEffect(() => {
    setForm(settings)
  }, [settings])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onSave(form)
  }

  const handleClear = () => {
    const cleared = {
      jiraEmail: '',
      jiraToken: '',
      jiraBaseUrl: 'https://namansinghaljira.atlassian.net/',
      groqApiKey: '',
      groqModel: 'openai/gpt-oss-120b',
    }
    setForm(cleared)
    onSave(cleared)
  }

  return (
    <div className="settings-panel">
      <h2>⚙️ Configuration</h2>
      <p className="settings-subtitle">
        Store your JIRA and GROQ credentials here. They are saved in your browser's localStorage.
      </p>

      <div className="settings-section">
        <h3>JIRA Connection</h3>
        <div className="form-group">
          <label htmlFor="jiraEmail">JIRA Email Address</label>
          <input
            id="jiraEmail"
            name="jiraEmail"
            type="email"
            value={form.jiraEmail}
            onChange={handleChange}
            placeholder="your.email@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jiraToken">JIRA API Token</label>
          <input
            id="jiraToken"
            name="jiraToken"
            type="password"
            value={form.jiraToken}
            onChange={handleChange}
            placeholder="Your Atlassian API token"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jiraBaseUrl">JIRA Base URL</label>
          <input
            id="jiraBaseUrl"
            name="jiraBaseUrl"
            type="text"
            value={form.jiraBaseUrl}
            onChange={handleChange}
            placeholder="https://your-domain.atlassian.net/"
          />
        </div>
      </div>

      <div className="settings-section">
        <h3>GROQ AI Connection</h3>
        <div className="form-group">
          <label htmlFor="groqApiKey">GROQ API Key</label>
          <input
            id="groqApiKey"
            name="groqApiKey"
            type="password"
            value={form.groqApiKey}
            onChange={handleChange}
            placeholder="gsk_xxxxxxxxxxxxx"
          />
        </div>

        <div className="form-group">
          <label htmlFor="groqModel">GROQ Model</label>
          <input
            id="groqModel"
            name="groqModel"
            type="text"
            value={form.groqModel}
            onChange={handleChange}
            placeholder="openai/gpt-oss-120b"
          />
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn btn-primary" onClick={handleSave}>
          💾 Save Settings
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          🗑️ Clear All
        </button>
      </div>

      <div className="settings-info">
        <p><strong>🔒 Security Note:</strong> Your credentials are stored locally in your browser. They are never sent to any server except the respective APIs (JIRA and GROQ).</p>
      </div>
    </div>
  )
}

export default SettingsPanel

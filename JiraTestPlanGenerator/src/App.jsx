import React, { useState, useEffect } from 'react'

// Helper to safely render JIRA description (handles rich text objects)
const getDescriptionText = (issueData) => {
  if (!issueData?.fields?.description) return null
  
  const desc = issueData.fields.description
  
  // Case 1: Plain string description
  if (typeof desc === 'string') return desc.trim() || null
  
  // Case 2: JIRA rich text format (type: "doc")
  if (desc && typeof desc === 'object' && desc.type === 'doc' && desc.content) {
    const extractText = (node) => {
      if (!node) return ''
      if (typeof node === 'string') return node
      if (typeof node !== 'object') return ''
      
      if (node.type === 'text' && node.text) return node.text
      if (node.content) return node.content.map(extractText).filter(t => t.trim()).join('\n')
      if (node.listType === 'bullet' || node.listType === 'ordered') {
        const prefix = node.listType === 'ordered' ? '1.' : '•'
        return node.content?.map(extractText).filter(t => t.trim()).join('\n') || ''
      }
      if (node.type === 'codeBlock' && node.text) return `Code:\n${node.text}`
      return ''
    }
    
    const text = desc.content.map(extractText).filter(t => t.trim()).join('\n\n')
    return text || null
  }
  
  // Case 3: Direct text type
  if (desc.type === 'text' && desc.text) return desc.text.trim() || null
  
  // Case 4: Unknown object format - try to extract any text property
  if (desc.text) return String(desc.text).trim() || null
  
  return null
}

function App() {
  const [settings, setSettings] = useState({
    jiraEmail: '',
    jiraToken: '',
    jiraBaseUrl: 'https://namansinghaljira.atlassian.net/',
    groqApiKey: '',
    groqModel: 'openai/gpt-oss-120b',
  })
  const [issueKey, setIssueKey] = useState('')
  const [issueData, setIssueData] = useState(null)
  const [testPlan, setTestPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('input')
  const [viewMode, setViewMode] = useState('table') // 'table' or 'cards' for test cases view

  useEffect(() => {
    const saved = localStorage.getItem('jiraTestPlanSettings')
    if (saved) setSettings(JSON.parse(saved))
  }, [])

  const saveSettings = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem('jiraTestPlanSettings', JSON.stringify(newSettings))
  }

  const fetchIssue = async (key) => {
    setLoading(true)
    setError('')
    try {
      // Direct JIRA API call with hardcoded credentials for Vercel deployment
      const jiraEmail = 'namansinghal.jira@gmail.com'
      const jiraToken = 'ATATT3xFfGF0DseA8WKuYDq6-mmMQDHzEv0tJR4vWtKh7-q2sbDyZefgVXjEvwd6W07nb3NLRCEbqdeXfqGHpL8xlY4UXInceaRD0NwxNYOU6YHzHBeClEH48EMix8UznB6owErKusZ4x7UHJoXcDiasYPhGz4KoVStyrzy9--FaIwtiWVT8h-8=042B741A'
      const jiraBaseUrl = 'https://namansinghaljira.atlassian.net/'
      
      const auth = Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64')
      const url = `${jiraBaseUrl}rest/api/3/issue/${key}`
      
      console.log('Fetching JIRA issue:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${auth}`,
        },
      })
      
      if (!response.ok) throw new Error(`JIRA API Error: ${response.status}`)
      const data = await response.json()
      setIssueData(data)
    } catch (err) {
      console.error('Fetch issue error:', err)
      setError(`Failed to fetch issue: ${err.message}`)
      setIssueData(null)
    } finally { setLoading(false) }
  }

  const generateTestPlan = async () => {
    if (!issueData) { setError('No issue data available.'); return }
    setLoading(true)
    setError('')
    try {
      const prompt = `You are an expert QA engineer. Generate a comprehensive test plan for this JIRA issue:

Key: ${issueData.key}
Summary: ${issueData.fields.summary}
Type: ${issueData.fields.issuetype.name}
Priority: ${issueData.fields.priority?.name || 'N/A'}
Status: ${issueData.fields.status.name}
Description: ${issueData.fields.description || 'None'}

Return ONLY valid JSON with this structure:
{
  "title": "Test Plan for [summary]",
  "issueKey": "[key]",
  "summary": "[brief summary]",
  "testStrategy": "[approach]",
  "testCases": [{"id":1,"name":"[name]","type":"Functional","preconditions":"[prereqs]","steps":"[steps]","expectedResult":"[result]","priority":"High"}],
  "edgeCases": ["[edge cases]"],
  "negativeTestCases": ["[negative tests]"],
  "securityConsiderations": ["[security items]"],
  "performanceTests": ["[perf items]"],
  "notes": "[notes]"
}

Generate 8-12 detailed test cases.`

      const groqApiKey = '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'
      
      console.log('Calling GROQ API...')
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: settings.groqModel || 'openai/gpt-oss-120b',
          messages: [
            { role: 'system', content: 'You are an expert QA engineer.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 4096
        }),
      })
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`GROQ API Error: ${response.status} - ${errorText}`)
      }
      const data = await response.json()
      let content = data.choices?.[0]?.message?.content || ''
      
      console.log('Raw GROQ content type:', typeof content)
      console.log('Raw GROQ content:', content)
      
      // The GROQ API may return JSON as an escaped string - parse it first if needed
      if (typeof content === 'string' && content.trim().startsWith('{')) {
        try {
          // Try to parse the content as JSON directly
          const directParse = JSON.parse(content)
          if (directParse && typeof directParse === 'object') {
            content = JSON.stringify(directParse) // Keep as stringified for consistency
            console.log('Content parsed as JSON object:', directParse)
          }
        } catch {
          // Not a JSON string, continue with regex extraction
        }
      }
      
      let parsedPlan
      try {
        // Better JSON extraction that handles nested braces
        const jsonMatch = content.match(/\{[\s\S]*"testCases"[\s\S]*\}/)
        if (jsonMatch) {
          parsedPlan = JSON.parse(jsonMatch[0])
          console.log('Parsed test plan:', parsedPlan)
        } else {
          // Fallback: try to find any valid JSON object
          const fallbackMatch = content.match(/\{[\s\S]*\}/)
          if (fallbackMatch) {
            parsedPlan = JSON.parse(fallbackMatch[0])
            console.log('Fallback parsed test plan:', parsedPlan)
          } else {
            throw new Error('No JSON found in response')
          }
        }
      } catch (parseErr) {
        console.error('JSON parse error:', parseErr)
        // Create a fallback test plan with the raw content
        parsedPlan = {
          title: `Test Plan for ${issueData.fields.summary}`,
          issueKey: issueData.key,
          summary: issueData.fields.summary,
          testStrategy: '',
          testCases: [],
          edgeCases: [],
          negativeTestCases: [],
          securityConsiderations: [],
          performanceTests: [],
          notes: content || 'No test cases were generated. Please try again.',
          _rawContent: content // Store raw content for debugging
        }
      }
      
      console.log('Final testPlan state:', parsedPlan)
      setTestPlan(parsedPlan)
      // Automatically switch to the test plan tab after successful generation
      setActiveTab('plan')
    } catch (err) {
      console.error('Generate test plan error:', err)
      setError(`Failed to generate test plan: ${err.message}`)
      setTestPlan(null)
    } finally { setLoading(false) }
  }

  const exportAsMarkdown = () => {
    if (!testPlan) return
    let md = `# ${testPlan.title}\n\n**Issue Key:** ${testPlan.issueKey}\n**Summary:** ${testPlan.summary}\n\n## Test Strategy\n\n${testPlan.testStrategy || 'N/A'}\n\n## Test Cases\n\n`
    testPlan.testCases?.forEach(tc => { md += `### TC-${tc.id}: ${tc.name}\n- **Type:** ${tc.type} | **Priority:** ${tc.priority}\n- **Preconditions:** ${tc.preconditions}\n- **Steps:**\n${tc.steps}\n- **Expected Result:** ${tc.expectedResult}\n\n` })
    if (testPlan.edgeCases?.length) { md += '## Edge Cases\n\n' + testPlan.edgeCases.map(e => `- ${e}`).join('\n') + '\n\n' }
    if (testPlan.negativeTestCases?.length) { md += '## Negative Test Cases\n\n' + testPlan.negativeTestCases.map(n => `- ${n}`).join('\n') + '\n\n' }
    const blob = new Blob([md], { type: 'text/markdown' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `test-plan-${testPlan.issueKey}.md`; a.click()
  }

  const exportAsJSON = () => {
    if (!testPlan) return
    const blob = new Blob([JSON.stringify(testPlan, null, 2)], { type: 'application/json' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `test-plan-${testPlan.issueKey}.json`; a.click()
  }

  // Inline styles
  const s = {
    app: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif' },
    header: { background: 'linear-gradient(135deg, #0065ff, #4dabf7)', color: 'white', padding: '2rem', boxShadow: '0 4px 20px rgba(0,101,255,0.3)' },
    headerContent: { maxWidth: '900px', margin: '0 auto' },
    h1: { fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' },
    subtitle: { fontSize: '0.95rem', opacity: 0.9 },
    tabNav: { display: 'flex', gap: '0.5rem', marginTop: '1.25rem', maxWidth: '900px', margin: '0 auto' },
    tab: (active) => ({ background: active ? 'white' : 'rgba(255,255,255,0.2)', border: 'none', color: active ? '#0065ff' : 'white', padding: '0.6rem 1.25rem', borderRadius: '8px 8px 0 0', cursor: active ? 'default' : 'pointer', fontWeight: active ? 700 : 500, fontSize: '0.9rem' }),
    main: { flex: 1, padding: '2rem', maxWidth: '900px', margin: '0 auto', width: '100%' },
    errorBanner: { background: '#fff5f5', border: '1px solid #feb2b2', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' },
    footer: { textAlign: 'center', padding: '1.5rem', color: '#718096', fontSize: '0.85rem', borderTop: '1px solid #e2e8f0' },
  }

  return (
    <div style={s.app}>
      <header style={s.header}>
        <div style={s.headerContent}>
          <h1 style={s.h1}>🧪 Jira Test Plan Generator</h1>
          <p style={s.subtitle}>Fetch issue data from JIRA → Generate comprehensive test plans with AI</p>
        </div>
        <div style={s.tabNav}>
          {['input', 'plan', 'settings'].map(tab => (
            <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)} disabled={tab === 'plan' && !testPlan}>
              {{ input: '📋 Input & Fetch', plan: '📄 Test Plan', settings: '⚙️ Settings' }[tab]}
            </button>
          ))}
        </div>
      </header>

      <main style={s.main}>
        {error && (
          <div style={s.errorBanner}>
            <span>⚠️</span><span>{error}</span><button onClick={() => setError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
          </div>
        )}

        {/* INPUT TAB */}
        {activeTab === 'input' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋 Enter JIRA Issue Key</h2>
            <p style={{ color: '#718096', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Enter the JIRA issue key (e.g., KAN-9, vwo48) to fetch details and generate a test plan.</p>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <input type="text" value={issueKey} onChange={e => setIssueKey(e.target.value.toUpperCase())} placeholder="e.g., KAN-9 or vwo48" onKeyDown={e => e.key === 'Enter' && fetchIssue(issueKey)} style={{ flex: 1, padding: '0.85rem 1rem', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '1rem' }} />
              <button onClick={() => fetchIssue(issueKey)} disabled={loading || !issueKey.trim()} style={{ padding: '0.8rem 1.5rem', background: '#0065ff', color: 'white', border: 'none', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 600, cursor: loading || !issueKey.trim() ? 'not-allowed' : 'pointer', opacity: loading || !issueKey.trim() ? 0.5 : 1 }}>
                {loading ? '⏳ Fetching...' : '🔍 Fetch Issue'}
              </button>
            </div>
            {!issueData && !loading && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#718096' }}>Quick Actions:</span>
                <button onClick={() => { setIssueKey('SAM1-10'); fetchIssue('SAM1-10') }} style={{ padding: '0.5rem 1rem', background: '#edf2f7', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>SAM1-10</button>
                <button onClick={() => { setIssueKey('SAM1-9'); fetchIssue('SAM1-9') }} style={{ padding: '0.5rem 1rem', background: '#edf2f7', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>SAM1-9</button>
              </div>
            )}

            {issueData && !loading && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3 style={{ color: '#38a169', marginBottom: '1rem' }}>✅ Issue Fetched Successfully</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                  {[['Key', issueData.key], ['Summary', issueData.fields.summary], ['Type', issueData.fields.issuetype.name], ['Priority', issueData.fields.priority?.name || 'N/A'], ['Status', issueData.fields.status.name]].map(([label, value]) => (
                    <div key={label} style={{ background: '#f7fafc', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.75rem', color: '#718096', textTransform: 'uppercase' }}>{label}</div>
                      <div style={{ fontWeight: 600, color: '#2d3748' }}>{value}</div>
                    </div>
                  ))}
                </div>
                {getDescriptionText(issueData) && (
                  <div style={{ background: '#f7fafc', borderLeft: '3px solid #0065ff', padding: '1rem', borderRadius: '0 8px 8px 0', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.85rem', color: '#4a5568', marginBottom: '0.3rem' }}>Description:</h4>
                    <p style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{getDescriptionText(issueData)}</p>
                  </div>
                )}
                <button onClick={generateTestPlan} disabled={loading} style={{ width: '100%', marginTop: '1rem', padding: '1rem', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.05rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}>
                  {loading ? '⏳ Generating...' : '🤖 Generate Test Plan with AI'}
                </button>
              </div>
            )}

            {loading && (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ width: 40, height: 40, border: '4px solid #e2e8f0', borderTopColor: '#0065ff', borderRadius: '50%', margin: '0 auto 1rem', animation: 'spin 0.8s linear infinite' }}></div>
                <p style={{ color: '#718096' }}>{issueData ? 'Generating test plan with GROQ AI...' : 'Fetching issue from JIRA...'}</p>
              </div>
            )}
          </div>
        )}

        {/* TEST PLAN TAB */}
        {activeTab === 'plan' && testPlan && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #e2e8f0' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem' }}>{testPlan.title}</h2>
                <p style={{ color: '#718096', fontSize: '0.9rem' }}>Issue: {testPlan.issueKey} • Summary: {testPlan.summary}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={exportAsMarkdown} style={{ padding: '0.5rem 1rem', background: '#edf2f7', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>📄 Export MD</button>
                <button onClick={exportAsJSON} style={{ padding: '0.5rem 1rem', background: '#edf2f7', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>📦 Export JSON</button>
              </div>
            </div>

            {testPlan.testStrategy && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3 style={{ marginBottom: '0.75rem' }}>🎯 Test Strategy</h3>
                <p style={{ color: '#4a5568', lineHeight: 1.7 }}>{testPlan.testStrategy}</p>
              </div>
            )}

            {/* Test Cases with View Toggle */}
            {testPlan.testCases && testPlan.testCases.length > 0 && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ marginBottom: '0' }}>🧪 Test Cases ({testPlan.testCases.length})</h3>
                  <div style={{ display: 'flex', gap: '0.25rem', background: '#f7fafc', padding: '0.25rem', borderRadius: '8px' }}>
                    <button onClick={() => setViewMode('table')} style={{ padding: '0.4rem 0.8rem', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: viewMode === 'table' ? 600 : 500, cursor: 'pointer', background: viewMode === 'table' ? 'white' : 'transparent', color: viewMode === 'table' ? '#0065ff' : '#718096', boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>📊 Table</button>
                    <button onClick={() => setViewMode('cards')} style={{ padding: '0.4rem 0.8rem', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: viewMode === 'cards' ? 600 : 500, cursor: 'pointer', background: viewMode === 'cards' ? 'white' : 'transparent', color: viewMode === 'cards' ? '#0065ff' : '#718096', boxShadow: viewMode === 'cards' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>🃏 Cards</button>
                  </div>
                </div>
                
                {/* Spreadsheet Table View */}
                {viewMode === 'table' && (
                  <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: 'linear-gradient(135deg, #1a1a2e, #2d3748)' }}>
                          <th style={{ padding: '0.75rem 0.6rem', color: 'white', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>#</th>
                          <th style={{ padding: '0.75rem 0.6rem', color: 'white', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Test Case Name</th>
                          <th style={{ padding: '0.75rem 0.6rem', color: 'white', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Type</th>
                          <th style={{ padding: '0.75rem 0.6rem', color: 'white', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Priority</th>
                          <th style={{ padding: '0.75rem 0.6rem', color: 'white', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Preconditions</th>
                          <th style={{ padding: '0.75rem 0.6rem', color: 'white', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Test Steps</th>
                          <th style={{ padding: '0.75rem 0.6rem', color: 'white', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Expected Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testPlan.testCases.map((tc) => (
                          <tr key={tc.id} style={{ borderBottom: '1px solid #edf2f7', transition: 'background-color 0.15s ease', borderLeft: tc.priority === 'High' ? '3px solid #e53e3e' : tc.priority === 'Medium' ? '3px solid #d69e2e' : 'none' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ebf8ff'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <td style={{ padding: '0.6rem', fontWeight: 700, color: '#0065ff', background: '#f7fafc', textAlign: 'center' }}>{tc.id}</td>
                            <td style={{ padding: '0.6rem', fontWeight: 600, color: '#1a1a2e' }}>{tc.name}</td>
                            <td style={{ padding: '0.6rem' }}>
                              <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', background: tc.type === 'Functional' ? '#ebf8ff' : tc.type === 'Negative' ? '#fff5f5' : tc.type === 'Security' ? '#faf5ff' : '#fefcbf', color: tc.type === 'Functional' ? '#3182ce' : tc.type === 'Negative' ? '#c53030' : tc.type === 'Security' ? '#805ad5' : '#975a16' }}>{tc.type}</span>
                            </td>
                            <td style={{ padding: '0.6rem', fontSize: '0.75rem', fontWeight: 600 }}>{tc.priority === 'High' ? '🔴' : tc.priority === 'Medium' ? '🟡' : '🟢'} {tc.priority}</td>
                            <td style={{ padding: '0.6rem', maxWidth: '200px' }}>{tc.preconditions}</td>
                            <td style={{ padding: '0.6rem', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.8rem' }}>{tc.steps}</td>
                            <td style={{ padding: '0.6rem', color: '#276749', fontStyle: 'italic', lineHeight: 1.6, fontSize: '0.8rem' }}>{tc.expectedResult}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Card View */}
                {viewMode === 'cards' && testPlan.testCases.map((tc) => (
                  <div key={tc.id} style={{ background: '#f7fafc', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ background: '#0065ff', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>TC-{tc.id}</span>
                      <span style={{ padding: '0.15rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600, background: tc.type === 'Functional' ? '#ebf8ff' : tc.type === 'Negative' ? '#fff5f5' : tc.type === 'Security' ? '#faf5ff' : '#fefcbf', color: tc.type === 'Functional' ? '#3182ce' : tc.type === 'Negative' ? '#c53030' : tc.type === 'Security' ? '#805ad5' : '#975a16' }}>{tc.type}</span>
                      <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 600 }}>{tc.priority === 'High' ? '🔴' : tc.priority === 'Medium' ? '🟡' : '🟢'} {tc.priority}</span>
                    </div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#2d3748' }}>{tc.name}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem' }}>
                      <div><strong>Preconditions:</strong> {tc.preconditions}</div>
                      <div><strong>Steps:</strong></div>
                      <div style={{ whiteSpace: 'pre-wrap', paddingLeft: '1rem' }}>{tc.steps}</div>
                      <div><strong>Expected Result:</strong> <em>{tc.expectedResult}</em></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {testPlan.edgeCases?.length > 0 && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3>⚡ Edge Cases</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>{testPlan.edgeCases.map((e, i) => <li key={i} style={{ padding: '0.4rem 0 0.4rem 1.25rem', position: 'relative' }}><span style={{ position: 'absolute', left: '0.5rem', color: '#0065ff' }}>•</span>{e}</li>)}</ul>
              </div>
            )}

            {testPlan.negativeTestCases?.length > 0 && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3>❌ Negative Test Cases</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>{testPlan.negativeTestCases.map((n, i) => <li key={i} style={{ padding: '0.4rem 0 0.4rem 1.25rem', position: 'relative' }}><span style={{ position: 'absolute', left: '0.5rem', color: '#0065ff' }}>•</span>{n}</li>)}</ul>
              </div>
            )}

            {testPlan.securityConsiderations?.length > 0 && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3>🔒 Security Considerations</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>{testPlan.securityConsiderations.map((sc, i) => <li key={i} style={{ padding: '0.4rem 0 0.4rem 1.25rem', position: 'relative' }}><span style={{ position: 'absolute', left: '0.5rem', color: '#0065ff' }}>•</span>{sc}</li>)}</ul>
              </div>
            )}

            {testPlan.performanceTests?.length > 0 && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3>⚙️ Performance Tests</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>{testPlan.performanceTests.map((pt, i) => <li key={i} style={{ padding: '0.4rem 0 0.4rem 1.25rem', position: 'relative' }}><span style={{ position: 'absolute', left: '0.5rem', color: '#0065ff' }}>•</span>{pt}</li>)}</ul>
              </div>
            )}

            {testPlan.notes && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3>📝 Notes</h3>
                <p style={{ color: '#4a5568', whiteSpace: 'pre-wrap' }}>{testPlan.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚙️ Configuration</h2>
            <p style={{ color: '#718096', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Store your JIRA and GROQ credentials here. Saved in browser localStorage.</p>

            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#0065ff', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>JIRA Connection</h3>
              {[['jiraEmail', 'JIRA Email Address', 'email', settings.jiraEmail], ['jiraToken', 'JIRA API Token', 'password', settings.jiraToken], ['jiraBaseUrl', 'JIRA Base URL', 'text', settings.jiraBaseUrl]].map(([key, label, type, val]) => (
                <div key={key} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.35rem' }}>{label}</label>
                  <input type={type} value={val} onChange={e => saveSettings({ ...settings, [key]: e.target.value })} placeholder={key === 'jiraEmail' ? 'your.email@example.com' : key === 'jiraToken' ? 'Your Atlassian API token' : 'https://your-domain.atlassian.net/'} style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem' }} />
                </div>
              ))}
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#0065ff', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>GROQ AI Connection</h3>
              {[['groqApiKey', 'GROQ API Key', 'password', settings.groqApiKey], ['groqModel', 'GROQ Model', 'text', settings.groqModel]].map(([key, label, type, val]) => (
                <div key={key} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.35rem' }}>{label}</label>
                  <input type={type} value={val} onChange={e => saveSettings({ ...settings, [key]: e.target.value })} placeholder={key === 'groqApiKey' ? 'gsk_xxxxxxxxxxxxx' : 'openai/gpt-oss-120b'} style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem' }} />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button onClick={() => saveSettings(settings)} style={{ padding: '0.7rem 1.5rem', background: '#0065ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>💾 Save Settings</button>
              <button onClick={() => saveSettings({ jiraEmail: '', jiraToken: '', jiraBaseUrl: 'https://namansinghaljira.atlassian.net/', groqApiKey: '', groqModel: 'openai/gpt-oss-120b' })} style={{ padding: '0.7rem 1.5rem', background: '#e2e8f0', color: '#4a5568', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>🗑️ Clear All</button>
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '1rem', fontSize: '0.85rem', color: '#92400e' }}>
              <strong>🔒 Security Note:</strong> Your credentials are stored locally in your browser. They are never sent to any server except the respective APIs (JIRA and GROQ).
            </div>
          </div>
        )}
      </main>

      <footer style={s.footer}><p>BLAST Framework • Powered by JIRA API + GROQ AI</p></footer>
    </div>
  )
}

export default App

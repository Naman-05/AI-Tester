import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const jiraEmail = process.env.JIRA_EMAIL || ''
const jiraToken = process.env.JIRA_TOKEN || ''
const jiraBaseUrl = (process.env.JIRA_BASE_URL || 'https://namansinghaljira.atlassian.net').replace(/\/+$/, '')

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/jira': {
        target: jiraBaseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/jira/, '/rest/api/3'),
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64')}`,
        },
      },
    },
  },
})

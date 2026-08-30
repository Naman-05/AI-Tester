import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/jira': {
        target: process.env.JIRA_BASE_URL || 'https://namansinghaljira.atlassian.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/jira/, '/rest/api/3'),
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_TOKEN}`).toString('base64')}`,
        },
      },
      '/api/groq': {
        target: 'https://api.groq.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/groq\/generate/, '/openai/v1/chat/completions'),
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_KEY}`,
        },
      },
    },
  },
})

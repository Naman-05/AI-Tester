import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hardcoded credentials — update here or in .env at project root
const jiraEmail = 'namansinghal.jira@gmail.com'
const jiraToken = 'ATATT3xFfGF0DseA8WKuYDq6-mmMQDHzEv0tJR4vWtKh7-q2sbDyZefgVXjEvwd6W07nb3NLRCEbqdeXfqGHpL8xlY4UXInceaRD0NwxNYOU6YHzHBeClEH48EMix8UznB6owErKusZ4x7UHJoXcDiasYPhGz4KoVStyrzy9--FaIwtiWVT8h-8=042B741A'
const jiraBaseUrl = 'https://namansinghaljira.atlassian.net'
const groqApiKey = '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'

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
      '/api/groq': {
        target: 'https://api.groq.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/groq\/generate/, '/openai/v1/chat/completions'),
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
        },
      },
    },
  },
})

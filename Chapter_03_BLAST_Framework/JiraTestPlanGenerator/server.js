import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

dotenv.config({ path: 'D:/My Learning/AI Tester/Chapter_03_BLAST_Framework/.env' });

const app = express();
app.use(cors());
app.use(express.json());

// JIRA API proxy
app.get('/api/jira/issue/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const email = process.env.JIRA_EMAIL;
    const token = process.env.JIRA_TOKEN;
    const baseUrl = process.env.JIRA_BASE_URL || 'https://namansinghaljira.atlassian.net/';
    
    if (!email || !token) {
      return res.status(500).json({ error: 'JIRA credentials not configured in .env file' });
    }
    
    const auth = Buffer.from(`${email}:${token}`).toString('base64');
    
    const response = await axios.get(`${baseUrl}rest/api/3/issue/${key}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('JIRA API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.errorMessages?.[0] || 'Failed to fetch issue' 
    });
  }
});

// GROQ AI proxy
app.post('/api/groq/generate', async (req, res) => {
  try {
    const { prompt, model } = req.body;
    const apiKey = process.env.GROQ_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'GROQ API key not configured in .env file' });
    }
    
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: model || 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: 'You are an expert QA engineer.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4096
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('GROQ API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.error?.message || 'Failed to generate test plan' 
    });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`   JIRA proxy: GET /api/jira/issue/:key`);
  console.log(`   GROQ proxy: POST /api/groq/generate`);
});

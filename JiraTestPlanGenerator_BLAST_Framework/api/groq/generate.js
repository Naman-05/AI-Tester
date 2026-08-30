export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { prompt, model } = await req.json();
    const apiKey = process.env.GROQ_KEY;
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GROQ API key not configured' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model || 'openai/gpt-oss-120b',
          messages: [
            { role: 'system', content: 'You are an expert QA engineer.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 4096
        })
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || `GROQ API error: ${response.status}`);
    }
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('GROQ API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate test plan' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
}

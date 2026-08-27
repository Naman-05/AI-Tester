import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const key = req.nextUrl.pathname.split('/').pop();
    const email = process.env.JIRA_EMAIL;
    const token = process.env.JIRA_TOKEN;
    const baseUrl = process.env.JIRA_BASE_URL || 'https://namansinghaljira.atlassian.net/';
    
    if (!email || !token) {
      return NextResponse.json({ error: 'JIRA credentials not configured' }, { status: 500 });
    }
    
    const auth = Buffer.from(`${email}:${token}`).toString('base64');
    
    const response = await fetch(`${baseUrl}rest/api/3/issue/${key}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`JIRA API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('JIRA API Error:', error);
    
    if (!response.ok) {
      throw new Error(`JIRA API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('JIRA API Error:', error);
    
    if (!response.ok) {
      throw new Error(`JIRA API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('JIRA API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch issue' }, { status: 500 });
  }
}

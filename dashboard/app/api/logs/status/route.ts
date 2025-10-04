import { NextResponse } from 'next/server';
import { agentConfig } from '@/lib/agent-config';

export async function GET() {
  try {
    // Read environment variables at runtime, not build time
    const AGENT_API_URL = agentConfig.url;
    const AGENT_API_TOKEN = agentConfig.token;

    console.log('Connecting to agent at:', AGENT_API_URL);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (AGENT_API_TOKEN) {
      headers['Authorization'] = `Bearer ${AGENT_API_TOKEN}`;
    }

    const response = await fetch(
      `${AGENT_API_URL}/api/logs/status`,
      { headers }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `Agent error: ${error}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Status API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch status', details: String(error) },
      { status: 500 }
    );
  }
}
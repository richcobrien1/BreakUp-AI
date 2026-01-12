/**
 * Cloudflare Pages Function - Compare States API
 * Handles /api/legal/compare-states requests
 */

interface Env {
  CLERK_SECRET_KEY: string;
  RAG_SERVICE_URL: string;
  CACHE: KVNamespace;
}

interface CompareStatesRequest {
  topic: string;
  states: string[];
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body: CompareStatesRequest = await request.json();

    if (!body.topic || !body.states || body.states.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Topic and at least 2 states are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check cache
    const cacheKey = `compare:${body.topic}:${body.states.sort().join(',')}`;
    const cached = env.CACHE ? await env.CACHE.get(cacheKey, 'json') : null;
    
    if (cached) {
      return new Response(JSON.stringify(cached), {
        headers: { 
          'Content-Type': 'application/json',
          'X-Cache': 'HIT',
        },
      });
    }

    // Forward to RAG service
    const ragResponse = await fetch(`${env.RAG_SERVICE_URL}/compare-states`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': request.headers.get('X-User-ID') || 'anonymous',
      },
      body: JSON.stringify(body),
    });

    if (!ragResponse.ok) {
      throw new Error(`RAG service error: ${ragResponse.status}`);
    }

    const data = await ragResponse.json();

    // Cache for 12 hours
    if (env.CACHE) {
      await env.CACHE.put(cacheKey, JSON.stringify(data), {
        expirationTtl: 43200,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Compare states error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

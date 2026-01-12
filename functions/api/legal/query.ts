/**
 * Cloudflare Pages Function - Legal Query API
 * Handles /api/legal/query requests
 */

interface Env {
  CLERK_SECRET_KEY: string;
  RAG_SERVICE_URL: string;
  CACHE: KVNamespace;
}

interface LegalQueryRequest {
  query: string;
  jurisdiction?: string;
  context?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    // Verify Clerk authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse request body
    const body: LegalQueryRequest = await request.json();

    if (!body.query) {
      return new Response(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check cache first
    const cacheKey = `query:${body.query}:${body.jurisdiction || 'all'}`;
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
    const ragResponse = await fetch(`${env.RAG_SERVICE_URL}/query`, {
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

    // Cache the response for 1 hour
    if (env.CACHE) {
      await env.CACHE.put(cacheKey, JSON.stringify(data), {
        expirationTtl: 3600,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Legal query error:', error);
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

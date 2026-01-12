/**
 * Cloudflare Pages Function - User Profile API
 * Handles /api/user/profile requests
 */

interface Env {
  CLERK_SECRET_KEY: string;
  DB: D1Database;
}

interface UserProfile {
  userId: string;
  email: string;
  preferences?: {
    defaultJurisdiction?: string;
    emailNotifications?: boolean;
  };
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userId = request.headers.get('X-User-ID');
    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID missing' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Query D1 database for user profile
    if (env.DB) {
      const result = await env.DB.prepare(
        'SELECT * FROM user_profiles WHERE user_id = ?'
      )
        .bind(userId)
        .first();

      if (result) {
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Return minimal profile if not found
    return new Response(
      JSON.stringify({
        userId,
        preferences: {},
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Profile fetch error:', error);
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

export const onRequestPut: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userId = request.headers.get('X-User-ID');
    const body: Partial<UserProfile> = await request.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID missing' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update D1 database
    if (env.DB && body.preferences) {
      await env.DB.prepare(
        `INSERT INTO user_profiles (user_id, preferences, updated_at)
         VALUES (?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(user_id) DO UPDATE SET
         preferences = ?, updated_at = CURRENT_TIMESTAMP`
      )
        .bind(userId, JSON.stringify(body.preferences), JSON.stringify(body.preferences))
        .run();
    }

    return new Response(
      JSON.stringify({ success: true, userId, preferences: body.preferences }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Profile update error:', error);
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

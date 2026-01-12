# Deploying to Cloudflare

This guide covers deploying BreakupAI to Cloudflare's platform using Cloudflare Pages (frontend) and Workers (API).

## Architecture Overview

- **Frontend**: Cloudflare Pages (React/Vite static site)
- **API Functions**: Cloudflare Pages Functions (serverless)
- **RAG Service**: External hosting (Railway, Render, or Cloudflare Workers)
- **Database**: Cloudflare D1 (SQL) or external PostgreSQL
- **Cache**: Cloudflare KV (key-value store)
- **Vectors**: Cloudflare Vectorize or external Pinecone

## Prerequisites

1. **Cloudflare Account**: Sign up at https://dash.cloudflare.com
2. **Wrangler CLI**: Install globally
   ```bash
   npm install -g wrangler
   ```
3. **Authentication**: Log in to Wrangler
   ```bash
   wrangler login
   ```

## Quick Deployment

### 1. Deploy Frontend to Cloudflare Pages

**Option A: Via Git Integration (Recommended)**

1. Push your code to GitHub (already done)
2. Go to https://dash.cloudflare.com
3. Navigate to **Pages** → **Create a project**
4. Connect your GitHub repository: `richcobrien1/BreakUp-AI`
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave default)
   - **Environment variables**: Add your secrets (see below)
6. Click **Save and Deploy**

**Option B: Via Wrangler CLI**

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=breakupai
```

### 2. Configure Environment Variables

In the Cloudflare Pages dashboard, add these environment variables:

#### Production Environment

```
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxx
RAG_SERVICE_URL=https://your-rag-service.com
CLERK_SECRET_KEY=sk_live_xxxx
```

#### Preview Environment (Optional)

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
RAG_SERVICE_URL=https://staging-rag-service.com
CLERK_SECRET_KEY=sk_test_xxxx
```

### 3. Set Up Cloudflare KV (Caching)

```bash
# Create KV namespace for production
wrangler kv:namespace create "CACHE"

# Create KV namespace for preview
wrangler kv:namespace create "CACHE" --preview

# Add the IDs to wrangler.toml
```

Update `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "CACHE"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

### 4. Set Up Cloudflare D1 Database (Optional)

If using D1 instead of external PostgreSQL:

```bash
# Create D1 database
wrangler d1 create breakupai-db

# Run migrations
wrangler d1 execute breakupai-db --file=./migrations/schema.sql

# Add binding to wrangler.toml
```

Create `migrations/schema.sql`:
```sql
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id TEXT PRIMARY KEY,
  email TEXT,
  preferences TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS query_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  query TEXT NOT NULL,
  response TEXT,
  jurisdiction TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Deploy RAG Service

The Python RAG service needs separate hosting. Options:

**Option A: Railway.app**
```bash
cd rag-service
railway init
railway up
```

**Option B: Render.com**
1. Connect GitHub repo
2. Create new Web Service
3. Set root directory to `rag-service`
4. Add environment variables

**Option C: Cloudflare Workers (Advanced)**
- Requires refactoring Python to JavaScript/TypeScript
- Use Cloudflare Vectorize for embeddings
- Use Cloudflare AI for LLM calls

### 6. Update API Redirects

In `_redirects`, update the RAG service URL:
```
/api/*  https://your-rag-service.railway.app/:splat  200
```

Or configure in Cloudflare Pages Functions to use environment variable.

## Development Workflow

### Local Development with Pages Functions

```bash
# Install dependencies
npm install

# Build the frontend
npm run build

# Run Cloudflare Pages dev server with Functions
npm run pages:dev
```

This runs your site locally with Cloudflare Pages Functions enabled.

### Testing Pages Functions Locally

```bash
# Start local dev environment
wrangler pages dev dist --port 3000 --kv CACHE

# In another terminal, test API endpoints
curl http://localhost:3000/api/legal/query \
  -H "Authorization: Bearer test-token" \
  -H "X-User-ID: user_123" \
  -d '{"query": "What is community property?"}'
```

## Cloudflare Features Configuration

### Custom Domain

1. Go to Pages project settings
2. Click **Custom domains**
3. Add your domain: `breakupai.com`
4. Update DNS records as instructed

### Access Policies

Protect staging environments:

1. Go to **Access** → **Applications**
2. Create application for `staging.breakupai.com`
3. Add email authentication policy
4. Save policy

### Analytics

Enable **Web Analytics** in Pages settings:
- Real-time visitor metrics
- Performance insights
- No client-side JavaScript required

### Preview Deployments

Every GitHub push creates a preview deployment:
- Automatic previews for PRs
- Unique URL: `https://abc123.breakupai.pages.dev`
- Full environment isolation

## Production Checklist

- [ ] Set production environment variables in Cloudflare dashboard
- [ ] Configure Clerk production keys
- [ ] Deploy RAG service to production hosting
- [ ] Set up Cloudflare KV namespace
- [ ] Configure D1 database (if using)
- [ ] Update `_redirects` with production RAG URL
- [ ] Add custom domain
- [ ] Enable WAF and DDoS protection
- [ ] Set up monitoring and alerts
- [ ] Configure CI/CD with GitHub Actions (optional)
- [ ] Test authentication flow end-to-end
- [ ] Load test API endpoints
- [ ] Set up error tracking (Sentry, etc.)

## Monitoring & Debugging

### View Logs

```bash
# Real-time function logs
wrangler pages deployment tail

# View specific deployment logs
wrangler pages deployment tail --project-name=breakupai
```

### Check Deployment Status

```bash
wrangler pages deployment list --project-name=breakupai
```

### Rollback Deployment

In Cloudflare dashboard:
1. Go to **Deployments**
2. Find previous successful deployment
3. Click **Rollback to this deployment**

## Cost Optimization

### Free Tier Limits (as of 2024)

- **Pages**: Unlimited static requests
- **Functions**: 100,000 requests/day
- **KV**: 100,000 reads/day, 1,000 writes/day
- **D1**: 100,000 rows read/day, 50 MB storage
- **Bandwidth**: Unlimited

### Tips for Staying Free

1. **Cache aggressively**: Use KV for API responses
2. **Optimize Functions**: Reduce cold starts
3. **CDN everything**: Static assets are free
4. **Use D1**: Cheaper than external PostgreSQL

## Troubleshooting

### Functions Not Working

Check `wrangler.toml` bindings match environment variables:
```bash
wrangler pages deployment list
wrangler pages deployment tail
```

### Build Failures

Verify build locally:
```bash
npm run build
ls -la dist/
```

### CORS Issues

Update `_headers` file for proper CORS configuration.

### Authentication Errors

Verify Clerk keys are set correctly:
- Frontend uses `VITE_CLERK_PUBLISHABLE_KEY`
- Functions use `CLERK_SECRET_KEY`

## Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Pages Functions Guide](https://developers.cloudflare.com/pages/functions/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Cloudflare Vectorize](https://developers.cloudflare.com/vectorize/)

## Support

For Cloudflare-specific issues:
- [Cloudflare Community](https://community.cloudflare.com/)
- [Discord](https://discord.gg/cloudflaredev)

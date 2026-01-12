# Breakup-AI Development Setup Guide

## Prerequisites

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- Clerk Account (for authentication)
- OpenAI API Key
- Pinecone Account (for vector database)

## Quick Start

### 1. Clone and Setup

```bash
cd BreakUpAI
cp .env.example .env
cp backend/.env.example backend/.env
cp rag-service/.env.example rag-service/.env
```

### 2. Configure Clerk Authentication

1. Go to https://dashboard.clerk.com
2. Create a new application
3. Copy your Publishable Key and Secret Key
4. Update `.env` files with your Clerk keys

### 3. Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
npm install
cd ..
```

#### RAG Service
```bash
cd rag-service
pip install -r requirements.txt
cd ..
```

### 4. Start Development Servers

#### Option A: Using Docker Compose (Recommended)
```bash
docker-compose up
```

#### Option B: Manual Start

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
npm run dev
```

Terminal 3 - RAG Service:
```bash
cd rag-service
python main.py
```

Terminal 4 - Databases (if not using Docker):
```bash
# Start PostgreSQL and Neo4j manually or via Docker
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=your_password postgres:16-alpine
docker run -d -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/your_password neo4j:5.16
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- RAG Service: http://localhost:8001
- Neo4j Browser: http://localhost:7474

## Environment Variables

### Clerk Setup

1. **Frontend** (.env):
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   ```

2. **Backend** (backend/.env):
   ```
   CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

### Database Setup

Configure PostgreSQL and Neo4j credentials in `.env` files.

### AI Services

1. **OpenAI** - Get key from https://platform.openai.com/api-keys
2. **Pinecone** - Get key from https://app.pinecone.io
3. **Anthropic** (optional) - Get key from https://console.anthropic.com

## Project Structure

```
BreakUpAI/
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities
│   └── main.tsx           # Entry point
├── backend/               # Node.js API
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── utils/         # Utilities
│   └── package.json
├── rag-service/           # Python RAG service
│   ├── main.py           # FastAPI app
│   ├── rag_agent.py      # RAG implementation
│   └── requirements.txt
├── public/                # Static assets
├── config/                # Configuration files
└── docker-compose.yml     # Docker setup
```

## Development Workflow

1. **Frontend Development**: Changes auto-reload via Vite HMR
2. **Backend Development**: Uses `tsx watch` for auto-reload
3. **RAG Service**: Uses `uvicorn --reload` for auto-reload

## Testing Authentication

1. Go to http://localhost:3000
2. Click "Get Started" or "Sign In"
3. Create a test account via Clerk
4. You should be redirected to the dashboard

## Next Steps

1. Configure your Clerk application settings
2. Set up OpenAI and Pinecone accounts
3. Configure database connections
4. Start building features!

## Troubleshooting

### Clerk Authentication Issues
- Verify your publishable and secret keys are correct
- Check that CORS settings allow your frontend URL
- Ensure Clerk application is active

### Database Connection Issues
- Verify PostgreSQL and Neo4j are running
- Check connection strings in .env files
- Ensure ports are not in use

### API Connection Issues
- Verify all services are running
- Check proxy configuration in vite.config.ts
- Ensure backend RAG_SERVICE_URL is correct

## Support

For issues, check:
- Clerk Documentation: https://clerk.com/docs
- FastAPI Documentation: https://fastapi.tiangolo.com
- React Documentation: https://react.dev

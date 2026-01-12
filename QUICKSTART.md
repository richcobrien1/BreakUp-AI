# Breakup-AI Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Run Setup Script

**Windows:**
```bash
setup.bat
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### 2. Configure Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your keys and update `.env`:
   ```bash
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key
   CLERK_SECRET_KEY=sk_test_your_secret
   ```

### 3. Start the Application

**Using Docker (Recommended):**
```bash
docker-compose up
```

**Manual Start:**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend && npm run dev

# Terminal 3 - RAG Service
cd rag-service && python main.py
```

### 4. Access the App

Open your browser to: **http://localhost:3000**

---

## 🎯 What You Get

- ✅ Full-stack application ready to run
- ✅ Clerk authentication configured
- ✅ React + TypeScript frontend
- ✅ Node.js Express backend
- ✅ Python FastAPI RAG service
- ✅ PostgreSQL + Neo4j databases
- ✅ Docker Compose orchestration

---

## 📚 Next Steps

1. **Customize Landing Page** - Edit `src/pages/LandingPage.tsx`
2. **Configure AI Services** - Add OpenAI and Pinecone keys to `.env`
3. **Implement RAG Features** - Connect actual legal database
4. **Deploy** - See deployment guide in README.md

---

## ❓ Need Help?

- **Setup Issues:** See [SETUP.md](./SETUP.md)
- **Clerk Docs:** https://clerk.com/docs
- **API Reference:** http://localhost:8000/api (when running)

---

## 🔑 Required API Keys

| Service | Where to Get | Required? |
|---------|-------------|-----------|
| Clerk | https://dashboard.clerk.com | ✅ Yes |
| OpenAI | https://platform.openai.com | ✅ Yes |
| Pinecone | https://app.pinecone.io | ✅ Yes |
| Anthropic | https://console.anthropic.com | ⚪ Optional |

# Breakup-AI: The Civil Rights Gap in Modern Partnerships

## Overview

Breakup-AI exists to expose and correct a systemic failure:

**Most spouses are never educated about their legal and financial rights within a partnership — until it's too late.**

Across the United States, millions of non-breadwinning partners invest years of unpaid labor, childcare, homemaking, emotional support, and career sacrifice into a relationship. Yet when that partnership dissolves, they often walk away with a fraction of the value they created, or nothing at all.

**This is not a personal problem.**  
**This is a structural, legal, and economic inequity.**

Breakup-AI is designed to close that gap.

---

## The Core Problem

### 1. No Education on Civil Rights

Spouses are rarely taught:
- What counts as marital property
- How assets are divided
- How unpaid labor is valued
- What documentation matters
- How state laws differ
- What protections exist for non-earners

This lack of education creates a predictable outcome:  
**The partner with less financial power is the partner with the least information.**

### 2. Economic Dependency Without Protection

Non-breadwinning spouses often:
- Lose earning potential
- Pause or abandon careers
- Take on childcare and domestic labor
- Support the breadwinner's advancement
- Maintain the household infrastructure

**These contributions have real economic value, but the system rarely teaches people how to claim it.**

### 3. Legal Complexity as a Barrier

The legal system is:
- Expensive
- Intimidating
- Inconsistent across states
- Difficult to navigate without representation

Breadwinners often enter separation with:
- Financial literacy
- Access to accounts
- Legal counsel
- Confidence in the process

Non-breadwinners enter with:
- Fear
- Confusion
- No roadmap
- No education
- No leverage

**This imbalance is not accidental — it is the predictable result of a system that never teaches spouses their rights.**

---

## What Breakup-AI Does

Breakup-AI is a **forensic rights-education and asset-protection platform** built for the spouse who was never given the information they needed.

### Breakup-AI provides:
- Legal rights education (state-specific)
- Asset identification and valuation
- Unpaid labor and time-investment analysis
- Damages estimation
- Evidence and documentation checklists
- Risk assessment and protection strategies
- Negotiation preparation

**This is not therapy.**  
**This is economic survival.**

---

## Who This Platform Protects

Breakup-AI is built for:
- Stay-at-home parents
- Partners who supported a career
- Spouses who sacrificed earning potential
- Individuals in long-term cohabitation
- Anyone financially vulnerable in a separation

It is **gender-neutral**, **income-neutral**, and **relationship-structure-neutral**.

If you invested time, labor, or opportunity into a partnership, Breakup-AI helps you understand what that investment is worth.

---

## Why This Matters

**A relationship is not just emotional — it is an economic unit.**

When it ends, the consequences are legal, financial, and life-altering.

Breakup-AI exists because:
- No one teaches spouses their rights
- The legal system is inaccessible
- The cost of ignorance is catastrophic

**This platform gives people the education they should have received from the start.**

---

## Mission Statement

**Breakup-AI empowers the non-breadwinning spouse with the legal, financial, and strategic knowledge required to protect their future.**

This is not about heartbreak.  
**This is about justice, compensation, and survival.**

---

## 🚀 Getting Started

### Quick Start

```bash
# Run the setup script
./setup.sh  # macOS/Linux
setup.bat   # Windows

# Configure Clerk keys in .env
# Start with Docker
docker-compose up
```

Visit **http://localhost:3000** to see the app!

📖 **[View Quick Start Guide](./QUICKSTART.md)** | 📚 **[Full Setup Instructions](./SETUP.md)**

---

## 🏗️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Tailwind CSS** for modern styling
- **Clerk** for multi-tenant authentication
- **TanStack Query** for data fetching
- **React Router** for navigation

### Backend
- **Node.js + Express** API server
- **TypeScript** for type safety
- **Clerk SDK** for authentication
- **Zod** for runtime validation
- **Winston** for logging

### RAG Service
- **Python 3.11 + FastAPI**
- **OpenAI** for embeddings & LLM
- **Pinecone** for vector storage
- **PostgreSQL** for metadata
- **Neo4j** for knowledge graphs

### Infrastructure
- **Docker Compose** for orchestration
- **PostgreSQL 16** database
- **Neo4j 5.16** graph database
- **Microservices** architecture

---

## 📁 Project Structure

```
BreakUpAI/
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities & API client
│   └── main.tsx           # App entry point
│
├── backend/               # Node.js API server
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Express middleware
│   │   └── utils/         # Utilities
│   └── package.json
│
├── rag-service/           # Python RAG service
│   ├── main.py           # FastAPI application
│   ├── rag_agent.py      # RAG implementation
│   └── requirements.txt
│
├── config/                # RAG system configuration
├── public/                # Static assets & icons
├── docker-compose.yml     # Docker orchestration
└── REQUIREMENTS.md        # Platform requirements
```

---

## 🔐 Authentication

This application uses **Clerk** for multi-tenant authentication:

1. Create account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your keys to `.env` files
4. Users can sign up with:
   - Email/Password
   - Google OAuth
   - GitHub OAuth
   - Other providers

---

## 🛠️ Development

### Running Locally

**With Docker:**
```bash
docker-compose up
```

**Without Docker:**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend  
cd backend && npm run dev

# Terminal 3 - RAG Service
cd rag-service && python main.py

# Terminal 4 - Databases
docker run -d -p 5432:5432 postgres:16-alpine
docker run -d -p 7687:7687 neo4j:5.16
```

### Environment Variables

Copy `.env.example` files and configure:

- **Clerk Keys** - Authentication
- **OpenAI Key** - AI/Embeddings
- **Pinecone Key** - Vector database
- **Database Credentials** - PostgreSQL & Neo4j

See [SETUP.md](./SETUP.md) for detailed instructions.

---

## 📖 Documentation

- **[Quick Start Guide](./QUICKSTART.md)** - Get running in 5 minutes
- **[Setup Instructions](./SETUP.md)** - Detailed setup guide
- **[Requirements](./REQUIREMENTS.md)** - Platform requirements
- **[RAG Architecture](./RAG_ARCHITECTURE.md)** - RAG system design
- **[Project Log](./project.log.md)** - Development history

---

## 🌐 API Endpoints

### Legal Endpoints
- `POST /api/legal/query` - Ask legal questions
- `GET /api/legal/definition/:term` - Get definitions
- `POST /api/legal/compare-states` - Compare states
- `GET /api/legal/procedure/:type` - Get procedures
- `POST /api/legal/evidence` - Evidence requirements

### User Endpoints
- `GET /api/user/profile` - Get user profile
- `GET /api/user/preferences` - Get preferences
- `PUT /api/user/preferences` - Update preferences

---

## 🚢 Deployment

Coming soon: Production deployment guides for:
- AWS (ECS, RDS, Lambda)
- Vercel (Frontend)
- Railway (Backend)
- Docker Swarm
- Kubernetes

---

## 📝 License

Copyright © 2026 Breakup-AI. All rights reserved.

---

## 🤝 Contributing

This is a private project. For inquiries, please contact the development team.

---

**Built with ❤️ to correct a civil rights failure**


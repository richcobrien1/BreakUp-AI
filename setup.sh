#!/bin/bash

# Breakup-AI Setup Script
# Automated setup for development environment

set -e

echo "🚀 Starting Breakup-AI Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

command -v node >/dev/null 2>&1 || { echo -e "${RED}❌ Node.js is required but not installed. Aborting.${NC}" >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo -e "${RED}❌ Python 3 is required but not installed. Aborting.${NC}" >&2; exit 1; }
command -v docker >/dev/null 2>&1 || { echo -e "${RED}❌ Docker is required but not installed. Aborting.${NC}" >&2; exit 1; }

echo -e "${GREEN}✅ All prerequisites found${NC}"
echo ""

# Setup environment files
echo "🔧 Setting up environment files..."

if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ Created root .env${NC}"
else
    echo -e "${YELLOW}⚠️  Root .env already exists${NC}"
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✅ Created backend/.env${NC}"
else
    echo -e "${YELLOW}⚠️  backend/.env already exists${NC}"
fi

if [ ! -f rag-service/.env ]; then
    cp rag-service/.env.example rag-service/.env
    echo -e "${GREEN}✅ Created rag-service/.env${NC}"
else
    echo -e "${YELLOW}⚠️  rag-service/.env already exists${NC}"
fi

echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..
echo -e "${GREEN}✅ Backend dependencies installed${NC}"
echo ""

# Install Python dependencies
echo "📦 Installing RAG service dependencies..."
cd rag-service
python3 -m pip install -r requirements.txt
cd ..
echo -e "${GREEN}✅ RAG service dependencies installed${NC}"
echo ""

# Create necessary directories
echo "📁 Creating required directories..."
mkdir -p logs
mkdir -p backend/logs
echo -e "${GREEN}✅ Directories created${NC}"
echo ""

# Setup complete
echo -e "${GREEN}✨ Setup complete!${NC}"
echo ""
echo "⚠️  IMPORTANT: Configure your environment variables:"
echo "   1. Edit .env files with your Clerk, OpenAI, and database credentials"
echo "   2. Get Clerk keys from: https://dashboard.clerk.com"
echo "   3. Get OpenAI key from: https://platform.openai.com/api-keys"
echo ""
echo "🚀 To start development:"
echo "   Option A (Docker): docker-compose up"
echo "   Option B (Manual):"
echo "     Terminal 1: npm run dev"
echo "     Terminal 2: cd backend && npm run dev"
echo "     Terminal 3: cd rag-service && python main.py"
echo ""
echo "📖 For detailed setup instructions, see SETUP.md"

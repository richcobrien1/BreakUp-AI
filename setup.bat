@echo off
REM Breakup-AI Setup Script for Windows
REM Automated setup for development environment

echo.
echo Starting Breakup-AI Setup...
echo.

REM Check prerequisites
echo Checking prerequisites...

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is required but not installed.
    exit /b 1
)

where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is required but not installed.
    exit /b 1
)

where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker is required but not installed.
    exit /b 1
)

echo All prerequisites found
echo.

REM Setup environment files
echo Setting up environment files...

if not exist .env (
    copy .env.example .env
    echo Created root .env
) else (
    echo Root .env already exists
)

if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Created backend\.env
) else (
    echo backend\.env already exists
)

if not exist rag-service\.env (
    copy rag-service\.env.example rag-service\.env
    echo Created rag-service\.env
) else (
    echo rag-service\.env already exists
)

echo.

REM Install frontend dependencies
echo Installing frontend dependencies...
call npm install
echo Frontend dependencies installed
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
cd ..
echo Backend dependencies installed
echo.

REM Install Python dependencies
echo Installing RAG service dependencies...
cd rag-service
python -m pip install -r requirements.txt
cd ..
echo RAG service dependencies installed
echo.

REM Create necessary directories
echo Creating required directories...
if not exist logs mkdir logs
if not exist backend\logs mkdir backend\logs
echo Directories created
echo.

REM Setup complete
echo.
echo ========================================
echo Setup complete!
echo ========================================
echo.
echo IMPORTANT: Configure your environment variables:
echo    1. Edit .env files with your Clerk, OpenAI, and database credentials
echo    2. Get Clerk keys from: https://dashboard.clerk.com
echo    3. Get OpenAI key from: https://platform.openai.com/api-keys
echo.
echo To start development:
echo    Option A (Docker): docker-compose up
echo    Option B (Manual):
echo      Terminal 1: npm run dev
echo      Terminal 2: cd backend ^&^& npm run dev
echo      Terminal 3: cd rag-service ^&^& python main.py
echo.
echo For detailed setup instructions, see SETUP.md
echo.

pause

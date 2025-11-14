# TheraBee Setup Guide

Complete guide to set up TheraBee for development and production environments.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Common Issues](#common-issues)
- [Production Deployment](#production-deployment)

---

## Prerequisites

### Required Software

- **Node.js** >= 20.x ([Download](https://nodejs.org/))
- **npm** >= 10.x (comes with Node.js)
- **PostgreSQL** >= 14.x ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

### Optional Software

- **Docker** (for containerized PostgreSQL)
- **Postman** (for API testing)
- **VS Code** (recommended IDE)

### Accounts Needed

1. **Google Cloud Platform** - For OAuth authentication
   - Create account at [console.cloud.google.com](https://console.cloud.google.com)
   
2. **Zoom Marketplace** - For video SDK
   - Create account at [marketplace.zoom.us](https://marketplace.zoom.us)
   
3. **Database Hosting** (for production)
   - [Neon](https://neon.tech) (recommended) OR
   - [Supabase](https://supabase.com) OR
   - Self-hosted PostgreSQL

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/therabee.git
cd therabee
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Expected output:
```
added 345 packages, and audited 346 packages in 15s
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

Expected output:
```
added 512 packages, and audited 513 packages in 20s
```

---

## Environment Configuration

### Backend Configuration

Create `backend/.env` file:

```bash
cd backend
cp .env.example .env  # If .env.example exists, or create manually
```

**Minimal `.env` for local development:**

```env
# Database (Required)
DATABASE_URL="postgresql://postgres:password@localhost:5432/therabee?schema=public"

# JWT (Required)
JWT_SECRET="your-secret-key-at-least-32-characters-long"

# Google OAuth (Required for login)
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"

# Zoom SDK (Required for video sessions)
ZOOM_ACCOUNT_ID="YOUR_ZOOM_ACCOUNT_ID"
ZOOM_API_KEY="YOUR_ZOOM_API_KEY"
ZOOM_API_SECRET="YOUR_ZOOM_API_SECRET"
ZOOM_SDK_KEY="YOUR_ZOOM_SDK_KEY"
ZOOM_SDK_SECRET="YOUR_ZOOM_SDK_SECRET"

# Email (Optional - emails currently disabled)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# Server
PORT=5000
NODE_ENV="development"

# CORS
CORS_ORIGINS="http://localhost:5173,http://localhost:3000"
```

### Frontend Configuration

Create `frontend/.env` file:

```bash
cd ../frontend
touch .env
```

**Add to `frontend/.env`:**

```env
# API URL (points to backend)
VITE_API_URL="http://localhost:5000/api/v1"

# Google OAuth (must match backend)
VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"

# App Configuration
VITE_APP_NAME="TheraBee"
VITE_APP_URL="http://localhost:5173"
```

---

## External Service Setup

### 1. Google OAuth Setup

**Step-by-step:**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: "Web application"
   - Name: "TheraBee Local Development"
   
5. Add Authorized JavaScript origins:
   ```
   http://localhost:5173
   http://localhost:3000
   ```

6. Add Authorized redirect URIs:
   ```
   http://localhost:5173
   http://localhost:3000
   ```

7. Copy the **Client ID** and add to both `.env` files

### 2. Zoom SDK Setup

**Step-by-step:**

1. Go to [Zoom Marketplace](https://marketplace.zoom.us)
2. Sign in or create account
3. Click "Develop" > "Build App"

**Create Server-to-Server OAuth App (for API access):**
1. Choose "Server-to-Server OAuth"
2. App name: "TheraBee API"
3. Fill in required information
4. Copy:
   - Account ID → `ZOOM_ACCOUNT_ID`
   - Client ID → `ZOOM_API_KEY`
   - Client Secret → `ZOOM_API_SECRET`

**Create SDK App (for embedded meetings):**
1. Choose "Meeting SDK"
2. App name: "TheraBee Video"
3. SDK Type: "Web"
4. Copy:
   - SDK Key → `ZOOM_SDK_KEY`
   - SDK Secret → `ZOOM_SDK_SECRET`

### 3. Email Setup (Optional)

**For Gmail:**

1. Enable 2-Step Verification on your Google Account
2. Generate App Password:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select app: "Mail"
   - Select device: "Other" (enter "TheraBee")
   - Copy the generated 16-character password
   - Use as `EMAIL_PASSWORD`

**Alternative: Use SendGrid or Mailgun for production**

---

## Database Setup

### Option 1: Local PostgreSQL

**Install PostgreSQL:**

```bash
# macOS (with Homebrew)
brew install postgresql@14
brew services start postgresql@14

# Windows (download installer)
# https://www.postgresql.org/download/windows/

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Create Database:**

```bash
# Access PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE therabee;
CREATE USER therabeeuser WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE therabee TO therabeeuser;
\q
```

**Update DATABASE_URL in `.env`:**
```env
DATABASE_URL="postgresql://therabeeuser:yourpassword@localhost:5432/therabee?schema=public"
```

### Option 2: Docker PostgreSQL

**Create `docker-compose.yml` in project root:**

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14-alpine
    container_name: therabee-db
    environment:
      POSTGRES_USER: therabee
      POSTGRES_PASSWORD: therabee123
      POSTGRES_DB: therabee
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Start database:**

```bash
docker-compose up -d
```

**DATABASE_URL for Docker:**
```env
DATABASE_URL="postgresql://therabee:therabee123@localhost:5432/therabee?schema=public"
```

### Option 3: Cloud Database (Neon)

1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Add to `.env`:
   ```env
   DATABASE_URL="postgresql://user:pass@ep-xxx-xxx.us-east-2.aws.neon.tech/therabee?sslmode=require"
   ```

---

## Database Migrations

### Run Migrations

```bash
cd backend
npx prisma migrate dev
```

Expected output:
```
✔ Generated Prisma Client
✔ Database reset successful
✔ Migrations applied
```

### Generate Prisma Client

```bash
npx prisma generate
```

### View Database

```bash
npx prisma studio
```

Opens browser at `http://localhost:5555` with database UI.

---

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Expected output:
```
✓ Connected to database
✓ Server is running on http://localhost:5000
✓ CORS enabled for origins: http://localhost:5173
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v4.5.14  ready in 245 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Access Application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/v1
- Health Check: http://localhost:5000/api/v1/health

---

## Testing the Setup

### 1. Backend Health Check

```bash
curl http://localhost:5000/api/v1/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-11-14T10:30:00.000Z",
  "environment": "development"
}
```

### 2. Database Connection

```bash
cd backend
npx prisma db pull
```

Should complete without errors.

### 3. Frontend Access

Open browser to http://localhost:5173

You should see the landing page.

### 4. Google OAuth Test

Click "Sign in with Google" - should open Google consent screen.

---

## Common Issues

### Issue: Port 5000 Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find process using port 5000
# macOS/Linux
lsof -i :5000

# Windows
netstat -ano | findstr :5000

# Kill the process or change PORT in .env
PORT=5001
```

### Issue: Database Connection Failed

**Error:**
```
Error: Can't reach database server at `localhost:5432`
```

**Solutions:**

1. Check PostgreSQL is running:
   ```bash
   # macOS/Linux
   sudo systemctl status postgresql
   
   # or with Homebrew
   brew services list
   ```

2. Verify connection string in `.env`

3. Test connection:
   ```bash
   psql -h localhost -U postgres -d therabee
   ```

### Issue: Prisma Migration Fails

**Error:**
```
Error: P3009 - Migration failed to apply
```

**Solution:**
```bash
# Reset database
npx prisma migrate reset

# Apply migrations
npx prisma migrate dev
```

### Issue: Google OAuth Not Working

**Error:**
```
Error: invalid_client
```

**Solutions:**

1. Verify `GOOGLE_CLIENT_ID` matches in both `.env` files
2. Check authorized redirect URIs in Google Console
3. Ensure `http://localhost:5173` is added (not `https`)

### Issue: Zoom SDK Not Loading

**Error:**
```
Failed to initialize Zoom client
```

**Solutions:**

1. Verify all 5 Zoom environment variables are set
2. Check SDK key is for "Web" type, not mobile
3. Clear browser cache and reload

### Issue: CORS Error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

Ensure `CORS_ORIGINS` in backend `.env` includes your frontend URL:
```env
CORS_ORIGINS="http://localhost:5173"
```

---

## Production Deployment

### Environment Preparation

1. **Never use development credentials in production**
2. **Generate strong secrets:**
   ```bash
   # Generate JWT secret
   openssl rand -base64 32
   ```

3. **Update environment variables** with production values

### Deploy Frontend (Vercel)

```bash
cd frontend
npm run build  # Test build locally first

# Deploy to Vercel
npx vercel --prod
```

**Environment Variables in Vercel:**
- `VITE_API_URL`: Your production backend URL
- `VITE_GOOGLE_CLIENT_ID`: Production Google OAuth client

### Deploy Backend (Render/Railway)

1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Database Migration (Production)

```bash
# Set production DATABASE_URL
export DATABASE_URL="your-production-url"

# Run migrations (no reset!)
npx prisma migrate deploy
```

---

## Verification Checklist

Before considering setup complete, verify:

- [ ] Backend server starts without errors
- [ ] Frontend dev server runs
- [ ] Database connection successful
- [ ] Prisma migrations applied
- [ ] Health check endpoint responds
- [ ] Google OAuth login works
- [ ] Can create user account
- [ ] Can view therapists list
- [ ] Can create booking (test)
- [ ] Zoom meeting loads (test)

---

## Next Steps

After successful setup:

1. **Read the documentation:**
   - [README.md](README.md) - Project overview
   - [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

2. **Explore the code:**
   - Start with `backend/src/index.ts`
   - Check `frontend/src/App.tsx`
   - Review Prisma schema: `backend/prisma/schema.prisma`

3. **Test API endpoints:**
   - Import Postman collection: `backend/POSTMAN_QUICK_REFERENCE.json`
   - Follow testing guide: `backend/POSTMAN_TESTING_GUIDE.md`

4. **Join the community:**
   - Open GitHub discussions
   - Report issues
   - Submit pull requests

---

## Getting Help

If you encounter issues:

1. **Check existing issues:** [GitHub Issues](https://github.com/yourusername/therabee/issues)
2. **Search discussions:** [GitHub Discussions](https://github.com/yourusername/therabee/discussions)
3. **Ask for help:** Create new discussion or issue
4. **Email support:** dev@therabee.com

---

## Quick Reference

### Useful Commands

```bash
# Backend
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npx prisma studio    # Open database GUI
npx prisma migrate dev  # Run migrations

# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter

# Database
psql therabee        # Access database CLI
npx prisma db push   # Push schema changes
npx prisma generate  # Generate Prisma Client
```

### Important URLs

- **Local Frontend:** http://localhost:5173
- **Local Backend:** http://localhost:5000
- **Database GUI:** http://localhost:5555 (Prisma Studio)
- **API Health:** http://localhost:5000/api/v1/health

---

**Congratulations! 🎉** Your TheraBee development environment is ready!

For questions or improvements to this guide, please submit an issue or pull request.


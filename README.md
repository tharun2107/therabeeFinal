# 🧠 TheraBee - Online Therapy Booking Platform

<div align="center">

![TheraBee Logo](frontend/public/logo.png)

**A Modern MERN Stack Platform Connecting Therapists with Parents for Children's Therapy Sessions**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Zoom SDK](https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white)](https://marketplace.zoom.us/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [System Workflow](#-system-workflow)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [User Roles](#-user-roles)
- [Key Business Logic](#-key-business-logic)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**TheraBee** is a comprehensive online therapy booking platform designed to bridge the gap between licensed therapists and parents seeking therapy sessions for their children. The platform streamlines the entire therapy workflow—from browsing therapists and booking sessions to conducting video calls and tracking progress through detailed therapy notes.

### 🎯 Problem Statement

Parents often struggle to find qualified therapists, book consistent sessions, and track their child's therapy progress. Traditional booking methods involve phone calls, emails, and manual scheduling conflicts.

### ✨ Solution

TheraBee provides an all-in-one platform that:
- Simplifies therapist discovery and booking
- Automates scheduling with conflict prevention
- Enables seamless video therapy sessions via Zoom SDK
- Facilitates progress tracking with therapy notes and tasks
- Ensures data privacy with consent management

---

## 🚀 Features

### 👨‍👩‍👧 For Parents
- **🔍 Browse Therapists**: Search and filter therapists by specialization, experience, and pricing
- **📅 Smart Booking System**: 
  - Book single sessions or monthly recurring sessions (Mon-Fri only)
  - Automated weekend blocking (Sat-Sun unavailable)
  - Real-time availability checking
- **👶 Child Management**: Create and manage multiple child profiles
- **📊 Progress Tracking**: View session reports, monthly goals, and therapist notes
- **✅ Task Management**: Complete tasks assigned by therapists with observations
- **🎥 Video Sessions**: Join therapy sessions via integrated Zoom SDK
- **💬 Feedback System**: Rate and review sessions

### 👨‍⚕️ For Therapists
- **📆 Schedule Management**: Configure available time slots and session duration
- **🏖️ Leave Management**: Request leaves (Casual, Sick, Festive, Optional)
- **📝 Therapy Notes**: Create detailed session reports with:
  - Monthly goals for each child
  - Session-specific notes
  - Tasks/homework for parents
- **👥 Client Management**: View upcoming sessions and client information
- **🔐 Consent System**: Access child details only with parent consent
- **📈 Analytics Dashboard**: Track session history and performance

### 🛡️ For Administrators
- **✅ Therapist Verification**: Approve/reject therapist registrations
- **📊 Platform Analytics**: Monitor bookings, revenue, and user activity
- **🎯 Demo Management**: Manage demo session bookings
- **👥 User Management**: Oversee all users and their activities
- **📋 Leave Approval**: Review and approve therapist leave requests

### 🔐 Security & Privacy
- **Google OAuth 2.0** authentication
- **JWT-based** session management
- **Role-based access control** (PARENT, THERAPIST, ADMIN)
- **Data consent management** for child information
- **Encrypted** password storage with bcrypt
- **CORS protection** with whitelist origins

---

## 🛠 Tech Stack

### **Frontend**
```
React 18.2          - UI library
TypeScript 5.2      - Type safety
Vite 4.5           - Build tool & dev server
TailwindCSS 3.3    - Utility-first CSS
React Router 6.20  - Client-side routing
React Query 3.39   - Server state management
React Hook Form    - Form validation
Framer Motion      - Animations
Lucide React       - Icon library
Recharts           - Data visualization
Zoom Meeting SDK   - Video conferencing
Axios              - HTTP client
```

### **Backend**
```
Node.js 20+        - Runtime environment
Express 4.18       - Web framework
TypeScript 5.9     - Type safety
Prisma 6.19        - ORM & migrations
PostgreSQL         - Primary database
JWT                - Authentication tokens
Bcrypt             - Password hashing
Zod 4.1            - Schema validation
Nodemailer 7.0     - Email notifications
Google Auth Library - OAuth 2.0
date-fns 4.1       - Date manipulation
```

### **Infrastructure & DevOps**
```
Vercel             - Frontend hosting
Render/Railway     - Backend hosting
Neon/Supabase      - PostgreSQL hosting
Zoom Cloud         - Video SDK & API
Git & GitHub       - Version control
```

---

## 🏗 Architecture

### **System Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Parent     │  │  Therapist   │  │    Admin     │        │
│  │  Dashboard   │  │  Dashboard   │  │  Dashboard   │        │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘        │
│         │                  │                  │                 │
│         └──────────────────┴──────────────────┘                │
│                            │                                    │
│                  ┌─────────▼─────────┐                         │
│                  │   React Router    │                         │
│                  │   Auth Context    │                         │
│                  └─────────┬─────────┘                         │
│                            │                                    │
│                  ┌─────────▼─────────┐                         │
│                  │   Axios Client    │                         │
│                  │  (API Requests)   │                         │
│                  └─────────┬─────────┘                         │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   CORS Layer    │
                    │  (Whitelist)    │
                    └────────┬────────┘
                             │
┌────────────────────────────▼─────────────────────────────────┐
│                      API LAYER (Express)                      │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    Auth     │  │   Booking   │  │    Slots    │         │
│  │  Middleware │  │   Routes    │  │   Routes    │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                 │                 │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐         │
│  │   Parent    │  │  Therapist  │  │    Admin    │         │
│  │   Routes    │  │   Routes    │  │   Routes    │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                 │                 │
│         └────────────────┴─────────────────┘                │
│                          │                                   │
│              ┌───────────▼───────────┐                      │
│              │   Validation Layer    │                      │
│              │      (Zod)            │                      │
│              └───────────┬───────────┘                      │
│                          │                                   │
│              ┌───────────▼───────────┐                      │
│              │   Service Layer       │                      │
│              │  (Business Logic)     │                      │
│              └───────────┬───────────┘                      │
└──────────────────────────┼───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                    DATA ACCESS LAYER                          │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│                  ┌─────────────────┐                         │
│                  │  Prisma Client  │                         │
│                  │   (Type-safe)   │                         │
│                  └────────┬────────┘                         │
│                           │                                   │
│              ┌────────────▼────────────┐                     │
│              │   PostgreSQL Database   │                     │
│              │                         │                     │
│              │  ┌──────────────────┐  │                     │
│              │  │  Users & Roles   │  │                     │
│              │  │  Bookings        │  │                     │
│              │  │  Time Slots      │  │                     │
│              │  │  Therapy Notes   │  │                     │
│              │  │  Notifications   │  │                     │
│              │  └──────────────────┘  │                     │
│              └─────────────────────────┘                     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐      │
│   │   Google    │   │    Zoom     │   │  Nodemailer │      │
│   │   OAuth     │   │  Video SDK  │   │   (Email)   │      │
│   └─────────────┘   └─────────────┘   └─────────────┘      │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### **Component Architecture**

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── BookMonthlySessionModal.tsx
│   │   ├── ZoomMeeting.tsx
│   │   ├── TherapyNotesModal.tsx
│   │   └── ui/             # Shadcn-based components
│   ├── contexts/           # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── pages/              # Page components
│   │   ├── ParentDashboard.tsx
│   │   ├── TherapistDashboard.tsx
│   │   └── AdminDashboard.tsx
│   ├── lib/
│   │   └── api.ts          # Axios API client
│   └── hooks/              # Custom React hooks

backend/
├── src/
│   ├── api/                # Feature modules
│   │   ├── auth/
│   │   ├── booking/
│   │   ├── slots/
│   │   └── therapist/
│   ├── middleware/         # Express middleware
│   │   ├── auth.middleware.ts
│   │   └── validate.middleware.ts
│   ├── services/           # Business logic
│   │   ├── zoom.service.ts
│   │   ├── notification.service.ts
│   │   └── email.service.ts
│   └── utils/              # Utility functions
│       ├── prisma.ts
│       ├── jwt.ts
│       └── password.ts
```

---

## 🔄 System Workflow

### **1. User Registration & Authentication Flow**

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Google
    participant Database

    User->>Frontend: Click "Sign in with Google"
    Frontend->>Google: Redirect to OAuth consent
    Google->>User: Request permissions
    User->>Google: Grant permissions
    Google->>Frontend: Return ID Token
    Frontend->>Backend: POST /api/v1/auth/google {idToken}
    Backend->>Google: Verify ID Token
    Google->>Backend: Token valid, return payload
    Backend->>Database: Find or create user
    Database->>Backend: User record
    Backend->>Backend: Generate JWT
    Backend->>Frontend: {user, token, needsProfileCompletion}
    Frontend->>Frontend: Store token in localStorage
    Frontend->>User: Redirect to dashboard
```

### **2. Monthly Booking Flow**

```mermaid
sequenceDiagram
    participant Parent
    participant Frontend
    participant Backend
    participant Database
    participant Zoom

    Parent->>Frontend: Select therapist & date range
    Frontend->>Backend: GET /api/v1/bookings/therapist/{id}/bookings
    Backend->>Database: Fetch existing bookings
    Database->>Backend: Return bookings
    Backend->>Frontend: Bookings data
    Frontend->>Frontend: Calculate availability
    Frontend->>Parent: Show available time slots
    Parent->>Frontend: Select time slot & confirm
    Frontend->>Backend: POST /api/v1/bookings/recurring
    Backend->>Backend: Validate all dates (no weekends)
    Backend->>Database: Check slot availability
    Database->>Backend: All slots available
    Backend->>Zoom: Create meetings for each session
    Zoom->>Backend: Meeting credentials
    Backend->>Database: Create RecurringBooking + Bookings
    Database->>Backend: Success
    Backend->>Frontend: Booking confirmed
    Frontend->>Parent: Success notification
```

### **3. Video Session Flow**

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant ZoomSDK

    User->>Frontend: Click "Join Session"
    Frontend->>Backend: GET /api/v1/bookings/{id}/signature
    Backend->>Backend: Generate Zoom SDK signature
    Backend->>Frontend: {signature, sdkKey, meetingNumber, password}
    Frontend->>ZoomSDK: Initialize Zoom client
    ZoomSDK->>Frontend: Client initialized
    Frontend->>ZoomSDK: Join meeting with credentials
    ZoomSDK->>User: Display video interface
    User->>User: Conduct therapy session
    User->>Frontend: End session
    Frontend->>Backend: PUT /api/v1/bookings/{id}/complete
    Backend->>Database: Update booking status
    Backend->>Frontend: Session marked complete
```

### **4. Therapy Notes Flow**

```mermaid
sequenceDiagram
    participant Therapist
    participant Frontend
    participant Backend
    participant Database
    participant Parent

    Therapist->>Frontend: Complete session
    Frontend->>Frontend: Show therapy notes form
    Therapist->>Frontend: Enter session details & tasks
    Frontend->>Backend: POST /api/v1/therapy-notes
    Backend->>Database: Create SessionReport + Tasks
    Database->>Backend: Success
    Backend->>Database: Send notification to parent
    Database->>Backend: Notification queued
    Backend->>Frontend: Notes saved
    Frontend->>Therapist: Success message
    Parent->>Frontend: View session reports
    Frontend->>Backend: GET /api/v1/parents/session-reports
    Backend->>Database: Fetch reports & tasks
    Database->>Backend: Reports data
    Backend->>Frontend: Reports with tasks
    Frontend->>Parent: Display reports & tasks
    Parent->>Frontend: Mark tasks complete + observations
    Frontend->>Backend: PUT /api/v1/therapy-notes/tasks/{id}
    Backend->>Database: Update task status
```

---

## 🗄 Database Schema

### **Entity Relationship Diagram**

```
┌────────────┐         ┌─────────────┐         ┌──────────────┐
│    User    │◄───────►│ParentProfile│◄───────►│    Child     │
└─────┬──────┘         └─────────────┘         └──────┬───────┘
      │                                                │
      │                ┌─────────────┐                │
      └───────────────►│ Therapist   │◄───────────────┘
                       │   Profile   │
                       └──────┬──────┘
                              │
                              │
      ┌───────────────────────┼───────────────────────┐
      │                       │                       │
      ▼                       ▼                       ▼
┌──────────┐           ┌──────────┐           ┌─────────────┐
│ TimeSlot │◄─────────►│ Booking  │◄─────────►│ Recurring   │
└──────────┘           └────┬─────┘           │  Booking    │
                            │                 └─────────────┘
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
    ┌─────────┐      ┌────────────┐    ┌──────────┐
    │ Payment │      │  Session   │    │ Consent  │
    └─────────┘      │   Report   │    │ Request  │
                     └─────┬──────┘    └──────────┘
                           │
                           ▼
                     ┌──────────┐
                     │ Session  │
                     │   Task   │
                     └──────────┘
```

### **Core Tables**

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `User` | Base user accounts | id, email, role, timezone |
| `ParentProfile` | Parent-specific data | userId, name, phone, customFee |
| `TherapistProfile` | Therapist details | userId, specialization, baseCostPerSession, availableSlotTimes |
| `Child` | Children profiles | parentId, name, age, condition |
| `TimeSlot` | Available time slots | therapistId, startTime, endTime, isBooked |
| `Booking` | Individual sessions | parentId, childId, therapistId, timeSlotId, status |
| `RecurringBooking` | Monthly booking template | slotTime, recurrencePattern, startDate, endDate |
| `SessionReport` | Therapy notes | bookingId, therapistId, sessionDetails |
| `SessionTask` | Homework for parents | sessionReportId, taskGiven, isDone, observation |
| `TherapistLeave` | Leave requests | therapistId, date, type, status |
| `ConsentRequest` | Data access permissions | bookingId, parentId, therapistId, status |

---

## 🚦 Getting Started

### **Prerequisites**

Ensure you have the following installed:
- **Node.js** >= 20.x
- **npm** >= 10.x or **yarn** >= 1.22.x
- **PostgreSQL** >= 14.x
- **Git**

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/therabee.git
cd therabee
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure Environment Variables**

Create `.env` files in both `backend/` and `frontend/` directories (see [Environment Variables](#-environment-variables) section)

5. **Setup Database**
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

6. **Seed Database (Optional)**
```bash
npm run seed
```

7. **Start Development Servers**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

8. **Access the Application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 🔐 Environment Variables

### **Backend (.env)**

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/therabee"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"

# Zoom Integration
ZOOM_ACCOUNT_ID="your-zoom-account-id"
ZOOM_API_KEY="your-zoom-api-key"
ZOOM_API_SECRET="your-zoom-api-secret"
ZOOM_SDK_KEY="your-zoom-sdk-key"
ZOOM_SDK_SECRET="your-zoom-sdk-secret"

# Email (Nodemailer)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# Server
PORT=5000
NODE_ENV="development"

# CORS Origins
CORS_ORIGINS="http://localhost:5173,http://localhost:3000"
```

### **Frontend (.env)**

```bash
# API Base URL
VITE_API_URL="http://localhost:5000/api/v1"

# Google OAuth
VITE_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"

# App Configuration
VITE_APP_NAME="TheraBee"
VITE_APP_URL="http://localhost:5173"
```

### **Environment Setup Guide**

1. **Database**: Use [Neon](https://neon.tech) or [Supabase](https://supabase.com) for hosted PostgreSQL
2. **Google OAuth**: Get credentials from [Google Cloud Console](https://console.cloud.google.com)
3. **Zoom SDK**: Register at [Zoom Marketplace](https://marketplace.zoom.us)
4. **Email**: Use Gmail with [App Passwords](https://support.google.com/accounts/answer/185833)

---

## 📚 API Documentation

### **Base URL**
```
Development: http://localhost:5000/api/v1
Production: https://your-api-domain.com/api/v1
```

### **Authentication**

All authenticated endpoints require JWT token in header:
```
Authorization: Bearer <your-jwt-token>
```

### **API Endpoints**

#### **🔐 Authentication**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/google` | Google OAuth login | ❌ |
| POST | `/auth/register/parent` | Register parent account | ❌ |
| POST | `/auth/register/therapist` | Register therapist account | ❌ |
| POST | `/auth/change-password` | Change user password | ✅ |

#### **👨‍👩‍👧 Parents**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/parents/children` | Get all children | ✅ Parent |
| POST | `/parents/children` | Add new child | ✅ Parent |
| PUT | `/parents/children/:id` | Update child info | ✅ Parent |
| DELETE | `/parents/children/:id` | Remove child | ✅ Parent |
| GET | `/parents/therapists` | Browse active therapists | ✅ Parent |
| GET | `/parents/bookings` | Get all bookings | ✅ Parent |

#### **👨‍⚕️ Therapists**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/therapists/profile` | Get therapist profile | ✅ Therapist |
| PUT | `/therapists/profile` | Update profile | ✅ Therapist |
| POST | `/therapists/slots` | Create time slots | ✅ Therapist |
| GET | `/therapists/bookings` | Get all bookings | ✅ Therapist |
| POST | `/therapists/leaves` | Request leave | ✅ Therapist |

#### **📅 Bookings**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/bookings/slots/:therapistId/:date` | Get available slots | ✅ |
| POST | `/bookings` | Create single booking | ✅ Parent |
| POST | `/bookings/recurring` | Create monthly booking | ✅ Parent |
| GET | `/bookings/recurring` | Get recurring bookings | ✅ Parent |
| PUT | `/bookings/:id/cancel` | Cancel booking | ✅ |
| PUT | `/bookings/:id/complete` | Mark session complete | ✅ Therapist |
| GET | `/bookings/:id/signature` | Get Zoom signature | ✅ |

#### **📝 Therapy Notes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/therapy-notes` | Create session report | ✅ Therapist |
| GET | `/therapy-notes/booking/:id` | Get session report | ✅ |
| PUT | `/therapy-notes/tasks/:id` | Update task status | ✅ Parent |
| GET | `/therapy-notes/child/:id` | Get all reports for child | ✅ |

#### **🛡️ Admin**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/therapists/pending` | Get pending approvals | ✅ Admin |
| PUT | `/admin/therapists/:id/approve` | Approve therapist | ✅ Admin |
| GET | `/admin/analytics` | Get platform analytics | ✅ Admin |
| GET | `/admin/demo-bookings` | Get demo requests | ✅ Admin |
| PUT | `/admin/leaves/:id/approve` | Approve leave request | ✅ Admin |

### **Sample API Requests**

#### **Create Monthly Booking**
```bash
POST /api/v1/bookings/recurring
Content-Type: application/json
Authorization: Bearer <token>

{
  "childId": "clx123abc",
  "therapistId": "clx456def",
  "slotTime": "10:00",
  "recurrencePattern": "DAILY",
  "startDate": "2024-11-07",
  "endDate": "2024-12-06"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "clx789ghi",
    "totalSessions": 22,
    "message": "Monthly booking created successfully"
  }
}
```

#### **Get Available Slots**
```bash
GET /api/v1/bookings/slots/clx456def/2024-11-15
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "slot1",
      "startTime": "2024-11-15T09:00:00.000Z",
      "endTime": "2024-11-15T10:00:00.000Z",
      "isBooked": false
    },
    {
      "id": "slot2",
      "startTime": "2024-11-15T10:00:00.000Z",
      "endTime": "2024-11-15T11:00:00.000Z",
      "isBooked": true,
      "booking": {
        "child": { "name": "John Doe" }
      }
    }
  ]
}
```

---

## 👥 User Roles

### **Parent** 👨‍👩‍👧
- Primary user who books therapy sessions for their children
- Can browse therapists, book sessions, and track progress
- Completes tasks assigned by therapists

### **Therapist** 👨‍⚕️
- Licensed professional conducting therapy sessions
- Manages availability, conducts sessions, creates therapy notes
- Requires admin approval before activation

### **Admin** 🛡️
- Platform administrator with full access
- Approves therapists, manages demo bookings, views analytics
- Oversees leave requests and platform health

---

## 🔑 Key Business Logic

### **Weekend Blocking** 🚫
```typescript
// Enforced at 3 levels:
// 1. Slot Generation
// 2. Booking Creation
// 3. Frontend Validation

const dayOfWeek = date.getUTCDay();
if (dayOfWeek === 0 || dayOfWeek === 6) {
  throw new Error('Bookings not available on weekends');
}
```

**Rationale**: Therapists work Monday-Friday only. This is a core business rule enforced throughout the system.

### **Monthly Booking Logic** 📅

1. **Date Range Calculation**:
   - Start Date: User-selected (must be weekday)
   - End Date: Start + 1 month - 1 day
   - Example: Nov 7 → Dec 6 (30 days)

2. **Availability Validation**:
   - ALL dates in range must have the selected time slot available
   - If ANY date is already booked, the entire booking fails
   - This ensures complete monthly commitment

3. **Session Generation**:
   - Creates individual `Booking` records for each weekday
   - Links all bookings to parent `RecurringBooking`
   - Skips weekends automatically
   - Skips therapist leave dates

### **Slot Time Storage** ⏰

- **Storage**: UTC timestamps in database
- **Display**: Converted to local time in frontend
- **availableSlotTimes**: Array of "HH:mm" strings (e.g., ["09:00", "14:00"])
- **Session Duration**: Fixed 60 minutes

### **Consent Management** 🔒

- Parents control therapist access to child's detailed information
- Therapists see only basic info (name, age) until consent granted
- Consent tied to specific bookings
- Revokable by parent at any time

### **Leave System** 🏖️

**Leave Types** (per year):
- Casual: 5 days
- Sick: 5 days
- Festive: 5 days
- Optional: 1 day

**Leave Flow**:
1. Therapist requests leave
2. Admin reviews and approves/rejects
3. If approved, all bookings on leave dates auto-cancelled
4. Parents notified of cancellations

---

## 🌐 Deployment

### **Frontend (Vercel)**

1. **Push to GitHub**:
```bash
git push origin main
```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import `frontend` directory
   - Add environment variables
   - Deploy

3. **Build Settings**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

### **Backend (Render/Railway)**

1. **Create New Web Service**:
   - Connect GitHub repository
   - Select `backend` directory
   - Choose Node.js environment

2. **Configure**:
```yaml
buildCommand: npm install && npm run build
startCommand: npm start
envVars:
  - DATABASE_URL
  - JWT_SECRET
  - GOOGLE_CLIENT_ID
  - ZOOM_*
```

3. **Database Migration**:
```bash
npx prisma migrate deploy
```

### **Database (Neon/Supabase)**

1. **Create Database**:
   - Sign up at [Neon](https://neon.tech) or [Supabase](https://supabase.com)
   - Create new project
   - Copy connection string

2. **Update .env**:
```bash
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

3. **Run Migrations**:
```bash
npx prisma migrate deploy
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Code Style**
- Use TypeScript for type safety
- Follow existing code formatting
- Write meaningful commit messages
- Add comments for complex logic

### **Testing**
- Write unit tests for new features
- Ensure all tests pass before PR
- Test edge cases thoroughly

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For questions or issues:
- 📧 Email: support@therabee.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/therabee/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/therabee/discussions)

---

## 🙏 Acknowledgments

- **Zoom SDK** for video conferencing capabilities
- **Google** for OAuth 2.0 authentication
- **Prisma** team for excellent ORM tooling
- **React** and **Node.js** communities
- All contributors and early adopters

---

<div align="center">

**Made with ❤️ by the TheraBee Team**

[Website](https://therabee.com) • [Documentation](https://docs.therabee.com) • [Blog](https://blog.therabee.com)

</div>


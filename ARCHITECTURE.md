# TheraBee Architecture Documentation

## 📑 Table of Contents
- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Database Design](#database-design)
- [Security Architecture](#security-architecture)
- [Integration Architecture](#integration-architecture)
- [Deployment Architecture](#deployment-architecture)
- [Data Flow](#data-flow)
- [Design Decisions](#design-decisions)

---

## Overview

TheraBee is built as a modern three-tier web application following clean architecture principles with clear separation of concerns.

### Architectural Principles

1. **Separation of Concerns**: Clear boundaries between presentation, business logic, and data access
2. **Single Responsibility**: Each module has one reason to change
3. **Dependency Inversion**: High-level modules don't depend on low-level modules
4. **Interface Segregation**: Clients shouldn't depend on interfaces they don't use
5. **DRY (Don't Repeat Yourself)**: Reusable components and utilities
6. **SOLID Principles**: Applied throughout the codebase

---

## System Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Parent   │  │ Therapist  │  │   Admin    │            │
│  │    UI      │  │     UI     │  │     UI     │            │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘            │
│         │                │                │                   │
│         └────────────────┴────────────────┘                  │
│                          │                                    │
│                    React Router                               │
│                          │                                    │
└──────────────────────────┼──────────────────────────────────┘
                           │
                      API Gateway
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                   APPLICATION LAYER                          │
│                          │                                    │
│     ┌────────────────────┴────────────────────┐             │
│     │                                          │             │
│  ┌──▼──────┐  ┌──────────┐  ┌──────────┐     │             │
│  │  Auth   │  │ Booking  │  │  Slots   │     │             │
│  │ Service │  │ Service  │  │ Service  │  ...│             │
│  └──┬──────┘  └────┬─────┘  └────┬─────┘     │             │
│     │              │               │           │             │
│     └──────────────┴───────────────┴───────────┘            │
│                    │                                         │
└────────────────────┼─────────────────────────────────────────┘
                     │
┌────────────────────┼─────────────────────────────────────────┐
│                DATA ACCESS LAYER                             │
│              ┌─────▼──────┐                                  │
│              │   Prisma   │                                  │
│              │   Client   │                                  │
│              └─────┬──────┘                                  │
│                    │                                         │
│              ┌─────▼──────┐                                  │
│              │ PostgreSQL │                                  │
│              └────────────┘                                  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                          │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐    │
│  │ Google  │   │  Zoom   │   │  Email  │   │  CDN    │    │
│  │  OAuth  │   │   SDK   │   │  SMTP   │   │ Assets  │    │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Technology Stack Layers

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Presentation** | React + TypeScript | User interface and interactions |
| **State Management** | React Query + Context | Client-side state and caching |
| **Routing** | React Router | Navigation and URL management |
| **API Client** | Axios | HTTP communication |
| **Application** | Express + TypeScript | Business logic and API endpoints |
| **Validation** | Zod | Schema validation |
| **Authentication** | JWT + OAuth 2.0 | User authentication |
| **Data Access** | Prisma ORM | Database operations |
| **Database** | PostgreSQL | Data persistence |
| **External APIs** | Zoom, Google | Third-party integrations |

---

## Frontend Architecture

### Component Hierarchy

```
App
├── AuthProvider (Context)
│   └── ThemeProvider (Context)
│       └── Router
│           ├── PublicRoutes
│           │   ├── LandingPage
│           │   └── Login
│           │
│           ├── ParentRoutes (Protected)
│           │   ├── ParentDashboard
│           │   ├── ChildrenManagement
│           │   ├── FindTherapists
│           │   ├── BookingManagement
│           │   └── SessionReports
│           │
│           ├── TherapistRoutes (Protected)
│           │   ├── TherapistDashboard
│           │   ├── Schedule
│           │   ├── Bookings
│           │   ├── TherapyNotes
│           │   └── LeaveManagement
│           │
│           └── AdminRoutes (Protected)
│               ├── AdminDashboard
│               ├── TherapistApproval
│               ├── Analytics
│               └── DemoManagement
```

### State Management Strategy

```typescript
// 1. Server State (React Query)
const { data: bookings } = useQuery('bookings', fetchBookings);

// 2. Global State (Context)
const { user, logout } = useAuth();
const { theme, setTheme } = useTheme();

// 3. Local State (useState)
const [isModalOpen, setIsModalOpen] = useState(false);

// 4. Form State (React Hook Form)
const { register, handleSubmit } = useForm();
```

### Directory Structure

```
frontend/src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn)
│   ├── BookingModal.tsx
│   ├── ZoomMeeting.tsx
│   └── ...
├── contexts/            # React Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   └── useDebounce.ts
├── lib/                 # Utilities and helpers
│   ├── api.ts          # API client configuration
│   └── utils.ts        # Helper functions
├── pages/              # Page components
│   ├── ParentDashboard.tsx
│   ├── TherapistDashboard.tsx
│   └── ...
├── types.d.ts          # TypeScript type definitions
└── main.tsx           # Application entry point
```

---

## Backend Architecture

### Layered Architecture

```
┌─────────────────────────────────────────┐
│         ROUTES LAYER                     │
│  Define HTTP endpoints and middleware    │
│  auth.routes.ts, booking.routes.ts      │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      CONTROLLER LAYER                    │
│  Handle HTTP requests/responses          │
│  auth.controller.ts, booking.controller │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      VALIDATION LAYER                    │
│  Validate incoming data with Zod         │
│  auth.validation.ts, booking.validation │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│       SERVICE LAYER                      │
│  Business logic and operations           │
│  auth.service.ts, booking.service.ts    │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      DATA ACCESS LAYER                   │
│  Database operations via Prisma          │
│  prisma.ts, models                       │
└─────────────────────────────────────────┘
```

### Module Structure

Each feature follows a consistent structure:

```
api/
└── booking/
    ├── booking.routes.ts      # Express routes
    ├── booking.controller.ts  # Request handlers
    ├── booking.service.ts     # Business logic
    └── booking.validation.ts  # Zod schemas
```

### Middleware Pipeline

```
Request
  │
  ▼
┌─────────────────┐
│  CORS Check     │
└────────┬────────┘
         │
  ▼
┌─────────────────┐
│  Body Parser    │
└────────┬────────┘
         │
  ▼
┌─────────────────┐
│  Auth Verify    │ (if protected route)
└────────┬────────┘
         │
  ▼
┌─────────────────┐
│  Validation     │
└────────┬────────┘
         │
  ▼
┌─────────────────┐
│  Controller     │
└────────┬────────┘
         │
  ▼
┌─────────────────┐
│  Service        │
└────────┬────────┘
         │
  ▼
┌─────────────────┐
│  Database       │
└────────┬────────┘
         │
  ▼
Response
```

### Directory Structure

```
backend/src/
├── api/                 # Feature modules
│   ├── auth/
│   ├── booking/
│   ├── slots/
│   └── ...
├── middleware/          # Express middleware
│   ├── auth.middleware.ts
│   └── validate.middleware.ts
├── services/           # Shared services
│   ├── zoom.service.ts
│   ├── email.service.ts
│   └── notification.service.ts
├── utils/              # Utilities
│   ├── prisma.ts
│   ├── jwt.ts
│   └── password.ts
└── index.ts           # Server entry point
```

---

## Database Design

### Entity-Relationship Overview

```
User (Base)
  ├── ParentProfile
  │     ├── Children
  │     ├── Bookings
  │     └── ConsentRequests
  │
  ├── TherapistProfile
  │     ├── TimeSlots
  │     ├── Bookings
  │     ├── Leaves
  │     └── SessionReports
  │
  └── AdminProfile
        └── AuditLogs

Booking (Core)
  ├── TimeSlot
  ├── Payment
  ├── SessionReport
  │     └── SessionTasks
  ├── SessionFeedback
  ├── ConsentRequest
  └── RecurringBooking (optional)
```

### Data Normalization

The database follows **Third Normal Form (3NF)**:

1. **1NF**: All tables have atomic values
2. **2NF**: No partial dependencies on composite keys
3. **3NF**: No transitive dependencies

### Indexes

Performance-critical indexes:

```sql
-- Booking lookups
CREATE INDEX idx_booking_parent ON Booking(parentId);
CREATE INDEX idx_booking_therapist ON Booking(therapistId);
CREATE INDEX idx_booking_timeslot ON Booking(timeSlotId);

-- Time slot queries
CREATE INDEX idx_timeslot_therapist_date ON TimeSlot(therapistId, startTime);

-- User lookups
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_user_role ON User(role);

-- Leave queries
CREATE INDEX idx_leave_therapist_date ON TherapistLeave(therapistId, date);
```

### Constraints

- **Unique Constraints**: Email, phone numbers, child names per parent
- **Foreign Keys**: All relationships enforced
- **Check Constraints**: Enums for status fields
- **Not Null**: Critical fields required

---

## Security Architecture

### Authentication Flow

```
┌────────┐                          ┌────────┐
│ Client │                          │ Google │
└───┬────┘                          └───┬────┘
    │                                   │
    │ 1. Initiate OAuth                 │
    ├──────────────────────────────────>│
    │                                   │
    │ 2. Redirect to consent            │
    │<──────────────────────────────────┤
    │                                   │
    │ 3. User grants permission         │
    ├──────────────────────────────────>│
    │                                   │
    │ 4. Return ID token                │
    │<──────────────────────────────────┤
    │                                   │
┌───┴────┐                          ┌───┴────┐
│ Client │                          │ Server │
└───┬────┘                          └───┬────┘
    │                                   │
    │ 5. POST /auth/google {idToken}    │
    ├──────────────────────────────────>│
    │                                   │
    │                               6. Verify
    │                               with Google
    │                                   │
    │                               7. Find/Create
    │                               User
    │                                   │
    │                               8. Generate JWT
    │                                   │
    │ 9. Return {user, token}           │
    │<──────────────────────────────────┤
    │                                   │
    │ 10. Store token in localStorage   │
    │                                   │
```

### Authorization Model

**Role-Based Access Control (RBAC)**:

```typescript
enum Role {
  PARENT    // Can book sessions, manage children
  THERAPIST // Can manage schedule, create notes
  ADMIN     // Full platform access
}

// Middleware example
function requireRole(...roles: Role[]) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Usage
router.get('/admin/analytics', 
  authenticate, 
  requireRole(Role.ADMIN), 
  getAnalytics
);
```

### Data Protection

1. **In Transit**: TLS 1.3 encryption
2. **At Rest**: PostgreSQL encryption
3. **Passwords**: Bcrypt with 10 rounds
4. **Tokens**: JWT with 7-day expiration
5. **Sensitive Data**: Environment variables only

---

## Integration Architecture

### Zoom SDK Integration

```
┌──────────┐                    ┌──────────┐
│  Client  │                    │  Server  │
└────┬─────┘                    └────┬─────┘
     │                               │
     │ 1. Request to join session    │
     ├──────────────────────────────>│
     │                               │
     │                           2. Generate
     │                           SDK signature
     │                               │
     │                           3. Fetch meeting
     │                           details from DB
     │                               │
     │ 4. Return signature + details │
     │<──────────────────────────────┤
     │                               │
     │ 5. Initialize Zoom SDK        │
     │                               │
┌────▼─────┐                    ┌────┴─────┐
│   Zoom   │                    │   Zoom   │
│ Web SDK  │<───────────────────│   API    │
└────┬─────┘  6. Join meeting   └──────────┘
     │
     │ 7. Display video interface
     │
```

### Email Service Integration

```typescript
// Notification Queue Pattern
interface NotificationQueue {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  channel: 'EMAIL' | 'PUSH';
  sendAt: Date;
  status: 'PENDING' | 'SENT' | 'FAILED';
}

// Processing
async function processNotifications() {
  const pending = await findPendingNotifications();
  
  for (const notification of pending) {
    try {
      await sendEmail(notification);
      await markAsSent(notification.id);
    } catch (error) {
      await markAsFailed(notification.id, error);
    }
  }
}
```

---

## Deployment Architecture

### Production Environment

```
┌─────────────────────────────────────────────────────────────┐
│                        CLOUDFLARE CDN                        │
│                    (Static Assets, Cache)                    │
└────────────────┬────────────────────────────────────────────┘
                 │
     ┌───────────┴───────────┐
     │                       │
┌────▼─────┐          ┌─────▼─────┐
│  Vercel  │          │  Render/  │
│          │          │  Railway  │
│ Frontend │          │  Backend  │
│  (React) │          │  (Node.js)│
└──────────┘          └─────┬─────┘
                            │
                      ┌─────▼─────┐
                      │   Neon/   │
                      │ Supabase  │
                      │ PostgreSQL│
                      └───────────┘
```

### Environment Configuration

```bash
# Development
Frontend: http://localhost:5173
Backend: http://localhost:5000
Database: localhost:5432

# Staging
Frontend: https://staging.therabee.com
Backend: https://api-staging.therabee.com
Database: staging-db.neon.tech

# Production
Frontend: https://therabee.com
Backend: https://api.therabee.com
Database: prod-db.neon.tech
```

---

## Data Flow

### Monthly Booking Creation Flow

```
1. User Input
   ├─> Select therapist, child, date range, time slot
   │
2. Frontend Validation
   ├─> Check date format
   ├─> Validate weekend exclusion
   ├─> Calculate end date
   │
3. Availability Check
   ├─> Fetch therapist bookings
   ├─> Filter by time slot
   ├─> Check each date in range
   │
4. API Request
   ├─> POST /api/v1/bookings/recurring
   │
5. Backend Validation
   ├─> Verify user authentication
   ├─> Validate request schema (Zod)
   ├─> Check business rules
   │
6. Database Transaction
   ├─> Create RecurringBooking record
   ├─> For each weekday in range:
   │   ├─> Create TimeSlot
   │   ├─> Create Booking
   │   ├─> Create Payment
   │   ├─> Create DataAccessPermission
   │   └─> Create Zoom meeting
   │
7. Success Response
   ├─> Return booking summary
   │
8. Frontend Update
   ├─> Invalidate queries
   ├─> Show success message
   └─> Redirect to bookings page
```

---

## Design Decisions

### Why TypeScript?

**Decision**: Use TypeScript for both frontend and backend

**Rationale**:
- Type safety reduces runtime errors
- Better IDE support and autocomplete
- Self-documenting code
- Easier refactoring

### Why Prisma?

**Decision**: Use Prisma as ORM instead of raw SQL or TypeORM

**Rationale**:
- Type-safe database queries
- Automatic migrations
- Excellent TypeScript integration
- Better developer experience

### Why React Query?

**Decision**: Use React Query for server state management

**Rationale**:
- Automatic caching and invalidation
- Loading and error states handled
- Reduces boilerplate
- Better than Redux for server data

### Why JWT in localStorage?

**Decision**: Store JWT tokens in localStorage (with noted security trade-off)

**Rationale**:
- Simple implementation
- Works across tabs
- No CORS complications
- Acceptable for current risk level

**Future Improvement**: Move to httpOnly cookies for enhanced security

### Why Monorepo Structure?

**Decision**: Keep frontend and backend in same repository

**Rationale**:
- Easier to keep in sync
- Shared type definitions
- Simpler deployment pipeline
- Better for small teams

---

## Performance Considerations

### Database Optimization

- **Indexes**: On all foreign keys and frequently queried fields
- **Connection Pooling**: Prisma manages connection pool
- **Query Optimization**: Use `select` to fetch only needed fields
- **Pagination**: Limit result sets with skip/take

### Frontend Optimization

- **Code Splitting**: Lazy loading with React.lazy()
- **Image Optimization**: Compression and lazy loading
- **Bundle Size**: Tree shaking with Vite
- **Caching**: React Query caches responses

### API Optimization

- **Response Compression**: Gzip enabled
- **Rate Limiting**: Prevent abuse
- **Caching**: API-level caching for static data

---

## Scalability Considerations

### Current Scale

- **Users**: 100-1000 concurrent
- **Database**: <10GB data
- **API**: <100 requests/second

### Future Scale

#### Horizontal Scaling
- Add more backend instances
- Load balancer distribution
- Stateless API design enables easy scaling

#### Database Scaling
- Read replicas for queries
- Write to primary, read from replicas
- Partition by date for time-series data (bookings)

#### Caching Layer
- Redis for session storage
- Cache frequent queries
- Reduce database load

---

## Monitoring & Observability

### Logging Strategy

```typescript
// Structured logging
log.info('Booking created', {
  bookingId,
  parentId,
  therapistId,
  timestamp: new Date()
});

log.error('Booking failed', {
  error: error.message,
  stack: error.stack,
  userId
});
```

### Metrics to Track

- **Application**: Response times, error rates, throughput
- **Database**: Query performance, connection pool usage
- **Business**: Bookings per day, conversion rates, user growth

---

## Conclusion

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Type safety throughout the stack
- ✅ Scalable design patterns
- ✅ Security best practices
- ✅ Maintainable codebase

For questions or suggestions about the architecture, please open a discussion or contact the development team.


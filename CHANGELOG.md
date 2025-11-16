# Changelog

All notable changes to TheraBee will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with MERN stack
- Google OAuth 2.0 authentication
- Zoom SDK integration for video sessions

### Changed

### Deprecated

### Removed

### Fixed

### Security

---

## [1.0.0] - 2024-11-14

### Added

#### Core Features
- **User Management**
  - Three user roles: Parent, Therapist, Admin
  - Google OAuth 2.0 authentication
  - JWT-based session management
  - Profile management for all user types

#### Booking System
- **Single Session Booking**
  - Browse active therapists
  - View available time slots
  - Book individual therapy sessions
  - Real-time slot availability checking
  
- **Monthly Recurring Booking**
  - Book entire month of sessions at once
  - Automatic weekday-only scheduling (Mon-Fri)
  - Weekend blocking enforced at all levels
  - Conflict prevention for overlapping bookings
  - Bulk session creation for complete month

#### Therapist Features
- **Schedule Management**
  - Configure available time slots
  - Set session duration (default 60 minutes)
  - Manage working hours and breaks
  
- **Leave Management**
  - Request leaves with 4 types: Casual, Sick, Festive, Optional
  - Leave approval workflow for admins
  - Automatic booking cancellation on approved leaves
  
- **Therapy Notes System**
  - Create monthly goals for each child
  - Add session-specific notes after each session
  - Assign tasks/homework to parents
  - Track task completion and parent observations

#### Parent Features
- **Child Management**
  - Add multiple child profiles
  - Store child information (age, condition, notes)
  - Manage child details and history
  
- **Booking Management**
  - View all bookings (past and upcoming)
  - Book single or monthly sessions
  - Track session history
  - View session reports and therapy notes
  
- **Task Management**
  - View tasks assigned by therapists
  - Mark tasks as complete/incomplete
  - Add observations for each task
  - Track progress over time

#### Admin Features
- **Therapist Verification**
  - Review therapist registrations
  - Approve/reject therapist accounts
  - Manage therapist status (Active, Suspended, Inactive)
  
- **Platform Analytics**
  - Monitor total bookings and revenue
  - Track user registrations
  - View platform activity metrics
  
- **Demo Management**
  - Manage demo session requests
  - Schedule demo bookings
  - Track demo conversion rates
  
- **Leave Approval**
  - Review therapist leave requests
  - Approve/reject leave applications
  - Track leave balances

#### Video Integration
- **Zoom SDK Integration**
  - Embedded Zoom meetings in platform
  - Automatic meeting creation on booking
  - Secure signature-based authentication
  - Waiting room and security features enabled
  - Join meetings without leaving platform

#### Security & Privacy
- **Data Protection**
  - Bcrypt password hashing
  - JWT token authentication
  - CORS protection with whitelist
  - Role-based access control (RBAC)
  
- **Consent Management**
  - Parents control therapist access to child data
  - Consent requests for data sharing
  - Privacy-first design

#### Notifications
- Email notification system (currently disabled)
- In-app notification queue
- Notification types for all major events:
  - Booking confirmations
  - Session reminders
  - Leave approvals
  - Report availability

### Technical Stack

#### Frontend
- React 18.2 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Query for state management
- React Router for navigation
- Framer Motion for animations
- Zoom Meeting SDK for video

#### Backend
- Node.js with Express
- TypeScript for type safety
- Prisma ORM with PostgreSQL
- JWT authentication
- Zod for validation
- Nodemailer for emails
- Google Auth Library for OAuth

#### Database
- PostgreSQL with Prisma
- 20+ tables with full relationships
- Migrations for version control
- Indexes for query optimization

#### Infrastructure
- Vercel-ready frontend
- Render/Railway-ready backend
- Neon/Supabase PostgreSQL hosting
- Environment-based configuration

### Business Logic

#### Weekend Blocking
- Saturdays and Sundays completely blocked
- Enforced at database, API, and UI levels
- Automatic validation on all booking operations

#### Working Days Calculation
- Counts only weekdays (Mon-Fri) in date ranges
- Used for monthly booking calculations
- Excludes therapist leaves automatically

#### Slot Generation
- On-demand slot creation for requested dates
- UTC storage with local display
- Cleanup of outdated available slots
- Validation against therapist configuration

#### Recurring Booking Logic
- Start date + 1 month - 1 day = End date
- Example: Nov 7 → Dec 6 (30 days, ~22 weekday sessions)
- All slots must be available before confirmation
- Individual booking records linked to recurring template
- Automatic Zoom meeting creation for each session

### Documentation
- Comprehensive README with architecture diagrams
- API documentation with examples
- Database schema documentation
- Postman collection for testing
- Setup guides for development and production

---

## Version History

### Version Numbering

We use [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality (backwards compatible)
- **PATCH** version for backwards compatible bug fixes

### Release Schedule

- **Major releases**: Quarterly
- **Minor releases**: Monthly
- **Patch releases**: As needed for critical bugs

---

## Migration Guides

### From 0.x to 1.0

This is the initial production release. No migration needed.

---

## Support

For questions about releases or upgrades:
- 📧 Email: support@therabee.com
- 📚 Docs: https://docs.therabee.com
- 💬 Discussions: https://github.com/yourusername/therabee/discussions

---

[Unreleased]: https://github.com/yourusername/therabee/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/yourusername/therabee/releases/tag/v1.0.0


# 📚 TheraBee Documentation Index

Complete guide to all documentation for the TheraBee platform.

## 🚀 Getting Started

Start here if you're new to TheraBee:

1. **[README.md](README.md)** - Project overview, features, and quick start
2. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions for development
3. **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design decisions

## 📖 Core Documentation

### Project Information

| Document | Purpose | Audience |
|----------|---------|----------|
| [README.md](README.md) | Main project documentation with features, tech stack, and API overview | Everyone |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Detailed system architecture, data flows, and design decisions | Developers, Architects |
| [CHANGELOG.md](CHANGELOG.md) | Version history and release notes | Everyone |
| [LICENSE](LICENSE) | MIT License terms | Everyone |

### Setup & Configuration

| Document | Purpose | Audience |
|----------|---------|----------|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Complete setup instructions for local development | New Developers |
| `backend/.env.example` | Backend environment variable template | Backend Developers |
| `frontend/.env.example` | Frontend environment variable template | Frontend Developers |

### Development Guidelines

| Document | Purpose | Audience |
|----------|---------|----------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute, code style, commit conventions | Contributors |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Community guidelines and expectations | Everyone |
| [SECURITY.md](SECURITY.md) | Security policies and vulnerability reporting | Security Researchers |

### Backend Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| Database Setup | [backend/DATABASE_SETUP.md](backend/DATABASE_SETUP.md) | Database initialization and schema |
| Postman Guide | [backend/POSTMAN_TESTING_GUIDE.md](backend/POSTMAN_TESTING_GUIDE.md) | API testing with Postman |
| Postman Collection | [backend/POSTMAN_QUICK_REFERENCE.json](backend/POSTMAN_QUICK_REFERENCE.json) | Importable API collection |
| Testing Guide | [backend/TESTING_GUIDE.md](backend/TESTING_GUIDE.md) | Backend testing instructions |
| Prisma Schema | [backend/prisma/schema.prisma](backend/prisma/schema.prisma) | Complete database schema |

### Feature Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| Monthly Booking | [MONTHLY_BOOKING_ISSUE_FIX.md](MONTHLY_BOOKING_ISSUE_FIX.md) | Monthly booking implementation details |
| Therapy Notes | [THERAPY_NOTES_IMPLEMENTATION.md](THERAPY_NOTES_IMPLEMENTATION.md) | Therapy notes system documentation |
| Video Calls | [VIDEO_CALL_UX_IMPROVEMENTS.md](VIDEO_CALL_UX_IMPROVEMENTS.md) | Video call feature improvements |
| Google Sign-in | [GOOGLE_SIGNIN_ERRORS_FIX.md](GOOGLE_SIGNIN_ERRORS_FIX.md) | OAuth troubleshooting guide |

### GitHub Templates

| Template | Location | Purpose |
|----------|----------|---------|
| Pull Request Template | [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md) | Standardized PR submissions |
| Bug Report Template | [.github/ISSUE_TEMPLATE/bug_report.md](.github/ISSUE_TEMPLATE/bug_report.md) | Bug reporting format |
| Feature Request Template | [.github/ISSUE_TEMPLATE/feature_request.md](.github/ISSUE_TEMPLATE/feature_request.md) | Feature proposal format |

---

## 📋 Documentation by Role

### For New Developers

**Start here in this order:**

1. ✅ Read [README.md](README.md) for project overview
2. ✅ Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) to set up your environment
3. ✅ Review [ARCHITECTURE.md](ARCHITECTURE.md) to understand the system
4. ✅ Read [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
5. ✅ Check [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community standards
6. ✅ Explore the codebase starting with `backend/src/index.ts` and `frontend/src/App.tsx`

**Estimated time:** 2-3 hours

### For Frontend Developers

**Essential reading:**

- [README.md](README.md) - Tech stack and API overview
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Frontend setup section
- [ARCHITECTURE.md](ARCHITECTURE.md) - Frontend architecture section
- `frontend/.env.example` - Environment configuration

**Key directories:**
```
frontend/src/
├── components/     # UI components
├── pages/          # Page components
├── contexts/       # Global state
├── hooks/          # Custom hooks
└── lib/api.ts     # API client
```

### For Backend Developers

**Essential reading:**

- [README.md](README.md) - System overview
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Backend setup and database
- [ARCHITECTURE.md](ARCHITECTURE.md) - Backend architecture section
- [backend/DATABASE_SETUP.md](backend/DATABASE_SETUP.md) - Database details
- [backend/POSTMAN_TESTING_GUIDE.md](backend/POSTMAN_TESTING_GUIDE.md) - API testing

**Key directories:**
```
backend/src/
├── api/           # Feature modules
├── services/      # Business logic
├── middleware/    # Express middleware
└── utils/         # Utilities
```

### For DevOps Engineers

**Essential reading:**

- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Production deployment section
- [ARCHITECTURE.md](ARCHITECTURE.md) - Deployment architecture section
- [SECURITY.md](SECURITY.md) - Security considerations
- `backend/.env.example` and `frontend/.env.example` - Environment requirements

**Focus areas:**
- CI/CD pipeline setup
- Environment configuration
- Database migrations
- Monitoring and logging

### For Product Managers

**Essential reading:**

- [README.md](README.md) - Features and user roles
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [ARCHITECTURE.md](ARCHITECTURE.md) - System capabilities and limitations

**Feature documentation:**
- [MONTHLY_BOOKING_ISSUE_FIX.md](MONTHLY_BOOKING_ISSUE_FIX.md)
- [THERAPY_NOTES_IMPLEMENTATION.md](THERAPY_NOTES_IMPLEMENTATION.md)
- [VIDEO_CALL_UX_IMPROVEMENTS.md](VIDEO_CALL_UX_IMPROVEMENTS.md)

### For Security Researchers

**Essential reading:**

- [SECURITY.md](SECURITY.md) - Security policy and reporting
- [ARCHITECTURE.md](ARCHITECTURE.md) - Security architecture section
- [README.md](README.md) - System overview

**Important notes:**
- **DO NOT** report security issues publicly
- Email: security@therabee.com
- PGP key available upon request

### For Contributors

**Essential reading:**

- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Community standards
- [README.md](README.md) - Project overview

**Before submitting:**
- Check existing issues and PRs
- Follow code style guidelines
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 🎯 Quick Reference by Task

### Setting Up Development Environment

1. [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete guide
2. `backend/.env.example` - Backend config
3. `frontend/.env.example` - Frontend config
4. [backend/DATABASE_SETUP.md](backend/DATABASE_SETUP.md) - Database

### Understanding the System

1. [README.md](README.md) - Overview
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Deep dive
3. [backend/prisma/schema.prisma](backend/prisma/schema.prisma) - Data model

### Testing the API

1. [backend/POSTMAN_TESTING_GUIDE.md](backend/POSTMAN_TESTING_GUIDE.md) - Testing guide
2. [backend/POSTMAN_QUICK_REFERENCE.json](backend/POSTMAN_QUICK_REFERENCE.json) - Import this
3. [README.md](README.md) - API documentation section

### Adding New Features

1. [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution process
2. [ARCHITECTURE.md](ARCHITECTURE.md) - System design
3. [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md) - PR template

### Deploying to Production

1. [SETUP_GUIDE.md](SETUP_GUIDE.md) - Deployment section
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Deployment architecture
3. [SECURITY.md](SECURITY.md) - Security checklist

### Troubleshooting

1. [SETUP_GUIDE.md](SETUP_GUIDE.md) - Common issues section
2. [GOOGLE_SIGNIN_ERRORS_FIX.md](GOOGLE_SIGNIN_ERRORS_FIX.md) - OAuth issues
3. GitHub Issues - Search existing issues

---

## 📊 Documentation Statistics

### Coverage

- ✅ **Setup & Installation** - Comprehensive
- ✅ **Architecture & Design** - Detailed
- ✅ **API Documentation** - Complete with examples
- ✅ **Contribution Guidelines** - Thorough
- ✅ **Security Policy** - Established
- ✅ **Testing Guides** - Available
- ✅ **Feature Documentation** - Specific guides

### Languages

- English (primary and only language)

### Last Updated

- Most recent update: November 2024
- Regular updates: Every release
- Review cycle: Quarterly

---

## 🔍 Search Guide

### Finding Information

**By Topic:**
- **Authentication:** README.md, ARCHITECTURE.md, GOOGLE_SIGNIN_ERRORS_FIX.md
- **Booking System:** README.md, MONTHLY_BOOKING_ISSUE_FIX.md
- **Database:** DATABASE_SETUP.md, schema.prisma, ARCHITECTURE.md
- **Deployment:** SETUP_GUIDE.md, ARCHITECTURE.md
- **Testing:** POSTMAN_TESTING_GUIDE.md, TESTING_GUIDE.md
- **Security:** SECURITY.md, ARCHITECTURE.md
- **Video Calls:** VIDEO_CALL_UX_IMPROVEMENTS.md, README.md

**By Keyword:**
```
Authentication   → ARCHITECTURE.md, README.md
Booking          → README.md, MONTHLY_BOOKING_ISSUE_FIX.md
Database         → DATABASE_SETUP.md, schema.prisma
Deployment       → SETUP_GUIDE.md
Environment      → SETUP_GUIDE.md, .env.example files
OAuth            → GOOGLE_SIGNIN_ERRORS_FIX.md
Testing          → POSTMAN_TESTING_GUIDE.md
Weekend Blocking → README.md, ARCHITECTURE.md
Zoom SDK         → README.md, VIDEO_CALL_UX_IMPROVEMENTS.md
```

---

## 📝 Documentation Standards

### File Naming

- Use UPPERCASE for root documentation: `README.md`, `CONTRIBUTING.md`
- Use descriptive names: `SETUP_GUIDE.md`, not `INSTALL.md`
- Use underscores for multi-word: `SETUP_GUIDE.md`
- Use lowercase for templates: `.github/ISSUE_TEMPLATE/`

### Document Structure

All documentation should include:
1. **Title** - Clear and descriptive
2. **Table of Contents** - For documents >100 lines
3. **Introduction** - Context and purpose
4. **Content** - Well-organized sections
5. **Examples** - Code samples where applicable
6. **Related Links** - References to other docs

### Markdown Style

- Use ATX-style headers (`#` not underlines)
- Use fenced code blocks with language tags
- Use tables for structured data
- Use emoji sparingly for visual cues (✅, 🚀, etc.)
- Keep lines under 120 characters when possible

---

## 🔄 Keeping Documentation Updated

### When to Update

Update documentation when:
- ✅ Adding new features
- ✅ Changing APIs or interfaces
- ✅ Modifying setup procedures
- ✅ Fixing bugs that affect usage
- ✅ Releasing new versions
- ✅ Deprecating functionality

### Update Checklist

Before each release:
- [ ] Update [CHANGELOG.md](CHANGELOG.md) with changes
- [ ] Review [README.md](README.md) for accuracy
- [ ] Check [SETUP_GUIDE.md](SETUP_GUIDE.md) instructions
- [ ] Validate API documentation
- [ ] Update version numbers
- [ ] Add migration guides if needed

---

## 💬 Feedback

### Improving Documentation

Found an issue with documentation?
- **Unclear:** Create issue with "documentation" label
- **Error:** Submit PR with correction
- **Missing:** Request addition via issue
- **Suggestion:** Open discussion

### Contributing to Docs

Documentation contributions are welcome!
- Follow [CONTRIBUTING.md](CONTRIBUTING.md) guidelines
- Maintain consistent style
- Include examples
- Keep it clear and concise

---

## 📞 Questions?

Can't find what you need?

1. **Search** [GitHub Issues](https://github.com/yourusername/therabee/issues)
2. **Ask** in [Discussions](https://github.com/yourusername/therabee/discussions)
3. **Email** support@therabee.com

---

## 📚 External Resources

### Learning Resources

- **React:** [react.dev](https://react.dev)
- **TypeScript:** [typescriptlang.org](https://www.typescriptlang.org)
- **Node.js:** [nodejs.org/docs](https://nodejs.org/docs)
- **Prisma:** [prisma.io/docs](https://www.prisma.io/docs)
- **PostgreSQL:** [postgresql.org/docs](https://www.postgresql.org/docs)
- **Zoom SDK:** [developers.zoom.us](https://developers.zoom.us)

### Community

- **GitHub:** [github.com/yourusername/therabee](https://github.com/yourusername/therabee)
- **Discussions:** Use GitHub Discussions
- **Issues:** Use GitHub Issues
- **Email:** dev@therabee.com

---

**Last Updated:** November 2024

This index will be updated with each major release to reflect new documentation and changes.


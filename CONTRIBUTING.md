# Contributing to TheraBee

First off, thank you for considering contributing to TheraBee! It's people like you that make TheraBee such a great tool for connecting therapists and parents.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

---

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this code. Please report unacceptable behavior to support@therabee.com.

### Our Standards

**Examples of behavior that contributes to a positive environment:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

---

## Getting Started

### Prerequisites

Before you begin, ensure you have:
- Node.js >= 20.x
- PostgreSQL >= 14.x
- Git
- A GitHub account
- Basic knowledge of TypeScript, React, and Node.js

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/therabee.git
   cd therabee
   ```

3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/therabee.git
   ```

4. **Install dependencies**:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

5. **Set up environment variables**:
   - Copy `.env.example` to `.env` in both `backend/` and `frontend/`
   - Fill in the required values (contact maintainers for test credentials)

6. **Set up the database**:
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

7. **Start development servers**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

---

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Use this template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows 11, macOS 13]
 - Browser: [e.g. Chrome 119, Firefox 120]
 - Node Version: [e.g. 20.10.0]
 - Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description** of the enhancement
- **Step-by-step description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List any similar features** in other applications (if applicable)

### Your First Code Contribution 🎉

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues perfect for beginners
- `help wanted` - Issues that need attention
- `bug` - Something isn't working
- `enhancement` - New feature or request

---

## Development Workflow

### Branching Strategy

We follow a simplified Git Flow:

```
main (production)
  ├── develop (integration)
  │   ├── feature/feature-name
  │   ├── bugfix/bug-name
  │   └── hotfix/critical-fix
```

**Branch Naming Convention:**
- `feature/` - New features (e.g., `feature/monthly-booking`)
- `bugfix/` - Bug fixes (e.g., `bugfix/login-error`)
- `hotfix/` - Critical production fixes (e.g., `hotfix/payment-crash`)
- `refactor/` - Code refactoring (e.g., `refactor/booking-service`)
- `docs/` - Documentation updates (e.g., `docs/api-reference`)

### Creating a Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create and switch to a new branch
git checkout -b feature/your-feature-name
```

---

## Style Guidelines

### TypeScript/JavaScript Style Guide

We use ESLint and Prettier for code formatting. Run before committing:

```bash
# Backend
cd backend
npm run lint
npm run format

# Frontend
cd frontend
npm run lint
npm run format
```

**Key Rules:**
- Use TypeScript for all new code
- Use functional components with hooks (no class components)
- Use `const` and `let`, never `var`
- Prefer arrow functions
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

**Example:**

```typescript
/**
 * Creates a recurring booking for a child with the specified therapist.
 * Generates individual bookings for each weekday in the date range.
 * 
 * @param userId - The parent's user ID
 * @param input - Booking details including child, therapist, and dates
 * @returns The created recurring booking with generated sessions
 * @throws Error if any slot in the range is already booked
 */
async function createRecurringBooking(
  userId: string, 
  input: RecurringBookingInput
): Promise<RecurringBookingDetails> {
  // Implementation
}
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `BookingModal.tsx`)
- **Utilities**: camelCase (e.g., `dateUtils.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Services**: camelCase with `.service.ts` suffix (e.g., `booking.service.ts`)
- **Types**: PascalCase (e.g., `BookingTypes.ts`)

### CSS/Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use dark mode classes: `dark:bg-gray-900`
- Avoid inline styles unless necessary
- Use consistent spacing (4, 8, 16, 24, 32px)

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process or auxiliary tools
- `ci`: Changes to CI configuration files and scripts

### Examples

```bash
feat(booking): add monthly recurring booking feature

Implement monthly booking system that allows parents to book
sessions for an entire month at once. Includes validation to
ensure all slots are available before confirming.

Closes #123

---

fix(auth): resolve Google OAuth token verification error

The OAuth token was being rejected due to incorrect audience
parameter. Updated to use correct client ID from environment.

Fixes #456

---

docs(readme): update API documentation with new endpoints

Added documentation for recurring booking endpoints and
updated examples with correct request/response formats.
```

### Commit Best Practices

- Write clear, concise commit messages
- Use present tense ("add feature" not "added feature")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant
- Make atomic commits (one logical change per commit)

---

## Pull Request Process

### Before Submitting a PR

1. **Update your branch** with the latest main:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Run tests** and ensure they pass:
   ```bash
   npm test
   ```

3. **Check code style**:
   ```bash
   npm run lint
   ```

4. **Update documentation** if needed

5. **Test manually** in both development and production builds

### Creating a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Go to the original repository** on GitHub

3. **Click "New Pull Request"**

4. **Fill out the PR template** completely:

```markdown
## Description
<!-- Describe your changes in detail -->

## Related Issue
<!-- Link to the issue: Closes #123 -->

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
<!-- Describe the tests you ran -->

## Screenshots (if applicable)
<!-- Add screenshots to demonstrate the changes -->

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
```

### PR Review Process

1. **Automated checks** must pass:
   - Linting
   - Tests
   - Build

2. **Code review** by at least one maintainer:
   - Reviewers may request changes
   - Address all feedback
   - Push additional commits to the same branch

3. **Approval and merge**:
   - Once approved, a maintainer will merge your PR
   - Your branch will be deleted after merge

---

## Testing Guidelines

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

**Backend (Jest):**

```typescript
describe('RecurringBookingService', () => {
  describe('createRecurringBooking', () => {
    it('should create bookings for all weekdays in range', async () => {
      // Arrange
      const input = {
        childId: 'child1',
        therapistId: 'therapist1',
        slotTime: '10:00',
        startDate: '2024-11-07',
        endDate: '2024-12-06'
      };

      // Act
      const result = await service.createRecurringBooking('user1', input);

      // Assert
      expect(result.totalSessions).toBe(22); // Weekdays only
      expect(result.bookings).toHaveLength(22);
    });

    it('should throw error if any slot is already booked', async () => {
      // Test implementation
    });
  });
});
```

**Frontend (React Testing Library):**

```typescript
describe('BookingModal', () => {
  it('should display available time slots', async () => {
    render(<BookingModal therapistId="t1" />);
    
    await waitFor(() => {
      expect(screen.getByText('09:00 AM')).toBeInTheDocument();
      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    });
  });

  it('should prevent weekend date selection', async () => {
    render(<BookingModal therapistId="t1" />);
    
    // Select a Saturday
    const dateInput = screen.getByLabelText('Start Date');
    fireEvent.change(dateInput, { target: { value: '2024-11-09' } });
    
    expect(await screen.findByText(/weekends/i)).toBeInTheDocument();
  });
});
```

---

## Documentation

### Code Documentation

- Add JSDoc comments for all exported functions and classes
- Document complex algorithms with inline comments
- Keep comments up-to-date with code changes
- Use TypeScript types for self-documentation

### API Documentation

When adding new API endpoints, update:
- `backend/POSTMAN_TESTING_GUIDE.md`
- Main `README.md` API section
- Generate updated Postman collection

### User Documentation

- Update relevant sections in `README.md`
- Add usage examples
- Include screenshots for UI changes
- Update troubleshooting guides

---

## Questions?

Don't hesitate to ask questions! You can:
- Open a [GitHub Discussion](https://github.com/yourusername/therabee/discussions)
- Comment on relevant issues
- Email: dev@therabee.com

---

## Recognition

Contributors will be recognized in:
- `CONTRIBUTORS.md` file
- Release notes
- Project website

Thank you for contributing to TheraBee! 🎉


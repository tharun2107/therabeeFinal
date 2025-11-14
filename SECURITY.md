# Security Policy

## 🔒 Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🚨 Reporting a Vulnerability

The TheraBee team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### Where to Report

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- **Email:** security@therabee.com
- **Subject:** [SECURITY] Brief description of the issue

### What to Include

To help us better understand the nature and scope of the issue, please include as much of the following information as possible:

1. **Type of issue** (e.g., SQL injection, XSS, authentication bypass)
2. **Full paths** of source file(s) related to the issue
3. **Location** of the affected source code (tag/branch/commit or direct URL)
4. **Step-by-step instructions** to reproduce the issue
5. **Proof-of-concept or exploit code** (if possible)
6. **Impact** of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Depends on severity (see below)

### Severity Levels

We use the following severity levels to prioritize security issues:

#### 🔴 Critical
- Direct access to user data or authentication bypass
- Remote code execution
- **Fix Timeline:** 24-48 hours

#### 🟠 High
- Indirect access to user data
- Privilege escalation
- **Fix Timeline:** 1 week

#### 🟡 Medium
- Limited information disclosure
- XSS or CSRF vulnerabilities
- **Fix Timeline:** 2 weeks

#### 🟢 Low
- Minor information disclosure
- Configuration issues
- **Fix Timeline:** 1 month

## 🛡️ Security Best Practices

### For Developers

1. **Never commit secrets** to the repository
   - Use environment variables for sensitive data
   - Use `.env` files (gitignored)
   - Rotate credentials if accidentally committed

2. **Validate all user input**
   - Use Zod schemas for validation
   - Sanitize data before database operations
   - Implement rate limiting on sensitive endpoints

3. **Use secure authentication**
   - JWT tokens with short expiration
   - Bcrypt for password hashing
   - OAuth 2.0 for third-party authentication

4. **Protect against common vulnerabilities**
   - SQL injection: Use Prisma ORM with parameterized queries
   - XSS: Sanitize user input, use React's built-in XSS protection
   - CSRF: Use CORS with strict origin checking
   - Rate limiting: Implement on authentication and booking endpoints

### For Users

1. **Strong Passwords**
   - Use unique passwords for TheraBee
   - Enable two-factor authentication (when available)

2. **Recognize Phishing**
   - We'll never ask for your password via email
   - Always verify the URL: `https://therabee.com`

3. **Keep Software Updated**
   - Use the latest version of your browser
   - Keep your operating system updated

4. **Secure Your Account**
   - Log out after each session on shared devices
   - Don't share your credentials

## 🔐 Security Features

### Data Encryption
- **In Transit:** TLS 1.3 for all communications
- **At Rest:** PostgreSQL encryption
- **Passwords:** Bcrypt with salt rounds

### Access Control
- **Role-Based Access Control (RBAC):** Parent, Therapist, Admin
- **Data Consent System:** Parents control therapist access to child data
- **JWT Authentication:** Short-lived tokens with secure signing

### Privacy
- **Data Minimization:** We only collect necessary data
- **Data Retention:** Automatic cleanup of old sessions
- **GDPR Compliant:** Right to access, delete, and export data

### Monitoring
- **Audit Logs:** All admin actions are logged
- **Anomaly Detection:** Suspicious activity alerts
- **Regular Security Audits:** Quarterly security reviews

## 🔍 Known Security Considerations

### Current Implementation

1. **JWT Storage:** Tokens stored in localStorage
   - **Risk:** Vulnerable to XSS
   - **Mitigation:** React's built-in XSS protection, CSP headers
   - **Future:** Move to httpOnly cookies

2. **Password Requirements:** Minimum 8 characters
   - **Current:** Basic password validation
   - **Future:** Add entropy checking, password strength meter

3. **Rate Limiting:** API-level rate limiting implemented
   - **Protected Endpoints:** Login, registration, booking
   - **Future:** Add IP-based blocking for repeated violations

### Zoom Integration
- **SDK Signatures:** Short-lived (2 minutes)
- **Meeting Passwords:** Auto-generated and unique
- **Waiting Rooms:** Enabled by default
- **Join Before Host:** Disabled for security

## 📋 Security Checklist

### Before Deployment

- [ ] All environment variables are set correctly
- [ ] No secrets in codebase
- [ ] CORS origins are restricted
- [ ] Database backups are configured
- [ ] SSL/TLS certificates are valid
- [ ] Rate limiting is enabled
- [ ] Error messages don't leak sensitive info
- [ ] Logging is configured (no sensitive data logged)
- [ ] Dependencies are up to date
- [ ] Security headers are set (CSP, HSTS, etc.)

### Regular Maintenance

- [ ] Weekly dependency updates
- [ ] Monthly security audit
- [ ] Quarterly penetration testing
- [ ] Annual compliance review

## 🆘 Security Incident Response

If a security incident occurs:

1. **Immediate Actions**
   - Contain the breach
   - Document the incident
   - Notify the security team

2. **Investigation**
   - Determine the scope
   - Identify affected users
   - Analyze attack vectors

3. **Remediation**
   - Deploy fixes
   - Reset compromised credentials
   - Notify affected users

4. **Post-Incident**
   - Update security measures
   - Document lessons learned
   - Improve monitoring

## 📞 Contact

For security-related questions or concerns:

- **Email:** security@therabee.com
- **PGP Key:** Available upon request
- **Bug Bounty:** Coming soon

## 🏆 Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

<!-- Contributors will be listed here after disclosure -->

---

**Last Updated:** November 2024

Thank you for helping keep TheraBee and our users safe! 🛡️


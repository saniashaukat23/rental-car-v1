# Security Policy

## 🔒 Security Features

This project implements several security measures to protect against common vulnerabilities:

### Authentication & Authorization
- **Clerk Authentication**: Secure user authentication for admin routes
- **Protected API Endpoints**: PUT and DELETE operations require authentication
- **Route Protection**: Admin dashboard accessible only to authenticated users

### API Security
- **Rate Limiting**: API endpoints are rate-limited to prevent abuse
  - GET `/api/cars`: 30 requests per minute
  - Configurable limits per endpoint
- **Input Validation**: All user inputs validated using Zod schemas
- **NoSQL Injection Protection**: Input sanitization prevents MongoDB injection attacks
- **Request Validation**: MongoDB ObjectId format validation

### HTTP Security Headers
- **Strict-Transport-Security (HSTS)**: Forces HTTPS connections
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME-type sniffing
- **X-XSS-Protection**: Enables browser XSS protection
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

### Data Protection
- **Environment Variables**: Sensitive credentials stored in `.env.local` (not committed)
- **Error Sanitization**: Production errors don't expose internal details
- **Database Connection**: Secure MongoDB connection with timeout and retry logic

## 🚨 Reporting Security Vulnerabilities

If you discover a security vulnerability, please email the maintainers directly. Do not create public GitHub issues for security vulnerabilities.

## 🔑 Credential Management

### Environment Variables

Never commit the following files:
- `.env.local`
- `.env.production`
- Any file containing real credentials

### Rotating Credentials

If credentials are compromised:

1. **MongoDB**:
   - Go to MongoDB Atlas → Database Access
   - Delete the compromised user
   - Create a new user with a strong password
   - Update `MONGODB_URI` in `.env.local`

2. **Clerk**:
   - Go to Clerk Dashboard → API Keys
   - Regenerate your API keys
   - Update `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in `.env.local`

3. **Check Git History**:
   ```bash
   # Check if .env.local was ever committed
   git log --all --full-history -- .env.local
   
   # If found, consider the credentials compromised and rotate them
   ```

## 🛡️ Security Best Practices

### For Developers

1. **Never commit credentials**:
   - Always use `.env.local` for local development
   - Use `.env.example` as a template
   - Double-check before committing

2. **Keep dependencies updated**:
   ```bash
   npm audit
   npm audit fix
   ```

3. **Use strong authentication**:
   - Enable 2FA on all service accounts (MongoDB, Clerk, etc.)
   - Use strong, unique passwords

4. **Review code changes**:
   - Check for exposed secrets
   - Validate input handling
   - Ensure proper error handling

### For Deployment

1. **Environment Variables**:
   - Set environment variables in your hosting platform
   - Never hardcode credentials in code

2. **HTTPS Only**:
   - Always use HTTPS in production
   - Enable HSTS headers (already configured)

3. **Database Security**:
   - Use IP whitelisting in MongoDB Atlas
   - Enable network encryption
   - Regular backups

4. **Monitoring**:
   - Monitor API usage for unusual patterns
   - Set up alerts for failed authentication attempts
   - Review logs regularly

## 📋 Security Checklist

Before deploying to production:

- [ ] All environment variables set in hosting platform
- [ ] `.env.local` not committed to repository
- [ ] MongoDB IP whitelist configured
- [ ] Clerk production keys configured
- [ ] HTTPS enabled and enforced
- [ ] Dependencies updated (`npm audit` clean)
- [ ] Rate limiting tested
- [ ] Authentication flows tested
- [ ] Error handling doesn't expose sensitive data
- [ ] Security headers verified

## 🔄 Regular Security Maintenance

### Monthly
- Run `npm audit` and fix vulnerabilities
- Review access logs for suspicious activity
- Update dependencies

### Quarterly
- Review and rotate API keys
- Audit user permissions
- Review security policies

### Annually
- Comprehensive security audit
- Penetration testing (if applicable)
- Update security documentation

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [MongoDB Security Checklist](https://www.mongodb.com/docs/manual/administration/security-checklist/)
- [Clerk Security Documentation](https://clerk.com/docs/security)

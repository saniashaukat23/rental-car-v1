# Luxury Car Rental Platform

A modern car rental platform built with Next.js 16, featuring luxury car rentals with real-time availability, admin dashboard, and secure authentication.

## ✨ Features

- 🚗 Browse luxury cars by brand and category
- 💰 Dynamic pricing (daily, weekly, monthly rates)
- 🔐 Secure admin authentication with Clerk
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS + CSS Modules
- 💾 MongoDB database with optimized queries
- ✅ Input validation with Zod
- 🔒 Protected API routes

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** Clerk
- **Styling:** Tailwind CSS + CSS Modules
- **Icons:** Lucide React, React Icons
- **Validation:** Zod
- **UI Components:** Swiper, Bootstrap

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB database (local or Atlas)
- Clerk account ([clerk.com](https://clerk.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd car-rental-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   > **⚠️ IMPORTANT**: Never commit `.env.local` to version control. It contains sensitive credentials.
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your actual credentials:
   - `MONGODB_URI`: Your MongoDB connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: From [Clerk Dashboard](https://clerk.com) → API Keys
   - `CLERK_SECRET_KEY`: From Clerk Dashboard → API Keys (keep this secret!)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Visit [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (public pages)/    # Public-facing pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility functions & database
│   ├── db.ts             # MongoDB connection
│   └── validations.ts    # Zod validation schemas
├── models/                # Mongoose models
├── styles/                # CSS modules
└── types/                 # TypeScript type definitions
```

## 🔒 Security

This project implements multiple layers of security:

### Authentication & Authorization
- **Clerk Authentication**: All admin routes protected with Clerk
- **API Protection**: PUT/DELETE endpoints require authentication
- **Middleware**: Route-based access control

### API Security
- **Rate Limiting**: 30 requests/minute on GET endpoints to prevent abuse
- **Input Validation**: Zod schemas validate all user inputs
- **NoSQL Injection Protection**: Input sanitization prevents MongoDB injection
- **ObjectId Validation**: Prevents invalid database queries

### Security Headers
- **HSTS**: Enforces HTTPS connections
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME-type sniffing
- **CSP**: Content Security Policy (configurable)
- **Referrer-Policy**: Controls referrer information

### Data Protection
- **Environment Variables**: Sensitive data in `.env.local` (gitignored)
- **Error Sanitization**: Production errors don't expose internals
- **Secure Database**: MongoDB connection with proper timeout/retry logic

> **📖 For detailed security information**, see [SECURITY.md](SECURITY.md)

> **⚠️ CRITICAL**: If you've ever committed `.env.local` to git, rotate all credentials immediately. See [SECURITY.md](SECURITY.md) for instructions.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for a seamless car rental experience.

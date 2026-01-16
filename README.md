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
   
   Copy `.env.example` to `.env.local` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```
   
   Update the following variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
   - `CLERK_SECRET_KEY`: Clerk secret key

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

- All admin routes are protected with Clerk authentication
- API endpoints validate input using Zod schemas
- Environment variables are properly secured
- MongoDB connection uses proper timeout and error handling

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

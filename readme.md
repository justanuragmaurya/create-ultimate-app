# Next.js Template with Authentication, Prisma, and Shadcn UI

#### By : [Anurag Maurya](https://anuragmaurya.com) |  [my github](https://github.com/justanuragmaurya) | [twitter](https://x.com/anuragmaurya_x)

This is a modern Next.js template that includes authentication with NextAuth.js, Prisma ORM, and Shadcn UI components.

## Features
- 🔐 Authentication with Google (NextAuth.js)
- 📚 Database ORM with Prisma
- 🎨 UI Components from Shadcn UI
- 🌙 Dark mode support
- 🚀 Next.js 14 with App Router
- ⚡ Turbopack for faster development
- 💨 Tailwind CSS for styling
- 📱 Responsive design
- 🔍 TypeScript support

## Prerequisites
Before you begin, ensure you have installed:
- Node.js 18+ 
- PNPM package manager
- PostgreSQL database

## Getting Started

1. Set up your environment variables by creating a `.env` file in the root directory:
```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/your_database_name"

# Authentication (Google)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret" # Generate with: openssl rand -base64 32
```

2. Set up the database:

```
# Generate Prisma Client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# (Optional) Seed the database
pnpm prisma db seed
```

3. Start the development server:

```
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Set up the OAuth consent screen
6. Create OAuth 2.0 Client ID
7. Add authorized redirect URI: \`http://localhost:3000/api/auth/callback/google\`
8. Copy the Client ID and Client Secret to your `.env` file

## Database Schema

The current schema includes a User model with basic fields. You can extend it by modifying \`prisma/schema.prisma\`:

```
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  avatar    String
  updatedAt DateTime @updatedAt
}
```

## Available Scripts

```
# Development
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm start       # Start production server
pnpm lint        # Run ESLint

# Database
pnpm prisma studio    # Open Prisma Studio
pnpm prisma generate  # Generate Prisma Client
pnpm prisma migrate dev    # Run migrations in development
pnpm prisma migrate deploy # Deploy migrations in production
```

## Project Structure
```
├── src/
│   ├── app/              # App router pages
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn UI components
│   │   └── ...          # Custom components
│   ├── lib/             # Utility functions
│   │   ├── auth/        # Authentication logic
│   │   └── db/          # Database utilities
│   └── ...
├── prisma/              # Prisma schema and migrations
├── public/              # Static files
└── ...
```

## Deployment

This template is ready to be deployed on Vercel. For other platforms, ensure you:

1. Set up all environment variables
2. Run database migrations
3. Build the project
4. Start the production server
#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2];

if (!projectName) {
  console.log('Please specify a project name:');
  console.log('  npx create-ragey-app my-app');
  process.exit(1);
}

const currentDir = process.cwd();
const projectDir = path.join(currentDir, projectName);

// Create project directory
console.log(chalk.blue(`Creating a new Ragey app in ${chalk.green(projectDir)}`));

try {
  fs.mkdirSync(projectDir, { recursive: true });
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(chalk.red(`The directory ${projectName} already exists.`));
  } else {
    console.log(chalk.red(err));
  }
  process.exit(1);
}

// Copy template files
const templateDir = path.join(__dirname, 'template');
fs.copySync(templateDir, projectDir);

// Rename gitignore
fs.moveSync(
  path.join(projectDir, 'gitignore'),
  path.join(projectDir, '.gitignore'),
  { overwrite: true }
);

// Update package.json
const packageJsonPath = path.join(projectDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
packageJson.name = projectName;
packageJson.version = '0.1.0';
fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(packageJson, null, 2)
);

console.log(chalk.blue('\nInstalling pnpm...'));

try {
  // Install pnpm globally if not already installed
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
  } catch {
    console.log(chalk.blue('pnpm not found, installing globally...'));
    execSync('npm install -g pnpm', { stdio: 'inherit' });
  }

  console.log(chalk.blue('\nInstalling dependencies with pnpm...'));
  execSync('pnpm install', { cwd: projectDir, stdio: 'inherit' });
  
  console.log(chalk.green('\nSuccess! Created'), chalk.blue(projectName), chalk.green('at'), chalk.blue(projectDir));
  console.log('\nInside that directory, you can run several commands:');
  console.log('\n  ' + chalk.blue('pnpm dev'));
  console.log('    Starts the development server.');
  console.log('\n  ' + chalk.blue('pnpm build'));
  console.log('    Builds the app for production.');
  console.log('\n  ' + chalk.blue('pnpm start'));
  console.log('    Runs the built app in production mode.');
  console.log('\nWe suggest that you begin by typing:');
  console.log('\n  ' + chalk.blue('cd'), projectName);
  console.log('  ' + chalk.blue('pnpm dev'));
  console.log('\nHappy hacking!');
} catch (error) {
  console.log(chalk.red('\nError during installation:'));
  console.log(error);
  process.exit(1);
}

const readmeContent = `# Next.js Template with Authentication, Prisma, and Shadcn UI

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

1. First, clone the repository and install dependencies:

\`\`\`
git clone <repository-url>
cd <project-name>
pnpm install
\`\`\`

2. Set up your environment variables by creating a \`.env\` file in the root directory:

\`\`\`
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/your_database_name"

# Authentication (Google)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret" # Generate with: openssl rand -base64 32
\`\`\`

3. Set up the database:

\`\`\`
# Generate Prisma Client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# (Optional) Seed the database
pnpm prisma db seed
\`\`\`

4. Start the development server:

\`\`\`
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Set up the OAuth consent screen
6. Create OAuth 2.0 Client ID
7. Add authorized redirect URI: \`http://localhost:3000/api/auth/callback/google\`
8. Copy the Client ID and Client Secret to your \`.env\` file

## Database Schema

The current schema includes a User model with basic fields. You can extend it by modifying \`prisma/schema.prisma\`:

\`\`\`
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  avatar    String
  updatedAt DateTime @updatedAt
}
\`\`\`

## Available Scripts

\`\`\`
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
\`\`\`

## Project Structure

\`\`\`
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
\`\`\`

## Deployment

This template is ready to be deployed on Vercel. For other platforms, ensure you:

1. Set up all environment variables
2. Run database migrations
3. Build the project
4. Start the production server

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`;

export default readmeContent;
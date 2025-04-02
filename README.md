# AfroTour Nexus

AfroTour Nexus is a platform that combines tourism with sustainable infrastructure development across Africa. The platform allows users to explore African destinations, book tours with local guides, and contribute to infrastructure projects.
# Live Demo
https://afrotour-nexus.vercel.app/


## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v8 or later) or [Yarn](https://yarnpkg.com/) (v1.22 or later)
- [Git](https://git-scm.com/)
- A [Supabase](https://supabase.com/) account for authentication and database

## Installation

Follow these steps to get your development environment running:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/afrotour-nexus.git
   cd afrotour-nexus

Thought for 4 seconds### Putting AfroTour Nexus into a GitHub Repository

Here's a step-by-step guide to create a GitHub repository for your AfroTour Nexus project and set it up with a comprehensive README:

## Creating the GitHub Repository

1. **Create a new repository on GitHub**:

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "afrotour-nexus")
4. Add a short description (optional)
5. Choose "Public" or "Private" visibility
6. Click "Create repository"



2. **Initialize your local repository**:

```shellscript
# Navigate to your project directory
cd path/to/afrotour-nexus

# Initialize git repository
git init

# Add all files to staging
git add .

# Commit the files
git commit -m "Initial commit"
```


3. **Connect and push to GitHub**:

```shellscript
# Add the remote repository
git remote add origin https://github.com/yourusername/afrotour-nexus.git

# Push to GitHub
git push -u origin main
# Note: Use 'master' instead of 'main' if your default branch is named 'master'
```




## Creating a Comprehensive README.md

Create a file named `README.md` in your project root with the following content:

```markdown
# AfroTour Nexus

AfroTour Nexus is a platform that combines tourism with sustainable infrastructure development across Africa. The platform allows users to explore African destinations, book tours with local guides, and contribute to infrastructure projects.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v8 or later) or [Yarn](https://yarnpkg.com/) (v1.22 or later)
- [Git](https://git-scm.com/)
- A [Supabase](https://supabase.com/) account for authentication and database

## Installation

Follow these steps to get your development environment running:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/afrotour-nexus.git
   cd afrotour-nexus
```

2. **Install dependencies**

```shellscript
npm install
# or
yarn install
```




## Environment Setup

1. **Create a Supabase project**:

- Go to [Supabase](https://supabase.com/) and sign in
- Create a new project
- Note your project URL and anon key (public API key)



2. **Set up environment variables**:

- Create a `.env.local` file in the project root
- Add the following variables:


```plaintext
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```


3. **Set up Supabase authentication**:

- In your Supabase dashboard, go to Authentication → Settings
- Enable Email provider
- Configure Site URL to match your development URL (e.g., [http://localhost:3000](http://localhost:3000))
- Optional: Configure email templates for confirmation emails



4. **Set up Supabase database schema**:

- While this project primarily uses Supabase for authentication, you can extend it with custom tables if needed
- The project uses user metadata for profile information, so no additional tables are required for basic functionality






## Running the Development Server

```shellscript
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

```shellscript
npm run build
# or
yarn build
```

To start the production server:

```shellscript
npm start
# or
yarn start
```

# Deployment
To deploy AfroTour Nexus, configure a hosting platform like Vercel or Netlify and push your changes to a GitHub repository

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Supabase](https://supabase.com/) - Authentication and database
- [Lucide React](https://lucide.dev/) - Icon library

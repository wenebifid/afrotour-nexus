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

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/afrotour-nexus.git
   cd afrotour-nexus


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
To deploy AfroTour Nexus, configure a hosting platform like Vercel to push your changes to a GitHub repository

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Supabase](https://supabase.com/) - Authentication and database
- [Lucide React](https://lucide.dev/) - Icon library

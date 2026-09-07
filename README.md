# Terminal Portfolio Site

A terminal-inspired developer portfolio with an integrated Gemini AI chatbot, a Git-history style timeline for experience and education, individual project detail pages, and an in-browser resume/PDF viewer. Built with Next.js 14, Tailwind CSS, and Framer Motion.

## Features

- **Integrated AI assistant**: a chat widget powered by Google's Gemini model that answers questions about my experience, projects, and skills.
- **Terminal aesthetic**: boot-up sequences, typewriter animations, and Mac-style window controls.
- **Git-history timeline**: work experience and education presented as a Git commit history tree.
- **Project detail pages**: each project has its own page with screenshots, videos, and linked reports (`app/projects/[slug]`).
- **Resume and PDF viewing**: an in-browser PDF viewer and gallery for the resume and supporting documents (`app/resume`, `PdfViewer`, `PdfGallery`).
- **Data-driven content**: the site and the AI's knowledge base are both driven by a single JSON file (`content/portfolio-data.json`), so updates don't require touching UI code.

## Tech stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI integration**: [Google Generative AI SDK](https://ai.google.dev/) (Gemini)
- **PDF rendering**: [react-pdf](https://github.com/wojtekmaj/react-pdf)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Running locally

1. Clone the repository
   ```bash
   git clone https://github.com/1dan1609/portfolio-site.git
   cd portfolio-site
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env.local` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture overview

The site uses a single source of truth for content. All data (skills, projects, experience, bio) is stored in `content/portfolio-data.json`.

React components map over this JSON to generate the UI at build time. When a user queries the AI chatbot, the same JSON is injected into the Gemini system prompt at runtime, so the AI stays current with the portfolio without any model fine-tuning.

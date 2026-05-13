# Terminal Portfolio Site

A sleek, terminal-inspired developer portfolio featuring a fully integrated Gemini AI Chatbot, Git-history style timelines, and a seamless data-driven content architecture. Built with Next.js 14, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🤖 **Integrated AI Assistant**: A built-in chat widget powered by Google's Gemini 3 Flash model that can answer specific questions about my experience, projects, and skills.
- 💻 **Terminal Aesthetic**: Deeply immersive developer theme featuring boot-up sequences, typewriter animations, and Mac-style window controls.
- 🌳 **Git-History Timeline**: Work experience and education are presented visually as a Git commit history tree.
- 📄 **Data-Driven**: The entire site (and the AI's knowledge base) is driven by a single JSON file, making updates incredibly simple without touching UI code.
- ⚡ **Highly Optimized**: Built on Next.js 14 App Router for maximum performance and SEO.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [Google Generative AI SDK](https://ai.google.dev/) (Gemini 3 Flash)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/1dan1609/portfolio-site.git
   cd portfolio-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Architecture Overview

The site uses a "Single Source of Truth" architecture. All data (skills, projects, experience, bio) is stored in `content/portfolio-data.json`. 

When the site builds, the React components map over this JSON to generate the UI. When a user queries the AI Chatbot, this same JSON is seamlessly injected into the Gemini System Prompt at runtime, ensuring the AI always has the most up-to-date context about the portfolio without requiring model fine-tuning.


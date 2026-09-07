# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are recruiters, hiring managers, and technical collaborators/peers evaluating Vandan Agrawal for software engineering roles (full-stack, AI/ML, and security-adjacent positions). They arrive with limited time, scanning to quickly judge credibility and range before deciding whether to reach out. A secondary audience is peers/network contacts browsing out of general interest.

## Product Purpose

A personal portfolio whose primary success metric is a recruiter or hiring manager reaching out directly (email/LinkedIn/interview request) — not just a good impression. It presents Vandan's experience, projects, and skills with real, verifiable detail (not generic buzzwords), and lets visitors interrogate an embedded AI assistant for anything not immediately visible on the page.

## Positioning

Vandan's differentiator is a combination most engineers don't hold simultaneously: production RAG/LLM systems shipped to real users (Skedaddle's 5,000+ user AI system, CivicAI's municipal RAG search engine), full-stack/mobile delivery (Next.js, Kotlin/Flutter, Firebase, FastAPI), and hands-on offensive/defensive security work (malware reverse engineering, YARA authoring, adversarial-ML defenses). The site should read as evidence of unusual range with real depth in each area — not a generic "full-stack developer" template.

## Operating Context

Single-page site with sections: hero (terminal boot-sequence animation), about/skills, education, experience (git-log-styled commit history of jobs), projects (file-listing-styled repo browser), footer/contact, plus a floating AI chat widget available throughout.

All content is driven from `content/portfolio-data.json` — the single source of truth for both UI rendering (Hero, About, Education, Experience, Projects, Footer components) and the AI chatbot's system prompt (built server-side in `app/api/chat/route.ts`). The resume at `public/media/resume/resume.pdf` is the primary source-of-truth document; `portfolioData.json` is kept in sync with it as the resume is updated. It's also viewable in-app at `/resume` (not just downloadable).

The landing page (`/`) stays single-page-primary; optional per-project deep-dive routes at `/projects/[slug]` (one per project, reachable via "View full case study" links from the Releases section) offer richer media — embedded video, an embedded PDF report, or a screenshot gallery — for projects that have it. The persistent icon rail and AI assistant are shared across all routes via `app/layout.tsx`.

## Capabilities and Constraints

- Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion; deployed on Vercel's free tier.
- AI chatbot backed by Google Gemini (currently `gemini-3-flash-preview`) via the `/api/chat` route. Its system prompt is assembled at request time from the full `portfolioData` JSON plus fixed behavior rules (stay on-topic about Vandan, redirect unrelated questions, stay concise/technical/professional, cite specifics from the data).
- `portfolioData.json` contains `ai_context_note` fields — private steering instructions for the chatbot (e.g., "don't overstate cloud experience," "emphasize Python over Java/C++"). These must never be exposed verbatim to visitors and must be preserved as a mechanism in any redesign or expansion of the chat feature.
- No fact, metric, employer, project link, or testimonial may be fabricated — everything must trace back to the resume or existing JSON data.
- Currently employed full-time (Skedaddle Enterprises, since March 2026). Messaging should convey continued openness to the right opportunity without reading as actively job-hunting or desperate while employed.

## Evidence on Hand

- `content/portfolio-data.json` — structured source for experience, projects, education, skills, competitions.
- `public/resume/resume.pdf` — current resume (updated September 2026), authoritative for facts/dates/metrics.
- Verified project links: `github.com/1dan1609/CivicAI`, `github.com/1dan1609/teiko-dashboard`, `github.com/1dan1609/go-reddit-concurrency-engine`, `github.com/1dan1609/portfolio-site`; live demo at `vandanagrawal.vercel.app`; a few older student projects link to Google Drive demo folders instead of GitHub.
- No testimonials, press mentions, or case-study write-ups exist yet — do not fabricate any.
- Real media now embedded per-project: a CivicAI demo video (YouTube, unlisted), the actual final report PDF for the AI-model-defenses project (a 4-person UF course team project — the embedded paper names all co-authors, so the detail page carries a one-line attribution note alongside it), and screenshot sets for MEDEX (5 real app screens) and the clinical-trial dashboard (2 real dashboard screens, which also revealed a hand-built vanilla HTML/CSS/JS + Plotly.js frontend now reflected in that project's tech list).

## Product Principles

1. Every claim on the page must trace to real resume/project data — no filler buzzwords or invented proof.
2. Optimize for the recruiter's scan-then-verify loop: strong signal in the first viewport, real depth one click away.
3. The AI chatbot is a core differentiator, not a gimmick — treat it as a primary interaction path worth designing for, not an easter egg bolted to a corner.
4. Read as quietly confident, not job-hunting-desperate — currently employed, genuinely open to the right next opportunity.
5. Earn a distinct visual identity over safe, generic "AI-generated portfolio" conventions — the whole point of this project is to not look templated.

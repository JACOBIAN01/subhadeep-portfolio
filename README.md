<div align="center">

# Subhadeep Ghorai: Portfolio

### Software Engineer · System Design Instructor

Live: [subhadeepghorai.in](https://www.subhadeepghorai.in)

<img width="1440" height="811" alt="Portfolio screenshot" src="https://github.com/user-attachments/assets/f5ff0d59-10f9-42a8-a26f-83872d398c2a" />

</div>

## What this is

A single-page portfolio plus four case-study pages, built to give a recruiter or hiring manager a fast, credible read on my work. Every number on the site comes from a source I can point to: 569 real lecture-feedback responses, a named manager appreciation email, and merged open-source work.

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Motion | Framer Motion, `prefers-reduced-motion` respected via one `MotionConfig` |
| Font | Inter Variable, self-hosted (`@fontsource-variable/inter`) |
| Hosting | Vercel (static build + a few serverless functions in `client/api`) |
| CI | GitHub Actions: lint + build |

## Run it

```bash
cd client
npm install
npm run dev        # local dev server
npm run build      # production build + case-study prerender
npm run lint
npm run resume:build   # compile resume/resume.tex with tectonic and copy to public/resume.pdf
```

Copy `client/.env.example` to `client/.env.local` and set `ADMIN_PASSWORD` and `KV_REDIS_URL` only if you want the `/admin` analytics dashboard locally.

## Structure

```text
client/
├── api/                    # Vercel functions: track (visit analytics), stats (admin, password-gated)
├── public/                 # certs, resume.pdf, og/ share images, robots, sitemap, llms.txt
├── scripts/prerender.mjs   # post-build: per-case-study HTML with its own title/OG tags + sitemap
└── src/
    ├── components/         # Hero, Projects, Experience, Testimonials, CaseStudy, Marquee, Modal, ...
    ├── data/
    │   ├── profileData.jsx # nearly all site content, kept separate from presentation
    │   └── caseMeta.js     # plain-JS metadata shared by the app and the prerender script
    └── pages/Home.jsx      # section order
resume/                     # LaTeX source and compiled PDF
docs/SEO-notes.md           # SEO, social-preview and AI-discoverability notes
```

## How routing and prerendering work

- `/` renders the home page. `/work/<slug>` renders a case study, chosen in `App.jsx` from `window.location.pathname`.
- `npm run build` runs `vite build` and then `scripts/prerender.mjs`, which writes `dist/work/<slug>/index.html` with page-specific tags and a `<noscript>` summary, and regenerates `sitemap.xml`. The React app still takes over in the browser.
- To add a case study: add the project to `profileData.jsx` with a `slug`, then add an entry to `caseMeta.js` and an image at `public/og/<slug>.png`.

## Content rules

- Each figure appears once in `profileData.jsx` and is reused, so sections can't disagree.
- Student testimonials are anonymised and verbatim, and include a non-glowing one on purpose.
- Skills listed are limited to technologies used in a project shown on the site.

## Contact

[GitHub](https://github.com/JACOBIAN01) · [LinkedIn](https://www.linkedin.com/in/subhadeep-ghorai/) · [Book a call](https://calendly.com/subhadeepghorai23/30min) · subhadeepghorai23@gmail.com

<sub>This repository contains personal content (photos, certificates, contact details). It is shared for transparency, not as a template.</sub>

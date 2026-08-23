<div align="center">

# Subhadeep Ghorai: Portfolio

### Software Engineer · System Design Educator · MERN + AI Agents

<br />

<img width="1440" height="811" alt="Screenshot 2026-08-02 at 10 55 56 PM" src="https://github.com/user-attachments/assets/f5ff0d59-10f9-42a8-a26f-83872d398c2a" />

</div>

<br />

## Table of Contents

- [Overview](#overview)
- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Design Philosophy](#design-philosophy)
- [Accessibility & Performance](#accessibility--performance)
- [Content Integrity](#content-integrity)
- [SEO & Discoverability](#seo--discoverability)
- [Connect](#connect)

<br />

## Overview

> A single-page  portfolio built to do one job well: give a hiring manager or recruiter an honest, fast, and credible read on who I am as an engineer and educator, in under two minutes, on any device.

This isn't a template. Every stat, testimonial, and certificate on the live site is sourced from something real: 569 actual lecture feedback submissions, verified skill certificates cross-checked against their source images, and a named manager appreciation email a visitor can read in full. Where the numbers are imperfect (an honest "Average" rating alongside the "Awesome" ones), they stay imperfect, because a portfolio that only shows five-star reviews reads as curated, not credible.

<br />

## Highlights

| | |
|---|---|
| **Flagship case study** | [EventLoop Studio](https://github.com/JACOBIAN01/EventLoop-Studio): a published VS Code Marketplace extension that runs your own JavaScript inside a real Node vm sandbox and replays the Call Stack, Heap, microtasks, timers, and libuv phases step by step. |
| **Real social proof** | A "What Students Say" section built from 569 real lecture feedback responses (92.6% rated Awesome/Good), including a scrolling ticker of the raw one-liners too short to be full quotes. |
| **Verified, not vibes** | Every certificate card is checked against its actual certificate image: platform, date, and description all match what's printed on the document, not what a template assumed. |
| **Manager appreciation, in full** | A named recognition email from my manager, previewable inline via an in-browser PDF modal, not just a cropped quote you have to trust blindly. |
| **Motion that respects the user** | Every animation reads `prefers-reduced-motion` through a single `MotionConfig` boundary, with no per-component special-casing required. |
| **Infinite marquees that actually pause** | Certificate, stack, and testimonial carousels use a custom `Marquee` component driven by `requestAnimationFrame`, so hovering pauses in place and resumes from the same position instead of snapping back to start. |

<br />

## Tech Stack

<div align="center">

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no config file) |
| Motion | Framer Motion: scroll-triggered reveals, shared easing curve, reduced-motion aware |
| Icons | `react-icons`, `@heroicons/react` |
| Linting | ESLint 9 (flat config) + `eslint-plugin-react-hooks` |
| Accessibility audits | Playwright + `axe-core` |
| Deployment target | Static build (`vite build`), deployable to any static host |

</div>

<br />

## Project Structure

```text
client/
├── public/
│   ├── certs/                 # Certificate images (job + skill certs)
│   ├── manager-appreciation.pdf
│   ├── preview.jpg            # OG / social share image
│   └── Subhadeep_Ghorai_SDE.pdf
├── src/
│   ├── assets/                 # Imported images (logos, headshots)
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav + accessible mobile menu
│   │   ├── Hero.jsx
│   │   ├── StatsStrip.jsx       # Infinite marquee, animated counters
│   │   ├── About.jsx
│   │   ├── Projects.jsx         # Flagship case study + project grid
│   │   ├── Experience.jsx       # Timeline + manager recognition + cert carousel
│   │   ├── Testimonials.jsx     # Curated grid + short-quote ticker
│   │   ├── SkillCertificates.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Marquee.jsx          # Shared pause-on-hover infinite scroller
│   │   ├── Modal.jsx            # Shared accessible dialog (focus trap, Esc, scroll lock)
│   │   └── GlassCard.jsx / SectionTitle.jsx
│   ├── data/
│   │   └── profileData.jsx     # All content lives here, separated from presentation
│   └── pages/
│       └── Home.jsx             # Section composition & order
└── index.html                   # Meta tags, OG/Twitter cards, fonts
```

<br />

## Design Philosophy

The visual language is deliberately restrained: an Apple-style palette (`ink`, `subtle`, `faint`, `hairline`, `canvas`, `accent`), Inter typography, hairline borders instead of glassmorphism, and a single shared easing curve (`[0.16, 1, 0.3, 1]`) across every motion primitive in the app.

Content and presentation are kept strictly separate: almost everything a visitor reads lives in `src/data/profileData.jsx` as plain data, not scattered across JSX. That means updating a stat, a testimonial, or a certificate never means touching component logic.

<br />

## Content Integrity

This site treats factual accuracy as a feature, not an afterthought:

- Every rating, session count, and CSAT figure is a single source of truth reused across the hero, stats strip, and experience section, so no two sections ever quote different numbers for the same fact.
- Testimonials are anonymized at the source students' request, but never fabricated: names and IDs are withheld, while ratings, dates, and quotes are verbatim.
- Certificate metadata (platform, date, description) is checked against the actual certificate image, not assumed from a filename.

<br />

## SEO & Discoverability

> Recruiters and hiring managers meet this project through a Google search, not a link someone hands them. This section documents that work end to end — what a search engine (and increasingly, an AI assistant) actually sees and rewards — so it doubles as a case study in production SEO, not a checklist that quietly ran once.

### Discovery: `robots.txt` & `sitemap.xml`

Before a search engine can rank a page, its crawler ("Googlebot") has to find it and be allowed to read it. Two plain-text files at the site root handle that:

- **`robots.txt`** is the first file any well-behaved crawler requests. It's a permissions list — `Allow: /` tells every crawler the whole site is fair game to index, and a `Sitemap:` line points it straight at the sitemap below instead of making it guess.
- **`sitemap.xml`** is a machine-readable list of every URL on the site worth indexing, each with a `lastmod` (last-changed date), `changefreq`, and `priority`. For a single-page site that's a one-entry file, but it's still the fastest way to tell Google "this page exists and changed" instead of waiting for an unprompted re-crawl.

### Metadata: title, description, canonical URL

The `<title>` was just `"Subhadeep Ghorai"` — a missed opportunity, since Google weighs the title tag heavily for both ranking and the clickable blue line in results. It's now `"Subhadeep Ghorai | Software Engineer & System Design Educator"`, so the role shows up in the search result itself, not just after a click.

The meta `description` is the gray snippet text under that title. Google truncates it hard around ~155–160 characters, so the original version (which packed in the 4.44/5 rating and 91.55% CSAT) got trimmed to a version that reads as a complete sentence at the cutoff instead of being chopped mid-number.

`<link rel="canonical">` tells Google "this exact URL is the authoritative version of this page." It matters most during a domain move: this site briefly lived at a Vercel-provided subdomain before `subhadeepghorai.in` went live, and every URL-bearing tag (canonical, OG image, JSON-LD, sitemap, `llms.txt`) had to be repointed together. A stale canonical would have told Google to keep ranking the old, disappearing URL instead of transferring authority to the new one.

### Social previews: Open Graph & Twitter Cards

Open Graph (`og:*`) and Twitter Card (`twitter:*`) meta tags control what renders when the URL is pasted into Slack, LinkedIn, WhatsApp, or Twitter — a title, description, and preview image, instead of a bare gray link. These images and URLs must be **absolute** (`https://...`); several platforms' link-preview crawlers don't reliably resolve relative paths like `/preview.jpg`, so a relative OG image can silently fail to render depending on where it's pasted. That was the actual bug fixed here.

### Structured data: Person JSON-LD

A `<script type="application/ld+json">` block in `<head>` describes the page using [schema.org](https://schema.org) vocabulary — in this case, a `Person` with a name, job title, employer (`worksFor`), and a `sameAs` array linking to the GitHub and LinkedIn profiles. This is the mechanism Google uses to associate a page with a real-world entity for rich results and Knowledge Panels — `sameAs` is literally how it cross-references "this page," "this GitHub," and "this LinkedIn" as the same person.

### AI discoverability: `llms.txt`

`llms.txt` is an emerging, informal convention — a `robots.txt` for AI assistants and LLM-driven crawlers (ChatGPT browsing, Perplexity, Claude, etc.) instead of search crawlers. It's a clean, plain-text, first-person summary — background, experience, projects, skills, contact — written to be parsed directly rather than scraped and guessed at. The impact: if someone asks an AI assistant "who is Subhadeep Ghorai," there's an accurate, canonical, first-party source to answer from instead of the model stitching together stale cached fragments or hallucinating.

### Owning the domain: Search Console verification

The `google<token>.html` files in `public/` are ownership proofs for [Google Search Console](https://search.google.com/search-console) — Google serves one on request and only treats the domain as verified once it's live at that exact path. Verification is what unlocks indexing status, search performance data, and the ability to manually request a re-crawl (used below) for the *new* domain specifically; it doesn't carry over automatically from the old one.

### A stable favicon

The favicon showed up correctly in the browser tab but was missing next to this site in Google search results, while other results (LinkedIn, GitHub) showed theirs. Google has a specific requirement here: the favicon's URL needs to stay stable so it can be crawled and cached — and this one wasn't. The file lived outside Vite's `public/` folder, so every build treated it as a bundled asset and content-hashed its output filename (e.g. `/assets/fav-Bb12Zdgf.png`, a different string on every deploy). A URL that moves on every build is one Google can't reliably cache. Fix: move the file into `public/`, so it's served from the same unhashed `/fav.png` on every deploy, and correct its `<link rel="icon">` MIME type from `image/svg+xml` (leftover from an earlier SVG icon) to the actual `image/png`.

### Performance and structure as ranking signals

- **Image compression** — all certificate images recompressed ~29% smaller with no visible quality loss. Page weight and load speed (Core Web Vitals) are a direct Google ranking factor, not just a UX nicety.
- **Heading hierarchy** — the Hero section had a duplicate `<h2>` repeating the name that's already the page's `<h1>`. Screen readers and crawlers both use heading levels to build a page outline; two competing top-level headings for the same content muddies that outline, so the duplicate was demoted to a plain `<p>`.
- **Non-blocking font loading** — Inter was loaded via `@import` inside the CSS bundle, which is render-blocking: the browser can't paint anything until that fetch resolves. Moved to a `<link rel="stylesheet">` in `<head>`, so it loads in parallel with everything else instead of gating first paint.
- **Per-project anchor IDs** — each project card now has a stable `id` (e.g. `#eventloop-studio`, `#sesd-agent`), so any project can be linked to directly. `llms.txt` above points AI crawlers at these exact anchors instead of just the homepage.

### What this actually buys

- The page can be found by both an exact-name search and a role-based one, with a title and description written for the search snippet, not left to whatever the framework defaulted to.
- Pasting the link into LinkedIn, Slack, WhatsApp, or Twitter renders a real title, description, and image, not a bare URL.
- Structured data gives Google a machine-readable, first-party identity to anchor a Knowledge Panel or rich result to, rather than inferring one from prose.
- An AI assistant asked "who is Subhadeep Ghorai" has a canonical, accurate source to answer from instead of guessing.
- The favicon renders consistently in the browser tab **and** the search results snippet.
- Every change above ties back to something a crawler, a social platform, or an AI system actually reads — none of it is cosmetic.

<br />

## TODO

- [ ] **Resume pipeline**: source the resume from a LaTeX (`.tex`) file instead of a hand-maintained PDF. Compile it to PDF at build/update time (not on every download click) so the "Download Resume" link stays instant and static. Needs the `.tex` source file first.
- [x] **Update the resume PDF**: replaced with `client/public/Subhadeep_Ghorai_Instructor_Resume.pdf`, the Navbar download link now points to it. The older `Subhadeep_Ghorai_SDE.pdf` is still in `public/`, unused by any link, kept around in case it's useful for the role-based split below.
- [ ] **Role-based resume download**: clicking "Download Resume" opens a modal (reuse the existing `Modal` component) asking which role the visitor is hiring for, then downloads the matching PDF. Likely a two-way split (Software Engineer vs. Educator/Mentor). Both candidate PDFs already exist (`Subhadeep_Ghorai_SDE.pdf` and `Subhadeep_Ghorai_Instructor_Resume.pdf`), just not wired up to a picker yet.

<br />

## Connect

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-JACOBIAN01-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JACOBIAN01)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Subhadeep_Ghorai-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/subhadeep-ghorai/)
[![Email](https://img.shields.io/badge/Email-Reach_Out-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:subhadeepghorai23@gmail.com)

</div>

<br />

---

<div align="center">
<sub>This repository contains personal content: photos, certificates, and contact details specific to Subhadeep Ghorai. It's shared for transparency, not as a reusable template.</sub>
</div>

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

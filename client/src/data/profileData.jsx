// src/data/profileData.js
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaDatabase,
  FaJava,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import {
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiTailwindcss,
  SiFramer,
  SiFirebase,
  SiVercel,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGit,
  SiRedux,
  SiSocketdotio,
  SiMysql,
  SiGithubactions,
  SiLinux,
  SiNginx,
  SiJenkins,
} from "react-icons/si";

export const PROFILE = {
  name: "Subhadeep Ghorai",
  title:
    "Software Engineer @ Newton School of Technology · Building AI Agents in MERN · System Design Educator to 300+ Engineers (4.44/5 ★ & 91.55% CSAT) · Cloud & DevOps",
  location: "Kolkata, West Bengal, India",
  email: "subhadeepghorai23@gmail.com",
  phone: "+91 7029043892",
  github: "https://github.com/JACOBIAN01",
  linkedin: "https://www.linkedin.com/in/subhadeep-ghorai/",
  summary:
    "I build reliable, scalable web products end-to-end with React, Node.js, and Cloud. I love shipping polished UX, clean APIs, and mentoring devs.",
};

export const ABOUT = {
  lead: [
    "Most engineers ship code.",
    "Fewer can explain why it works to someone learning from scratch",
    "and that difference shows up in code review, in architecture decisions, in how a team actually learns from its mistakes.",
  ],
  paragraphs: [
    "I'm a Software Engineer & Subject Matter Expert (SME) at Newton School of Technology, building AI-agent evaluation pipelines on the MERN stack and teaching System Design across 9 batches.",
    "Before this, I spent two years at Codingal — Teacher Trainee to Teacher Mentor — mentoring students worldwide while building Atlas, an internal ops platform that replaced a manual Google Form and Canva workflow for their 700+ teacher training organisation.",
    "I'm currently open to SDE and New Grad roles. Drop a note or DM.",
  ],
  highlights: [
    "4.44/5 instructor rating across 569 student responses (91.55% CSAT) — 9 batches, 97 lectures at Newton School of Technology",
    "Built Repo-Score-V2 and WAP-Agent, AI evaluation pipelines automating 150+ GitHub PR reviews; resolved 99 student grievances individually",
    "Designed and shipped Atlas, an internal ops platform for Codingal's 700+ teacher training organisation — 100+ teachers onboarded in the first 10 days, 168 certificates automated",
    "Two years at Codingal, Teacher Trainee → Teacher Mentor: 100+ students mentored across 10+ countries, 2,500+ live coding sessions, 4.44/5 rating",
  ],
  languages: [
    "Bengali: Native",
    "Hindi: Full Professional",
    "English: Professional Working",
  ],
};

export const STACK = [
  { name: "React", icon: <FaReact className="text-2xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-2xl" /> },
  { name: "Express.js", icon: <SiExpress className="text-2xl" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-2xl" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-2xl" /> },
  { name: "Python", icon: <SiPython className="text-2xl" /> },
  { name: "Java", icon: <FaJava className="text-2xl" /> },

  { name: "MongoDB", icon: <SiMongodb className="text-2xl" /> },
  { name: "MySQL", icon: <SiMysql className="text-2xl" /> },
  { name: "Firebase", icon: <SiFirebase className="text-2xl" /> },

  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-2xl" /> },
  { name: "Redux", icon: <SiRedux className="text-2xl" /> },
  { name: "Framer Motion", icon: <SiFramer className="text-2xl" /> },
  { name: "Socket.IO", icon: <SiSocketdotio className="text-2xl" /> },

  { name: "AWS", icon: <FaAws className="text-2xl" /> },
  { name: "Docker", icon: <SiDocker className="text-2xl" /> },
  { name: "Kubernetes", icon: <SiKubernetes className="text-2xl" /> },
  { name: "Terraform", icon: <SiTerraform className="text-2xl" /> },

  { name: "Git", icon: <SiGit className="text-2xl" /> },
  { name: "GitHub Actions", icon: <SiGithubactions className="text-2xl" /> },
  { name: "Linux", icon: <SiLinux className="text-2xl" /> },
  { name: "Nginx", icon: <SiNginx className="text-2xl" /> },
  { name: "Jenkins", icon: <SiJenkins className="text-2xl" /> },
];

export const PROJECTS = [
  {
    name: "SESD-Agent: LLM Orchestration for Grading at Scale",
    desc: "Three orchestrated Claude API pipelines that grade GitHub repos, case studies, and coding streaks for 300+ engineers; 441 students graded in about 110 minutes.",
    tech: ["Node.js", "Claude API", "LLM Orchestration", "GitHub API"],
    repo: "https://github.com/JACOBIAN01/SESD-Agent",
  },
  {
    name: "AD Portal: Course Platform with Tamper-Proof Evaluation",
    desc: "An internal platform for running an Application Development course: students submit a GitHub repo per project, teachers evaluate progress against an immutable commit history, and admins configure sync and manage the roster.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    repo: "https://github.com/JACOBIAN01/AD-Portal",
    live: "https://nst-ad.vercel.app",
  },
  {
    name: "Terminal Lab Arena: Browser Terminal for Teaching",
    desc: "An in-browser Linux terminal playground teaching command-line basics through three story-driven missions, built for a live computer-lab session with about 200 students and no signup, no login, no accounts.",
    tech: ["React", "TypeScript", "Express", "xterm.js"],
    repo: "https://github.com/JACOBIAN01/terminal-lab-arena",
    live: "https://terminal-lab-arena.nstsdc.org/",
  },
  {
    name: "SmartReviewX: Project Review Automation",
    desc: "Automated evaluation pipeline; 3 min → 6–7 sec per review; modular OOP + real-time WebSockets; −25–30% recurring bugs.",
    tech: ["React", "Node.js", "WebSocket", "OOP"],
    repo: "https://github.com/JACOBIAN01/SmartReviewX",
  },
  {
    name: "Jana Academy: Full-Stack Learning Platform",
    desc: "A live academy platform with Google OAuth login, a real-time Quiz Arena, and a role-based admin dashboard monitored with Vercel Web Analytics and Core Web Vitals.",
    tech: ["React", "Firebase Auth", "Vercel Analytics"],
    repo: "https://github.com/JACOBIAN01/jana-academy-web",
    live: "https://jana-academy.vercel.app/",
    stats: [
      { k: "Page Views", v: "1,143" },
      { k: "Unique Visitors", v: "117" },
      { k: "Total Users", v: "68" },
      { k: "Active Admins", v: "5" },
    ],
    webVitals: [
      { k: "LCP", v: "1.2s", status: "good" },
      { k: "FID", v: "18ms", status: "good" },
      { k: "CLS", v: "0.02", status: "good" },
      { k: "FCP", v: "4.9s", status: "poor" },
      { k: "TTFB", v: "107ms", status: "good" },
    ],
  },
  {
    name: "Atlas: Internal Operations Platform for Teacher Training",
    desc: "An internal operations platform built for Codingal's 700+ teacher training organisation, replacing a Google Form and a Canva workflow for tracking module completions and issuing certificates.",
    tech: ["React 19", "Vite 7", "Tailwind 4", "Express", "Google Apps Script", "Google Sheets API"],
    repo: "https://github.com/JACOBIAN01/Atlas",
    stats: [
      { k: "Teachers Submitting", v: "~105" },
      { k: "Submissions Logged", v: "~183" },
      { k: "Certificates Generated", v: "168" },
      { k: "Flagged for Rework", v: "~12%" },
    ],
  },
];

// Flagship case studies: the most technically distinctive, shipped-to-strangers
// projects in the lineup, each with a Design Decisions / Trade-offs subsection.
export const FLAGSHIP_PROJECTS = [
  {
    name: "EventLoop Studio",
    tagline:
      "A VS Code extension that runs your own JavaScript inside a real Node vm sandbox and replays the Call Stack, Heap, microtasks, timers, and libuv phases step by step, published on the VS Code Marketplace.",
    problem:
      "Most event loop visualizers replay a fixed animation of one canned example: they teach the concept in the abstract and leave you to map it onto your own, different code by hand.",
    highlights: [
      {
        name: "Real Execution, Not Simulation",
        desc: "The active file runs inside a Node vm sandbox with its own Promise intrinsics, so recursion, closures, and real async/await behave correctly instead of being reverse-engineered from an AST.",
        stat: "Spec-correct microtask ordering, for free",
      },
      {
        name: "Scrubbable Step-by-Step Replay",
        desc: "Every call stack push/pop, console call, and timer/microtask/phase transition is recorded as an ExecutionStep; jump to any point in the trace and every panel reflects the exact state at that step.",
        stat: "Full playback and scrubbing controls",
      },
      {
        name: "Browser and Node.js Modes",
        desc: "Browser mode models the call stack, heap, web APIs, and a single macrotask queue; Node.js mode renders the six real libuv phases plus a central Microtask Hub for process.nextTick and Promises.",
        stat: "6 real libuv phases modeled in Node.js mode",
      },
    ],
    stack: ["TypeScript", "VS Code Extension API", "Node.js vm", "Acorn", "React", "esbuild"],
    repo: "https://github.com/JACOBIAN01/EventLoop-Studio",
    marketplace:
      "https://marketplace.visualstudio.com/items?itemName=SubhadeepGhorai.eventloop-studio",
    // Real trade-off content (constraint/rejected-alternative/10x-breakage/hindsight)
    // isn't available yet for this project — left empty rather than invented.
    // Projects.jsx renders the trade-offs subsection conditionally, so this is safe.
    tradeoffs: [],
  },
  {
    name: "NSTEP: Concurrent Slot-Booking System",
    tagline:
      "A slot-booking system built for real concurrency, run by more than one administrator at once — no self-signup, no client-trusted state, no bookings lost to third-party API outages.",
    problem:
      "Admins pre-provision student credentials and control which one-hour slots are bookable; students book into slots capped at 5 students each. Capacity has to be enforced atomically even when multiple admins and students are writing at once, and losing a third-party sync (Google Sheets) can never mean losing a booking.",
    highlights: [
      {
        name: "Atomic Capacity Enforcement",
        desc: "bookingService.bookSlot runs a single MongoDB transaction that atomically gates capacity (bookedCount < 5) and rejects double-booking via a unique index on (batchId, studentUsername); a failed booking insert auto-rolls back the capacity increment.",
        stat: "206 tests passing (11 unit + 7 integration suites)",
      },
      {
        name: "Cross-Admin Race Closed With a Second Unique Constraint",
        desc: "Once slots are owned by independent admins, a booking race spans multiple documents and snapshot isolation alone can't serialize it — closed with a second unique index (ScheduleLock, unique on studentUsername+date+tick), not a read-then-compare check.",
        stat: "Zero cross-admin double-bookings by construction",
      },
      {
        name: "Fire-and-Forget Sheets Sync",
        desc: "Google Sheets sync never blocks booking correctness: a failed append is persisted to a sync_failures collection and drained by an hourly Vercel Cron job, so a third-party outage degrades reporting only.",
        stat: "Booking correctness independent of Sheets uptime",
      },
    ],
    stack: [
      "React",
      "Tailwind CSS",
      "Vite",
      "Node.js",
      "Express (single Vercel function)",
      "MongoDB",
      "Mongoose",
      "Google Sheets API",
      "JWT (httpOnly cookie)",
      "node --test",
    ],
    repo: "https://github.com/JACOBIAN01/NSTEP",
    tradeoffs: [
      {
        constraint:
          "session.withTransaction() in the MongoDB driver retries a write-conflicted transaction by default — silently, for up to two minutes.",
        decision:
          "Applied a bounded timeoutMS to every transactional call so a losing request in a concurrency race fails fast with a typed, retryable error instead of hanging.",
        rejected:
          "Discovered only by reading the MongoDB driver source after chasing intermittent test hangs under concurrent booking load — the default retry-until-success behavior looks correct in isolation and only breaks down when two admins race for the same slot.",
        breaksAt10x:
          "At 10x concurrent booking attempts on a single popular slot, un-timeboxed retries would queue requests for minutes instead of returning a fast, retryable rejection — turning a capacity conflict into a perceived hang.",
        hindsight:
          "Would have added the timeoutMS from day one and written a driver-level integration test for it, rather than discovering the default behavior via a flaky test investigation.",
      },
      {
        constraint:
          "Login throttling needs a key, and the entire student cohort shares one campus egress IP address.",
        decision: "Keyed login throttling on the submitted username, never on IP.",
        rejected:
          "IP-based lockout — the standard default — was rejected because it would lock out the entire cohort simultaneously on exam day the moment one student mistyped a password enough times.",
        breaksAt10x:
          "Not a 10x-load problem so much as a correctness-under-shared-network problem; it would have failed on day one, not at scale.",
        hindsight: "None noted — this was caught before shipping, not after.",
      },
      {
        constraint:
          "V1 scope had to ship without student-initiated cancellation, Sheets-quota backoff, a CI pipeline, or paginated session lists.",
        decision:
          "Documented each as a deliberate, scoped-out trade-off rather than an oversight — 6 accepted ADRs in the repo record the reasoning for hybrid datastore choice, stateless JWT auth, transactional booking, single-function deployment, async Sheets sync, and batch-scoped slot release.",
        rejected:
          "Building all of it up front, which would have delayed shipping the core atomic-booking guarantee that the whole system exists for.",
        breaksAt10x:
          "A burst of Sheets writes beyond quota fails rather than queues today — the first thing to break under significantly higher submission volume. A CI pipeline is the next thing to add if contributor count grows.",
        hindsight:
          "The session list's missing pagination has a documented volume trigger for when to revisit it — treating known debt as tracked, not forgotten, is the part worth repeating on the next project.",
      },
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "Instructor & Software Engineer",
    org: "Newton School of Technology",
    period: "Dec 2025 – Present",
    bullets: [
      "Built and deployed AI Agent-powered evaluation systems, including RepoScore-V2 and WAP-Agent, automating assessment workflows.",
      "Designed and developed internal tools and full-stack applications using the MERN stack, contributing to project evaluation pipelines, learning platforms, and operational efficiency initiatives.",
      "Delivered 100+ lectures across 3 engineering cohorts, mentoring students in System Design, OOP, Software Engineering, Design Patterns, and scalable application architecture.",
      "Collaborated with academic and engineering teams to create technical content, conduct project reviews and mock interviews, and improve learning outcomes for 300+ aspiring software engineers.",
    ],
  },
  {
    role: "Teacher Mentor & Senior Coding Instructor",
    org: "Codingal",
    period: "Dec 2023 – Jan 2026",
    bullets: [
      "Mentored 100+ students across 10+ countries through 2,500+ live coding sessions in Java, Python, AI, and Web Development.",
      "Achieved a 4.44/5 average rating and 80% student renewal rate through engaging, personalized learning.",
      "Conducted training sessions for newly onboarded teachers and assessed teaching and communication skills as a Teacher Mentor.",
    ],
  },
];

// Sourced from 569 real lecture feedback submissions (Jan-Apr 2026) at Newton
// School of Technology. Names and student IDs withheld by student request;
// course/lecture IDs dropped as internal-only. A handful of raw entries were
// excluded entirely: complaints naming a different faculty member, comments
// naming specific students negatively, and off-topic exam/CGPA requests -
// none of that belongs on a public page regardless of curation.
export const TESTIMONIAL_STATS = {
  total: 569,
  positiveRate: 92.6, // rated "Awesome" or "Good"
  period: "Jan-Apr 2026",
};

// Curated for variety across rating, date, and tone rather than picking only
// the most glowing entries, so the mix stays honest instead of reading as
// cherry-picked praise.
export const TESTIMONIALS = [
  {
    quote:
      "Thank you sir for this amazing semester, you made things easier to understand. Hope to see you again.",
    rating: "Awesome",
    date: "April 30, 2026",
  },
  {
    quote: "Completely understood GitHub Actions.",
    rating: "Awesome",
    date: "April 27, 2026",
  },
  {
    quote: "Clear teaching, helpful examples.",
    rating: "Awesome",
    date: "April 21, 2026",
  },
  {
    quote: "Every explanation was clear.",
    rating: "Good",
    date: "April 20, 2026",
  },
  {
    quote:
      "Understood the concept well, but the code felt rushed and could have been explained better.",
    rating: "Average",
    date: "April 13, 2026",
  },
  {
    quote:
      "Best lab I've had. Understood everything at once and solved every question on my own, thank you sir.",
    rating: "Awesome",
    date: "April 2, 2026",
  },
  {
    quote:
      "Nice session on LLD (low-level design). This type of session should happen more, like one for HLD.",
    rating: "Awesome",
    date: "March 16, 2026",
  },
  {
    quote:
      "Thank you sir, you put so much energy and consideration into conducting workshops. There's so much learning in the workshops you take.",
    rating: "Awesome",
    date: "February 26, 2026",
  },
  {
    quote:
      "Literally understood everything, very clear. Thanks a lot, sir, for such an explanation.",
    rating: "Awesome",
    date: "January 13, 2026",
  },
];

// Short one-liners from the same feedback set, too brief to carry a full card
// alone but real. Used in a scrolling ticker to reflect actual volume rather
// than implying only the curated quotes above exist.
export const TESTIMONIAL_TICKER = [
  "Loved it",
  "Good revision",
  "Great explanation",
  "Nothing to say, everything great",
  "10/10 class, you should also take our lectures",
  "Best explanation and question solving",
  "Really awesome lab, I like it and understand it",
  "Great class, sir helped us with revision and it was really nice",
  "This class was much better than the last one",
  "Nice interactive class",
  "Great teaching skill",
  "Class was good, I understand everything, my doubts were cleared",
  "Everything is extraordinary",
  "Sir teaches very well",
  "Fully understood the ER diagram",
  "Quite easily understood the UML sequence diagram",
  "Good session",
  "Understood everything at once",
  "Nice session, understood everything",
  "Very good teacher, best teacher",
];

// Verbatim excerpt from a manager appreciation email (24 March 2026), named
// with permission. Trimmed to two contiguous sentences, no wording changed.
export const MANAGER_APPRECIATION = {
  quote:
    "The feedback from students about your sessions has been consistently very positive. You connect with students well, understand them, and create a strong learning experience for them.",
  name: "Aditya Kumar",
  role: "SDE & Instructor, Newton School of Technology",
};

export const Leadership = [
  {
    role: "Vice President",
    org: "BONGOJO (VIT-AP)",
    period: "Jan 2025 – Jun 2025",
    bullets: ["Led a 25-member team; organized 5+ events; +25% membership."],
  },
];


export const CONTACTS = [
  { label: "GitHub", href: PROFILE.github, icon: <FaGithub /> },
  { label: "LinkedIn", href: PROFILE.linkedin, icon: <FaLinkedin /> },
  {
    label: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: <FaEnvelope />,
  },
  {
    label: PROFILE.phone,
    href: `tel:${PROFILE.phone.replace(/\s/g, "")}`,
    icon: <FaPhoneAlt />,
  },
];

// ------------------ Job Certificates & Recognitions ------------------

export const JOB_CERTIFICATES = [
  {
    title: "Certificate of Excellence – Codingal Inc.",
    org: "Codingal Inc.",
    date: "July 2024",
    metric: "2,500+ live sessions • 4.44★ rating",
    desc: "Recognized for outstanding mentorship, innovation, and global educational impact.",
    img: "/certs/Coding_Instructor.jpg",
  },
  {
    title: "Performance Recognition – 5+ Renewals in a Month",
    org: "Codingal Inc.",
    date: "Nov 2022",
    metric: "5+ Monthly Renewals • 18% Client Growth",
    desc: "Awarded for exceptional educator engagement and renewal performance.",
    img: "/certs/Plus_Renewal.jpg",
  },
  {
    title: "Promotion – Senior Coding Instructor",
    org: "Codingal Inc.",
    date: "May 2025",
    metric: "Mentored 100+ students • Led instructor teams",
    desc: "Promoted for leadership, quality delivery, and consistent excellence.",
    img: "/certs/Senior_Coding_Instructor.jpg",
  },
  {
    title: "Teacher Mentor Promotion",
    org: "Codingal Inc.",
    date: "Aug 2024",
    metric: "Top Mentor Recognition • Educator Leadership",
    desc: "Recognized for mentoring and supporting instructor growth initiatives.",
    img: "/certs/Teacher_Mentor.jpg",
  },
  {
    title: "Subject Matter Expert (Python)",
    org: "Codingal Inc.",
    date: "Mar 2025",
    metric: "100+ Students Mentored • 80% Renewal Rate",
    desc: "Appreciated for expertise in Python curriculum design and mentorship.",
    img: "/certs/Python_SME.jpg",
  },
];

export const SKILL_CERTIFICATES = [
  {
    title: "Full Stack Developer Bootcamp",
    platform: "GeeksforGeeks",
    date: "March 2025",
    img: "/certs/GFG.jpg",
    desc: "Completed a 6-week bootcamp covering full-stack development from frontend to backend.",
  },
  {
    title: "System Design Masterclass",
    platform: "Udemy",
    date: "July 2025",
    img: "/certs/System_Design.jpg",
    desc: "Learned scalable backend design and distributed architecture principles.",
  },
  {
    title: "Data Visualization Bootcamp Using Python",
    platform: "CSI Chapter, VIT-AP",
    date: "November 2023",
    img: "/certs/DS.jpg",
    desc: "Completed a hands-on bootcamp on data visualization techniques using Python.",
  },
  {
    title: "Oracle Cloud Infrastructure Foundations Associate",
    platform: "Oracle",
    date: "July 2025",
    img: "/certs/Oracle.jpg",
    desc: "Validated understanding of OCI architecture, compute, and networking.",
  },
];

// Certifications confirmed on LinkedIn without an accompanying badge image yet
export const ADDITIONAL_CERTIFICATIONS = ["Introduction to Generative AI"];

// ------------------ Open Source Contributions ------------------
// Real, merged PRs to repos not owned by the author — independently verifiable via url.
export const OPEN_SOURCE_CONTRIBUTIONS = [
  {
    repo: "electron/electron",
    title: "docs: clarify debugger.sendCommand timing and empty-result behavior",
    type: "Documentation",
    date: "Merged Sep 5, 2026",
    desc: "Closed a documentation gap open since 2018 (#14822): documented that a pending navigation measurably delays debugger.sendCommand() resolution (~445ms vs ~19ms, verified with timestamped reproduction logs), and that a successful command with no protocol result field resolves with an empty object (verified against the Electron C++ source).",
    url: "https://github.com/electron/electron/pull/53114",
  },
  {
    repo: "adarshashokbaghel-code/mentr",
    title: "Replace 'Loading…' text with skeletons in connection requests and pitches",
    type: "Feature",
    date: "Merged Sep 1, 2026",
    desc: "Replaced plain loading text in two dashboard components with skeleton loaders, reusing an existing Skeleton component and matching an established pattern; explicitly declined to touch a third flagged file because it was a full-page loading gate, not list content, and didn't fit the existing pattern.",
    url: "https://github.com/adarshashokbaghel-code/mentr/pull/21",
  },
];

// ------------------ Competitive Programming ------------------
export const LEETCODE = {
  handle: "Subhadeep_Ghorai",
  profileUrl: "https://leetcode.com/u/Subhadeep_Ghorai/",
  totalSolved: 166,
  totalProblems: 4046,
  easy: { solved: 62, total: 963 },
  medium: { solved: 75, total: 2111 },
  hard: { solved: 29, total: 972 },
  attempting: 5,
  badges: 3,
  latestBadge: "50 Days Badge 2026",
  submissionsPastYear: 298,
  activeDays: 90,
  maxStreak: 80,
};

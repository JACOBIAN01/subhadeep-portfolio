// src/data/profileData.js
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDatabase,
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiFirebase,
  SiVercel,
  SiGit,
  SiRedux,
  SiSocketdotio,
  SiPython,
  SiTypescript,
  SiDocker,
  SiKubernetes,
  SiTerraform,
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
    "I found that out by accident. Three years ago I started teaching coding part-time. Somewhere in 2,500+ live sessions across 10+ countries, I realised explaining System Design to a beginner forces a level of clarity that writing code alone never does. You can't hide a shaky mental model behind clean syntax when a student asks \"but why?\"",
    "Before this, as Senior Coding Instructor at Codingal, I taught AI/ML, Python, and Web Dev fundamentals to 100+ students across 10+ countries, 2,500+ sessions, 80% renewal rate. That's not a separate chapter. It's where I learned to break down complex systems fast, under real-time pressure, in front of an audience that will tell you immediately if you're wrong.",
    "If you're an EdTech company that needs an engineer who can also teach at scale, I've delivered 2,500+ K-12 sessions across 10+ countries and 100+ System Design lectures for B.Tech engineers, with the technical depth to build your platform and the clarity to train your learners on it.",
    "If you're an HR or hiring manager evaluating System Design ability, I don't just talk through tradeoffs: I've built and shipped the systems that prove it: AI-agent evaluation pipelines (RepoScore, WAP-Agent) on the MERN stack, architected and deployed end-to-end. That's System Design applied to real engineering work, not a whiteboard exercise.",
    "Either way, let's talk. I'm currently open to SDE and technical mentorship-adjacent roles. Drop a note or DM.",
  ],
  highlights: [
    "Built and deployed AI-agent-powered evaluation systems (RepoScore-V2, WAP-Agent) on the MERN stack, automating workflows that used to cost 50+ hours a month",
    "Delivered 100+ System Design and OOP lectures across 3 engineering cohorts: 300+ aspiring engineers, 91.55% CSAT, 4.44/5 rating",
    "Reviewed 150+ GitHub PRs and resolved 99+ technical grievances at scale, without slowing delivery",
    "Ran 30+ mock interviews, translating engineering standards into feedback engineers actually use",
  ],
  languages: [
    "Bengali: Native or Bilingual",
    "Hindi: Full Professional",
    "English: Professional Working",
  ],
};

export const STACK = [
  { name: "React", icon: <FaReact className="text-2xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-2xl" /> },
  { name: "Express", icon: <SiExpress className="text-2xl" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-2xl" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-2xl" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-2xl" /> },
  { name: "Python", icon: <SiPython className="text-2xl" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-2xl" /> },
  { name: "Framer Motion", icon: <SiFramer className="text-2xl" /> },
  { name: "Firebase", icon: <SiFirebase className="text-2xl" /> },
  { name: "Vercel", icon: <SiVercel className="text-2xl" /> },
  { name: "AWS", icon: <FaAws className="text-2xl" /> },
  { name: "Docker", icon: <SiDocker className="text-2xl" /> },
  { name: "Kubernetes", icon: <SiKubernetes className="text-2xl" /> },
  { name: "Terraform", icon: <SiTerraform className="text-2xl" /> },
  { name: "Git", icon: <SiGit className="text-2xl" /> },
  { name: "Redux", icon: <SiRedux className="text-2xl" /> },
  { name: "WebSockets", icon: <SiSocketdotio className="text-2xl" /> },
  { name: "SQL/DB", icon: <FaDatabase className="text-2xl" /> },
];

export const PROJECTS = [
  {
    name: "SmartReviewX: Project Review Automation",
    desc: "Automated evaluation pipeline; 3 min → 6–7 sec per review; modular OOP + real-time WebSockets; −25–30% recurring bugs.",
    tech: ["React", "Node.js", "WebSocket", "OOP"],
    repo: "https://github.com/JACOBIAN01/SmartReviewX",
  },
  {
    name: "LifeDrop: Blood Donation Platform",
    desc: "Realtime donors ↔ hospitals with RBAC dashboards, Firestore listeners, Twilio alerts, and Firebase Auth.",
    tech: ["React", "Tailwind", "Firebase", "Functions"],
    repo: "https://github.com/JACOBIAN01/LifeDrop",
    live: "https://life-drop-xi.vercel.app/",
  },
  {
    name: "AEVM: Advanced Electronic Voting Machine",
    desc: "IoT-enabled secure e-voting with biometric auth, instant cloud-synced results, and React dashboards.",
    tech: ["React", "IoT", "Cloud", "Security"],
    publication:
      "Published research: “AEVM: Enhancing Electoral Integrity with Biometric Verification.”",
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
      { k: "Total Users", v: "45" },
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
];

// Flagship case study: the most distinctive, personally-true story, an educator
// who built the AI system that grades his own 300+ students at scale.
export const FLAGSHIP_PROJECT = {
  name: "SESD-Agent",
  tagline:
    "Three automated AI-agent grading pipelines that evaluate System Design submissions for 300+ engineers, so mentorship scales without manual grading hours.",
  problem:
    "Manually reviewing GitHub repos, case studies, and coding activity for 300+ students across multiple cohorts doesn't scale: grading alone would consume dozens of hours every week.",
  pipelines: [
    {
      name: "Project Evaluator",
      desc: "Reads each student's GitHub repo, uses Claude to identify the required docs (idea.md + 4 UML diagrams) and evaluate backend/frontend quality, then writes a score out of 10 straight back to the sheet.",
      stat: "441 students graded in ~110 minutes",
    },
    {
      name: "Case Study Evaluator",
      desc: "Reads each student's Drive report or blog post and uses Claude to score research depth, clarity, and real-world impact out of 5.",
      stat: "154 case studies graded in ~40 minutes",
    },
    {
      name: "Streak Evaluator",
      desc: "Pulls contribution calendars directly from the GitHub, LeetCode, and Codeforces APIs (no LLM involved) and converts the longest coding streak of the year into a 0–10 score.",
      stat: "~500ms per student, zero API cost",
    },
  ],
  stack: [
    "Node.js",
    "Claude API",
    "GitHub API",
    "Google Sheets API",
    "LeetCode API",
    "Codeforces API",
  ],
  repo: "https://github.com/JACOBIAN01/SESD-Agent",
};

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
      "Achieved a 4.7/5 average rating and 80% student renewal rate through engaging, personalized learning.",
      "Conducted training sessions for newly onboarded teachers and assessed teaching and communication skills as a Teacher Mentor.",
    ],
  },
];

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
    metric: "3000+ live sessions • 4.7★ rating",
    desc: "Recognized for outstanding mentorship, innovation, and global educational impact.",
    img: "/certs/Coding_Instructor.jpg",
    link: "/certs/Coding_Instructor.pdf",
  },
  {
    title: "Performance Recognition – 5+ Renewals in a Month",
    org: "Codingal Inc.",
    date: "Nov 2022",
    metric: "5+ Monthly Renewals • 18% Client Growth",
    desc: "Awarded for exceptional educator engagement and renewal performance.",
    img: "/certs/Plus_Renewal.jpg",
    link: "/certs/Plus_Renewal.jpg",
  },
  {
    title: "Promotion – Senior Coding Instructor",
    org: "Codingal Inc.",
    date: "May 2025",
    metric: "Mentored 100+ students • Led instructor teams",
    desc: "Promoted for leadership, quality delivery, and consistent excellence.",
    img: "/certs/Senior_Coding_Instructor.jpg",
    link: "/certs/Senior_Coding_Instructor.pdf",
  },
  {
    title: "Teacher Mentor Promotion",
    org: "Codingal Inc.",
    date: "Aug 2024",
    metric: "Top Mentor Recognition • Educator Leadership",
    desc: "Recognized for mentoring and supporting instructor growth initiatives.",
    img: "/certs/Teacher_Mentor.jpg",
    link: "/certs/Teacher_Mentor.pdf",
  },
  {
    title: "Subject Matter Expert (Python)",
    org: "Codingal Inc.",
    date: "Mar 2025",
    metric: "100+ Students Mentored • 80% Renewal Rate",
    desc: "Appreciated for expertise in Python curriculum design and mentorship.",
    img: "/certs/Python_SME.jpg",
    link: "/certs/Python_SME.pdf",
  },
];

export const SKILL_CERTIFICATES = [
  {
    title: "Full-Stack Web Development Bootcamp",
    platform: "Udemy",
    date: "March 2025",
    img: "/certs/GFG.jpg",
    desc: "Covered React, Node.js, Express, and MongoDB with 10+ real-world projects.",
    link: "https://www.udemy.com/certificate/UC-XXXXXX/",
  },
  {
    title: "System Design Masterclass",
    platform: "Udemy",
    date: "June 2025",
    img: "/certs/System_Design.jpg",
    desc: "Learned scalable backend design and distributed architecture principles.",
    link: "https://www.udemy.com/certificate/UC-XXXXXX/",
  },
  {
    title: "Python for Everybody",
    platform: "Coursera",
    date: "Jan 2024",
    img: "/certs/DS.jpg",
    desc: "Mastered Python fundamentals, APIs, and data processing.",
    link: "https://www.coursera.org/account/accomplishments/certificate/XXXXXX",
  },
  {
    title: "Oracle Cloud Infrastructure Foundations Associate",
    platform: "Oracle",
    date: "July 2025",
    img: "/certs/Oracle.jpg",
    desc: "Validated understanding of OCI architecture, compute, and networking.",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=XXXXXX",
  },
  {
    title: "Matlab",
    platform: "GeeksforGeeks",
    date: "March 2025",
    img: "/certs/Matlab.jpg",
    desc: "Hands-on experience in React, Express, and MongoDB with REST API deployment.",
    link: "https://www.geeksforgeeks.org/certificate/XXXXXX",
  },
  {
    title: "V-INN Expo",
    platform: "VIT-AP",
    date: "March 2025",
    img: "/certs/VINN (1).jpg",
    desc: "Hands-on experience in React, Express, and MongoDB with REST API deployment.",
    link: "https://www.geeksforgeeks.org/certificate/XXXXXX",
  },
];

// Certifications confirmed on LinkedIn without an accompanying badge image yet
export const ADDITIONAL_CERTIFICATIONS = [
  "Introduction to Generative AI",
  "Physical Design & Verification",
];

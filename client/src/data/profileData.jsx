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
} from "react-icons/si";

export const PROFILE = {
  name: "Subhadeep Ghorai",
  title:
    "MERN Stack Developer • System Design & IoT • Senior Coding Instructor (3000+ sessions, 4.7★)",
  location: "Kolkata, India",
  email: "subhadeepghorai23@gmail.com",
  phone: "+91 7029043892",
  github: "https://github.com/JACOBIAN01",
  linkedin: "https://www.linkedin.com/in/subhadeep-ghorai/",
  summary:
    "I build reliable, scalable web products end-to-end with React, Node.js, and Cloud. I love shipping polished UX, clean APIs, and mentoring devs.",
};

export const STACK = [
  { name: "React", icon: <FaReact className="text-2xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-2xl" /> },
  { name: "Express", icon: <SiExpress className="text-2xl" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-2xl" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-2xl" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-2xl" /> },
  { name: "Framer Motion", icon: <SiFramer className="text-2xl" /> },
  { name: "Firebase", icon: <SiFirebase className="text-2xl" /> },
  { name: "Vercel", icon: <SiVercel className="text-2xl" /> },
  { name: "AWS", icon: <FaAws className="text-2xl" /> },
  { name: "Git", icon: <SiGit className="text-2xl" /> },
  { name: "Redux", icon: <SiRedux className="text-2xl" /> },
  { name: "WebSockets", icon: <SiSocketdotio className="text-2xl" /> },
  { name: "SQL/DB", icon: <FaDatabase className="text-2xl" /> },
];

export const PROJECTS = [
  {
    name: "SmartReviewX — Project Review Automation",
    desc: "Automated evaluation pipeline; 3 min → 6–7 sec per review; modular OOP + real-time WebSockets; −25–30% recurring bugs.",
    tech: ["React", "Node.js", "WebSocket", "OOP"],
    repo: "https://github.com/JACOBIAN01/SmartReviewX",
  },
  {
    name: "LifeDrop — Blood Donation Platform",
    desc: "Realtime donors ↔ hospitals with RBAC dashboards, Firestore listeners, Twilio alerts, and Firebase Auth.",
    tech: ["React", "Tailwind", "Firebase", "Functions"],
    repo: "https://github.com/JACOBIAN01/LifeDrop",
    live: "https://life-drop-xi.vercel.app/",
  },
  {
    name: "AEVM — Advanced Electronic Voting Machine",
    desc: "IoT-enabled secure e-voting with biometric auth, instant cloud-synced results, and React dashboards.",
    tech: ["React", "IoT", "Cloud", "Security"],
  },
];

export const EXPERIENCE = [
  {
    role: "Senior Coding Instructor",
    org: "Codingal Inc.",
    period: "Dec 2023 – Present",
    bullets: [
      "Mentored 100+ students across 10+ countries; 3,000+ live sessions.",
      "4.7/5 avg rating and 80% renewal through personalized learning.",
    ],
  },
  {
    role: "Vice President",
    org: "BONGOJO (VIT-AP)",
    period: "Jan 2025 – Jun 2025",
    bullets: ["Led a 25-member team; organized 5+ events; +25% membership."],
  },
  {
    role: "Junior Relationship Officer",
    org: "Axis Bank",
    period: "Sep 2022 – Dec 2022",
    bullets: ["Client portfolio growth and tailored banking solutions."],
  },
];

export const CERTS = [
  {
    name: "Oracle Cloud Infrastructure Foundations Associate",
    org: "Oracle",
    date: "Jul 2025",
  },
  { name: "System Design Masterclass", org: "Udemy", date: "Jun 2025" },
  {
    name: "Full Stack Developer Bootcamp — GeeksforGeeks",
    org: "GeeksforGeeks",
    date: "Mar 2025",
  },
];

export const ACHIEVEMENTS = [
  "Smart India Hackathon — University Finalist",
  "Represented VIT-AP at Mark24 Hackathon",
  "Swami Vivekananda Merit-cum-Means Scholarship (2019)",
  "Published Author & Speaker",
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
    href: `tel:${PROFILE.phone.replace(/\\s/g, "")}`,
    icon: <FaPhoneAlt />,
  },
];

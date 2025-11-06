// src/components/Footer.jsx
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { PROFILE } from "../data/profileData";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white inline-flex items-center gap-2"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white inline-flex items-center gap-2"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hover:text-white inline-flex items-center gap-2"
          >
            <FaEnvelope /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}

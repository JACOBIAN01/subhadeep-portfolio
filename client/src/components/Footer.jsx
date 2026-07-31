// src/components/Footer.jsx
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { PROFILE } from "../data/profileData";

export default function Footer() {
  return (
    <footer className="bg-canvas-alt border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink transition-colors duration-300 inline-flex items-center gap-2"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink transition-colors duration-300 inline-flex items-center gap-2"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hover:text-ink transition-colors duration-300 inline-flex items-center gap-2"
          >
            <FaEnvelope /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}

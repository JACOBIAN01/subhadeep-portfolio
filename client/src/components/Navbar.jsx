// src/components/Navbar.js
import { PROFILE } from "../data/profileData";

export default function Navbar() {
  const links = [
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#stack", label: "Stack" },
    { href: "#certs", label: "Certificates" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="mb-4 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-3 flex items-center justify-between shadow-xl">
            <a href="#home" className="font-semibold tracking-tight">
              <span className="text-white/80">Subhadeep Ghorai</span>
            </a>

            <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-white">
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/15"
              >
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline rounded-xl bg-white text-black px-3 py-2 text-xs font-medium hover:opacity-90"
              >
                Connect
              </a>
          </div>
        </div>
      </div>
    </div>
  );
}

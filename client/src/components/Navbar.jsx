// src/components/Navbar.js
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "../data/profileData";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoCloudDownloadOutline, IoClose, IoMenu } from "react-icons/io5";

const EASE = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);

  const links = [
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#stack", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-full focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to main content
      </a>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        inert={open}
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-white/80 transition-shadow duration-500 ${
          scrolled ? "border-b border-hairline" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <a href="#home" className="text-[15px] font-medium text-ink tracking-tight">
            {PROFILE.name}
          </a>

          <nav className="hidden md:flex items-center gap-8 text-[13px] text-ink/70">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-ink transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a
              href="/resume.pdf"
              download="Subhadeep_Ghorai_SDE_Resume.pdf"
              className="flex items-center gap-1.5 text-[13px] text-ink/70 hover:text-ink transition-colors duration-300"
            >
              <IoCloudDownloadOutline className="text-[14px]" aria-hidden="true" />
              Resume
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="text-ink/70 hover:text-ink transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="text-[16px]" aria-hidden="true" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink text-white px-4 py-1.5 text-[13px] font-medium hover:bg-black transition-colors duration-300"
            >
              Connect
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-ink"
            aria-label="Open menu"
          >
            <IoMenu className="text-2xl" aria-hidden="true" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 h-14">
              <span className="text-[15px] font-medium text-ink">{PROFILE.name}</span>
              <button
                ref={closeButtonRef}
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-ink"
              >
                <IoClose className="text-2xl" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-8 h-[calc(100%-3.5rem)]">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: EASE }}
                  className="text-3xl font-semibold tracking-tight text-ink"
                >
                  {l.label}
                </motion.a>
              ))}

              <div className="flex items-center gap-6 mt-6 text-subtle">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub className="text-2xl" aria-hidden="true" />
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin className="text-2xl" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

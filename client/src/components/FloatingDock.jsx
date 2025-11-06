// src/components/FloatingDock.jsx
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronUp } from "react-icons/fa";
import { PROFILE } from "../data/profileData";

export default function FloatingDock() {
  const actions = [
    { href: PROFILE.github, icon: <FaGithub />, label: "GitHub" },
    { href: PROFILE.linkedin, icon: <FaLinkedin />, label: "LinkedIn" },
    { href: `mailto:${PROFILE.email}`, icon: <FaEnvelope />, label: "Email" },
  ];
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3">
      {actions.map((a) => (
        <a
          key={a.label}
          href={a.href}
          target="_blank"
          rel="noreferrer"
          className="group rounded-full border border-white/10 bg-white/10 backdrop-blur-xl p-3 shadow-xl hover:bg-white/20"
          title={a.label}
        >
          <span className="text-xl">{a.icon}</span>
        </a>
      ))}
      <ScrollTopButton />
    </div>
  );
}

function ScrollTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="rounded-full border border-white/10 bg-white text-black p-3 shadow-xl hover:opacity-90"
      title="Back to top"
    >
      <FaChevronUp />
    </button>
  );
}

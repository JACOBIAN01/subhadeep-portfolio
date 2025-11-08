// src/components/Navbar.js
import { PROFILE } from "../data/profileData";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoCloudDownloadOutline } from "react-icons/io5";

export default function Navbar() {
  const links = [
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#stack", label: "Stack" },
    { href: "#certs", label: "Certificates" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { y: -40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <motion.div
          className="mb-4 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-3 flex items-center justify-between shadow-xl"
          variants={containerVariants}
        >
          {/* Logo / Name */}
          <motion.a
            href="#"
            className="font-semibold tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white/80">Subhadeep Ghorai</span>
          </motion.a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.1, color: "#fff" }}
                whileTap={{ scale: 0.95 }}
              >
                {l.label}
              </motion.a>
            ))}
          </div>

          {/* Icons + Buttons */}
          <div className="flex items-center gap-3">
            {/* Resume Icon */}
            <motion.a
              href="/Subhadeep_Ghorai_SDE.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/20 bg-white/5 text-white/70 text-xs hover:text-blue-400 hover:border-blue-400 hover:bg-white/10 transition-all duration-300"
            >
              <IoCloudDownloadOutline className="text-[13px]" />
              Resume
            </motion.a>
            {/* GitHub Icon */}
            <motion.a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/15 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="text-white text-base" />
              <span className="text-white">GitHub</span>
            </motion.a>

            {/* LinkedIn Icon */}
            <motion.a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex  rounded-xl bg-white text-black px-3 py-2 text-xs font-medium hover:opacity-90 items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin className="text-blue-600 text-base" />
              <span>Connect</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

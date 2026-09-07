// src/components/Hero.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { PROFILE } from "../data/profileData";
import { IoArrowForward } from "react-icons/io5";
import Image from "../assets/self.jpeg";
const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-black text-white pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* -------- LEFT: intro + CTA -------- */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs tracking-wide text-white/70 mb-8"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to work
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
            >
              Building AI Agents on the MERN Stack
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="mt-6 text-xl md:text-2xl text-white/55 max-w-lg mx-auto md:mx-0 font-normal leading-relaxed"
            >
              Software Engineer @ Newton School of Technology · System Design Educator to 300+ Engineers
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center md:justify-start justify-center gap-6"
            >
              <a
                href="#projects"
                className="rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors duration-300"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-300"
              >
                Get in Touch
                <IoArrowForward
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </div>

          {/* -------- RIGHT: full, uncropped portrait -------- */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          >
            <div className="rounded-[28px] border border-white/10 bg-white/3 p-4 md:p-6 flex items-center justify-center">
              <img
                src={Image}
                alt={PROFILE.name}
                width={1280}
                height={1280}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto max-h-[520px] object-contain rounded-2xl"
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-white">{PROFILE.name}</p>
              <p className="text-sm text-white/50 mt-2 max-w-xl mx-auto leading-relaxed">
                {PROFILE.title}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

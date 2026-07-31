// src/components/Hero.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { PROFILE } from "../data/profileData";
import TechMarquee from "./TechMarquee";
import Image from "../assets/Hero2.jpg";

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-black text-white pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
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
          className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
        >
          MERN Stack Developer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-6 text-xl md:text-2xl text-white/55 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Building modern, scalable & intuitive web experiences.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        className="mx-auto max-w-3xl px-6 mt-16 md:mt-24"
      >
        <div className="relative aspect-4/3 md:aspect-video rounded-[28px] overflow-hidden border border-white/10">
          <img
            src={Image}
            alt={PROFILE.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-lg font-medium text-white">{PROFILE.name}</h2>
          <p className="text-sm text-white/50 mt-2 max-w-xl mx-auto leading-relaxed">
            {PROFILE.title}
          </p>
        </div>
      </motion.div>

      <TechMarquee />
    </section>
  );
}

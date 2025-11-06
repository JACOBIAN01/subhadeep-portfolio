// src/components/Hero.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { PROFILE, CONTACTS } from "../data/profileData";
import TechMarquee from "./TechMarquee";
import Image from "../assets/HeroImage.png"

export default function Hero() {
  return (
    <section id="home" className="top-0">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-linear-to-tr from-fuchsia-500/30 to-sky-400/30 blur-3xl" />
      <div className="pointer-events-none absolute top-0 -right-40 h-80 w-80 rounded-full bg-linear-to-tr from-amber-300/30 to-purple-400/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 pt-1 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="grid md:grid-cols-12 gap-8 items-center"
        >
          {/* -------- LEFT SIDE -------- */}
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 mb-4 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to Work
            </div>

            <h1 className="leading-tight">
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-sky-400">
                MERN Stack Developer
              </span>
              <span className=" text-3xl block font-normal text-white/60 mt-5">
                Building modern, scalable & intuitive web experiences.
              </span>
            </h1>
          </div>

          {/* -------- RIGHT SIDE -------- */}
          <div className="md:col-span-5">
            <GlassCard className="p-6 md:p-8">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-linear-to-br from-white/10 to-white/0 flex items-center justify-center">
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                  <div className="absolute -inset-6 bg-white/1 blur-2xl rounded-full" />
                  <img src={Image} />
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-xl text-white font-medium">
                  {PROFILE.name}
                </div>
                <div className="text-sm text-white/80">{PROFILE.title}</div>
                <div className="text-xs text-white/90 mt-1">
                  {PROFILE.location}
                </div>
              </div>
            </GlassCard>
          </div>


        </motion.div>
      </div>

      <TechMarquee />
    </section>
  );
}

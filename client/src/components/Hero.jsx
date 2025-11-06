// src/components/Hero.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { PROFILE, CONTACTS } from "../data/profileData";
import TechMarquee from "./TechMarquee";
import Image from "../assets/HeroV3.png";

export default function Hero() {
  return (
    <section id="home" className="top-0 pt-25">
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
          <div className="md:col-span-5">
            <div className="relative bg-black/80 rounded-2xl border border-white/10 p-6 md:p-8 shadow-lg overflow-hidden group transition-all duration-500 hover:border-white/20">
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700"></div>

              {/* Image Section */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                <img
                  src={Image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-xl grayscale-10 brightness-90 hover:brightness-100 transition-all duration-700 group-hover:scale-105"
                />
                {/* dark gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/60" />
              </div>

              {/* Profile Info */}
              <div className="mt-5 text-center">
                <h2 className="text-2xl font-semibold text-white">
                  {PROFILE.name}
                </h2>
                <p className="text-sm text-white/70 mt-1">{PROFILE.title}</p>
              </div>
            </div>
          </div>

          {/* -------- RIGHT SIDE -------- */}
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
        </motion.div>
      </div>

      <TechMarquee />
    </section>
  );
}

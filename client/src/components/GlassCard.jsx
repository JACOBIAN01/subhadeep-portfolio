// src/components/GlassCard.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      className={`relative rounded-2xl p-5 md:p-6 border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] ${className}`}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Subtle glossy layer */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 via-white/0 to-white/0" />
      {children}
    </motion.div>
  );
}

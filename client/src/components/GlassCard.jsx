// src/components/GlassCard.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      className={`rounded-[28px] border border-hairline bg-white p-6 md:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${className}`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";
import { CONTACTS } from "../data/profileData";

export default function Contact() {
  const [status, setStatus] = useState(""); // "", "pending", "success", "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("pending");

    // save form reference before await
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("https://formspree.io/f/xyzlgerw", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-14 relative">
      {/* Optional soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 pointer-events-none rounded-3xl blur-xl" />

      <SectionTitle kicker="Let’s Build" title="Contact" />

      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {/* Contact Form */}
        <GlassCard className="md:col-span-2 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl shadow-indigo-500/20">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white"
          >
            <input
              name="name"
              placeholder="Your Name"
              required
              className="rounded-xl bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="rounded-xl bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="company"
              placeholder="Company"
              className="rounded-xl bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="role"
              placeholder="Role"
              className="rounded-xl bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about the project..."
              required
              className="md:col-span-2 rounded-xl bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="md:col-span-2 rounded-xl bg-white/90 text-gray-900 font-medium px-4 py-2 text-sm border border-white/20 hover:bg-white transition-colors duration-200"
            >
              {status === "pending" ? "Sending..." : "Send Email"}
            </button>

            {status === "success" && (
              <div className="md:col-span-2 text-sm text-green-400">
                Message sent successfully!
              </div>
            )}
            {status === "error" && (
              <div className="md:col-span-2 text-sm text-rose-400">
                Oops — something went wrong. Try again later.
              </div>
            )}
          </form>
        </GlassCard>

        {/* Contact Links */}
        <div className="space-y-3">
          {CONTACTS.map((c) => (
            <GlassCard
              key={c.label}
              className="hover:shadow-lg hover:shadow-indigo-400/20 transition-all duration-200 bg-white/10 border border-white/20 backdrop-blur-xl"
            >
              <a
                className="flex items-center justify-between text-white hover:text-indigo-300"
                href={c.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg text-indigo-300">{c.icon}</span>
                  <div className="text-sm">{c.label}</div>
                </div>
                <FaExternalLinkAlt className="opacity-70" />
              </a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

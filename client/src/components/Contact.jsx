// src/components/Contact.jsx
import { FaExternalLinkAlt } from "react-icons/fa";
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";
import { PROFILE, CONTACTS } from "../data/profileData";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-14">
      <SectionTitle kicker="Let’s Build" title="Contact" />
      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const subject = encodeURIComponent(
                `Portfolio Contact from ${fd.get("name")}`
              );
              const body = encodeURIComponent(
                `${fd.get("message")}\n\n— ${fd.get("name")} | ${fd.get(
                  "email"
                )}`
              );
              window.open(
                `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
              );
            }}
          >
            <input
              name="name"
              placeholder="Your Name"
              required
              className="rounded-xl bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="rounded-xl bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <input
              name="company"
              placeholder="Company"
              className="rounded-xl bg-white/10 border border-white/10 px-3 py-2"
            />
            <input
              name="role"
              placeholder="Role"
              className="rounded-xl bg-white/10 border border-white/10 px-3 py-2"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about the project..."
              className="md:col-span-2 rounded-xl bg-white/10 border border-white/10 px-3 py-2"
            />
            <button
              type="submit"
              className="md:col-span-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Send Email
            </button>
          </form>
        </GlassCard>

        <div className="space-y-3">
          {CONTACTS.map((c) => (
            <GlassCard key={c.label}>
              <a
                className="flex items-center justify-between"
                href={c.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{c.icon}</span>
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

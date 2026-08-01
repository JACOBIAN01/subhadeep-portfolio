import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import SectionTitle from "./SectionTitle";
import { CONTACTS } from "../data/profileData";

const fieldClass =
  "rounded-xl bg-canvas-alt border-none px-4 py-3 text-ink placeholder-faint text-[15px] focus:outline-none focus:ring-2 focus:ring-accent transition-shadow duration-300";

export default function Contact() {
  const [status, setStatus] = useState(""); // "", "pending", "success", "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("pending");

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
    <section id="contact" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Let's Build" title="Contact" />

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input name="name" placeholder="Your Name" required className={fieldClass} />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className={fieldClass}
            />
            <input name="company" placeholder="Company" className={fieldClass} />
            <input name="role" placeholder="Role" className={fieldClass} />
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about the project..."
              required
              className={`md:col-span-2 ${fieldClass}`}
            />
            <button
              type="submit"
              className="md:col-span-2 rounded-full bg-ink text-white font-medium px-6 py-3 text-sm hover:bg-black transition-colors duration-300 justify-self-start"
            >
              {status === "pending" ? "Sending..." : "Send Email"}
            </button>

            {status === "success" && (
              <div className="md:col-span-2 text-sm text-emerald-600">
                Message sent successfully!
              </div>
            )}
            {status === "error" && (
              <div className="md:col-span-2 text-sm text-rose-500">
                Oops — something went wrong. Try again later.
              </div>
            )}
          </form>

          {/* Contact Links */}
          <div className="border-t md:border-t-0 md:border-l border-hairline pt-8 md:pt-0 md:pl-8 divide-y divide-hairline">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                className="group flex items-center justify-between py-4 first:pt-0 text-ink hover:text-accent transition-colors duration-300"
                href={c.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="text-base text-subtle group-hover:text-accent transition-colors duration-300"
                  >
                    {c.icon}
                  </span>
                  <div className="text-sm">{c.label}</div>
                </div>
                <FaExternalLinkAlt
                  aria-hidden="true"
                  className="text-xs opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

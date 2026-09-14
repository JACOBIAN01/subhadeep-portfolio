import { useEffect } from "react";

const VISITOR_COOKIE = "pf_visitor_id";
const ONE_YEAR = 60 * 60 * 24 * 365;
const SECTION_IDS = [
  "home",
  "stack",
  "about",
  "projects",
  "open-source",
  "experience",
  "education",
  "contact",
];

let cachedVisitorId = null;
const seenSections = new Set();
const clickedKinds = { resume: false, github: false, linkedin: false };

function getVisitorId() {
  if (cachedVisitorId) return cachedVisitorId;

  const existing = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${VISITOR_COOKIE}=`))
    ?.split("=")[1];
  if (existing) {
    cachedVisitorId = existing;
    return existing;
  }

  const id = crypto.randomUUID();
  document.cookie = `${VISITOR_COOKIE}=${id}; max-age=${ONE_YEAR}; path=/; SameSite=Lax`;
  cachedVisitorId = id;
  return id;
}

export function trackClick(kind) {
  if (window.location.pathname === "/admin") return;
  if (!(kind in clickedKinds)) return;

  clickedKinds[kind] = true;
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "click", kind }),
    keepalive: true,
  }).catch(() => {});
}

export default function useTrackVisit() {
  useEffect(() => {
    if (window.location.pathname === "/admin") return;

    const visitorId = getVisitorId();
    const path = window.location.pathname;
    const referrer = document.referrer;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, referrer, visitorId }),
      keepalive: true,
    }).catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) seenSections.add(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const start = Date.now();
    let sessionSent = false;
    const sendSession = () => {
      if (sessionSent) return;
      sessionSent = true;
      const duration = Math.round((Date.now() - start) / 1000);
      const payload = JSON.stringify({
        type: "session",
        visitorId,
        referrer,
        duration,
        sections: Array.from(seenSections),
        resumeDownloaded: clickedKinds.resume,
        githubClicked: clickedKinds.github,
        linkedinClicked: clickedKinds.linkedin,
      });
      navigator.sendBeacon?.("/api/track", new Blob([payload], { type: "application/json" }));
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendSession();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", sendSession);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", sendSession);
    };
  }, []);
}

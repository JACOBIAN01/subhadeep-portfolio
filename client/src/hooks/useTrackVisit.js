import { useEffect } from "react";

const VISITOR_COOKIE = "pf_visitor_id";
const ONE_YEAR = 60 * 60 * 24 * 365;

function getVisitorId() {
  const existing = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${VISITOR_COOKIE}=`))
    ?.split("=")[1];
  if (existing) return existing;

  const id = crypto.randomUUID();
  document.cookie = `${VISITOR_COOKIE}=${id}; max-age=${ONE_YEAR}; path=/; SameSite=Lax`;
  return id;
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

    const start = Date.now();
    const sendDuration = () => {
      const seconds = Math.round((Date.now() - start) / 1000);
      const payload = JSON.stringify({ duration: seconds });
      navigator.sendBeacon?.("/api/track", new Blob([payload], { type: "application/json" }));
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendDuration();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", sendDuration);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", sendDuration);
    };
  }, []);
}

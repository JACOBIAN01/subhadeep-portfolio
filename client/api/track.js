import { redis } from "./_redis.js";

const DURATION_BUCKETS = [
  { key: "quick", max: 10 },
  { key: "browsed", max: 60 },
  { key: "engaged", max: Infinity },
];

function bucketDuration(seconds) {
  return DURATION_BUCKETS.find((b) => seconds < b.max).key;
}

function bucketReferrer(referrer) {
  if (!referrer) return "Direct / Bookmark";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host.includes("google.")) return "Google Search";
    if (host.includes("bing.")) return "Bing Search";
    if (host.includes("duckduckgo.")) return "DuckDuckGo";
    if (host.includes("linkedin.")) return "LinkedIn";
    if (host.includes("twitter.") || host.includes("x.com")) return "Twitter / X";
    if (host.includes("github.")) return "GitHub";
    if (host.includes("facebook.")) return "Facebook";
    if (host.includes("instagram.")) return "Instagram";
    if (host.includes("reddit.")) return "Reddit";
    return host;
  } catch {
    return "Direct / Bookmark";
  }
}

function parseDevice(ua) {
  if (/iPad|Tablet/i.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "Phone";
  return "Computer";
}

function parseOS(ua) {
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Other";
}

function parseBrowser(ua) {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\/|Opera/i.test(ua)) return "Opera";
  if (/Firefox|FxiOS/i.test(ua)) return "Firefox";
  if (/Chrome|CriOS/i.test(ua)) return "Chrome";
  if (/Safari/i.test(ua)) return "Safari";
  return "Other";
}

const MAX_SESSIONS = 200;
const CLICK_KINDS = new Set(["resume", "github", "linkedin"]);

async function handlePageview(body, req) {
  const { path = "/", referrer = "", visitorId } = body;
  const ua = req.headers["user-agent"] || "";
  const country = req.headers["x-vercel-ip-country"] || "Unknown";
  const today = new Date().toISOString().slice(0, 10);

  await Promise.all([
    redis.incr("analytics:total"),
    redis.hincrby("analytics:days", today, 1),
    redis.hincrby("analytics:paths", path, 1),
    redis.hincrby("analytics:referrers", bucketReferrer(referrer), 1),
    redis.hincrby("analytics:countries", country, 1),
    redis.hincrby("analytics:devices", parseDevice(ua), 1),
    redis.hincrby("analytics:browsers", parseBrowser(ua), 1),
    redis.hincrby("analytics:os", parseOS(ua), 1),
  ]);

  if (visitorId) {
    const added = await redis.sadd("analytics:visitors", visitorId);
    await redis.incr(added ? "analytics:new" : "analytics:returning");
  }
}

async function handleClick(body) {
  const { kind } = body;
  if (!CLICK_KINDS.has(kind)) return;
  await redis.hincrby("analytics:clicks", kind, 1);
}

async function handleSession(body, req) {
  const {
    visitorId,
    referrer = "",
    duration = 0,
    sections = [],
    resumeDownloaded = false,
    githubClicked = false,
    linkedinClicked = false,
  } = body;

  const ua = req.headers["user-agent"] || "";
  const country = req.headers["x-vercel-ip-country"] || "Unknown";
  const seconds = Number.isFinite(duration) ? Math.max(0, Math.round(duration)) : 0;
  const durationBucket = bucketDuration(seconds);

  const record = {
    ts: Date.now(),
    visitorId: visitorId || null,
    country,
    device: parseDevice(ua),
    browser: parseBrowser(ua),
    os: parseOS(ua),
    referrerSource: bucketReferrer(referrer),
    sections: Array.isArray(sections) ? sections.slice(0, 20) : [],
    durationSeconds: seconds,
    durationBucket,
    resumeDownloaded: !!resumeDownloaded,
    githubClicked: !!githubClicked,
    linkedinClicked: !!linkedinClicked,
  };

  await Promise.all([
    redis.hincrby("analytics:durations", durationBucket, 1),
    redis.lpush("analytics:sessions", JSON.stringify(record)),
  ]);
  await redis.ltrim("analytics:sessions", 0, MAX_SESSIONS - 1);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch {
    body = {};
  }

  try {
    switch (body.type) {
      case "click":
        await handleClick(body);
        break;
      case "session":
        await handleSession(body, req);
        break;
      default:
        await handlePageview(body, req);
    }
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "tracking failed" });
  }
}

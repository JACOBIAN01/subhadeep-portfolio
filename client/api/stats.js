import { timingSafeEqual } from "node:crypto";
import { redis } from "./_redis.js";

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

// Best-effort per-instance throttle; serverless instances don't share memory,
// so this slows brute force but is not a hard limit.
const attempts = new Map();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

function tooManyAttempts(ip) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  const password = req.headers["x-admin-password"];
  const expected = process.env.ADMIN_PASSWORD;
  if (!password || !expected || !safeEqual(password, expected)) {
    if (tooManyAttempts(ip)) {
      res.status(429).json({ error: "too many attempts" });
      return;
    }
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  try {
    const [
      total,
      days,
      paths,
      referrers,
      countries,
      devices,
      browsers,
      os,
      durations,
      newVisitors,
      returningVisitors,
      uniqueVisitors,
      clicks,
      rawSessions,
    ] = await Promise.all([
      redis.get("analytics:total"),
      redis.hgetall("analytics:days"),
      redis.hgetall("analytics:paths"),
      redis.hgetall("analytics:referrers"),
      redis.hgetall("analytics:countries"),
      redis.hgetall("analytics:devices"),
      redis.hgetall("analytics:browsers"),
      redis.hgetall("analytics:os"),
      redis.hgetall("analytics:durations"),
      redis.get("analytics:new"),
      redis.get("analytics:returning"),
      redis.scard("analytics:visitors"),
      redis.hgetall("analytics:clicks"),
      redis.lrange("analytics:sessions", 0, 49),
    ]);

    const recentSessions = (rawSessions || [])
      .map((entry) => {
        try {
          return JSON.parse(entry);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    res.status(200).json({
      total: total || 0,
      days: days || {},
      paths: paths || {},
      referrers: referrers || {},
      countries: countries || {},
      devices: devices || {},
      browsers: browsers || {},
      os: os || {},
      durations: durations || {},
      newVisitors: newVisitors || 0,
      returningVisitors: returningVisitors || 0,
      uniqueVisitors: uniqueVisitors || 0,
      clicks: clicks || {},
      recentSessions,
    });
  } catch {
    res.status(500).json({ error: "failed to load stats" });
  }
}

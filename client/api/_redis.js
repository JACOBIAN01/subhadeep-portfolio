import Redis from "ioredis";

// The Vercel "Redis" marketplace integration (Redis Cloud, connected with the
// KV prefix) injects a single TCP connection string rather than a REST
// URL/token pair, so we use ioredis instead of @upstash/redis.
const url = process.env.KV_REDIS_URL || process.env.REDIS_URL || process.env.KV_URL;

export const redis = new Redis(url, { maxRetriesPerRequest: 1 });

import { Redis } from "@upstash/redis";

// Supports both the KV_REST_API_* names (older Vercel KV / migrated stores)
// and UPSTASH_REDIS_REST_* (Vercel's current Redis marketplace integration),
// since which pair gets injected depends on how the store was connected.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

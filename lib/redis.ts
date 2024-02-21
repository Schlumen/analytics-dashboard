import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://eu1-harmless-doe-39312.upstash.io",
  token: process.env.REDIS_KEY!,
});

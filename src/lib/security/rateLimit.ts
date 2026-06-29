import "server-only";
import { redis } from "@/lib/cache/redis";

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number; // epoch seconds
}

/**
 * Rate limiting par fenêtre fixe, basé sur Redis (INCR + EXPIRE).
 * Dégrade en "autorisé" si Redis est indisponible (fail-open contrôlé).
 */
export async function rateLimit(
  identifier: string,
  limit = 60,
  windowSec = 60,
): Promise<RateLimitResult> {
  const key = `rl:${identifier}`;
  try {
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, windowSec);
    const ttl = await redis.ttl(key);
    return {
      success: count <= limit,
      remaining: Math.max(0, limit - count),
      reset: Math.floor(Date.now() / 1000) + (ttl > 0 ? ttl : windowSec),
    };
  } catch {
    return { success: true, remaining: limit, reset: Math.floor(Date.now() / 1000) + windowSec };
  }
}

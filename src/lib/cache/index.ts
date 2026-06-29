import "server-only";
import { redis } from "./redis";

/** TTL (secondes) par type de donnée. */
export const TTL = {
  summoner: 120,
  ranks: 120,
  matchIds: 90,
  match: 60 * 60 * 24 * 7, // un match est immuable
  leaderboard: 300,
  tierlist: 60 * 30,
  ddragonVersion: 60 * 60 * 6,
  ddragonStatic: 60 * 60 * 24,
} as const;

export const cacheKey = {
  summoner: (region: string, riotId: string) => `sum:${region}:${riotId.toLowerCase()}`,
  ranks: (region: string, puuid: string) => `rank:${region}:${puuid}`,
  matchIds: (region: string, puuid: string, page: number) => `mids:${region}:${puuid}:${page}`,
  match: (matchId: string) => `match:${matchId}`,
  leaderboard: (region: string, queue: string, page: number) => `lb:${region}:${queue}:${page}`,
  tierlist: (role: string, tier: string, patch: string) => `tl:${role}:${tier}:${patch}`,
};

/**
 * Cache-aside resilient : si Redis tombe, on dégrade vers le loader
 * plutôt que de planter la requête.
 */
export async function cached<T>(key: string, ttl: number, loader: () => Promise<T>): Promise<T> {
  try {
    const hit = await redis.get(key);
    if (hit) return JSON.parse(hit) as T;
  } catch (err) {
    console.warn(`[cache] lecture échouée (${key}):`, err);
  }
  const data = await loader();
  try {
    await redis.set(key, JSON.stringify(data), "EX", ttl);
  } catch (err) {
    console.warn(`[cache] écriture échouée (${key}):`, err);
  }
  return data;
}

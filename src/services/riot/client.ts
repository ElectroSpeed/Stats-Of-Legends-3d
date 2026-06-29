import "server-only";
import { env } from "@/lib/env";
import { riotLimiter } from "./rateLimiter";

export class RiotApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "RiotApiError";
  }
}

/**
 * Appel HTTP server-only vers l'API Riot. La clé n'est JAMAIS exposée
 * au client. Backoff sur 429/5xx, respect du rate limiter applicatif.
 */
export async function riotFetch<T>(url: string, retries = 2): Promise<T> {
  await riotLimiter.acquire();
  const res = await fetch(url, {
    headers: { "X-Riot-Token": env.RIOT_API_KEY },
    next: { revalidate: 0 },
  });

  if (res.status === 429 || res.status >= 500) {
    if (retries > 0) {
      const retryAfter = Number(res.headers.get("Retry-After") ?? 1);
      await new Promise((r) => setTimeout(r, Math.min(5000, retryAfter * 1000)));
      return riotFetch<T>(url, retries - 1);
    }
  }

  if (!res.ok) {
    throw new RiotApiError(res.status, `Riot API ${res.status} sur ${url.split("?")[0]}`);
  }
  return (await res.json()) as T;
}

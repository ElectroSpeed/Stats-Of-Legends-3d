import "server-only";

/**
 * Limiteur applicatif côté serveur respectant les quotas Riot.
 * Dev key ≈ 20 req/s et 100 req/2min. File d'attente + token bucket.
 * En production, compléter avec la lecture des en-têtes X-Rate-Limit.
 */
class RiotRateLimiter {
  private queue: Array<() => void> = [];
  private shortTokens: number;
  private longTokens: number;

  constructor(
    private readonly perSecond = 18, // marge sous 20
    private readonly perTwoMin = 95, // marge sous 100
  ) {
    this.shortTokens = perSecond;
    this.longTokens = perTwoMin;
    setInterval(() => this.refill(this.perSecond, "short"), 1000);
    setInterval(() => this.refill(this.perTwoMin, "long"), 120_000);
  }

  private refill(max: number, bucket: "short" | "long") {
    if (bucket === "short") this.shortTokens = max;
    else this.longTokens = max;
    this.drain();
  }

  private drain() {
    while (this.shortTokens > 0 && this.longTokens > 0 && this.queue.length) {
      this.shortTokens--;
      this.longTokens--;
      this.queue.shift()?.();
    }
  }

  acquire(): Promise<void> {
    return new Promise((resolve) => {
      if (this.shortTokens > 0 && this.longTokens > 0) {
        this.shortTokens--;
        this.longTokens--;
        resolve();
      } else {
        this.queue.push(resolve);
      }
    });
  }
}

const globalForLimiter = globalThis as unknown as { riotLimiter?: RiotRateLimiter };
export const riotLimiter = globalForLimiter.riotLimiter ?? new RiotRateLimiter();
if (process.env.NODE_ENV !== "production") globalForLimiter.riotLimiter = riotLimiter;

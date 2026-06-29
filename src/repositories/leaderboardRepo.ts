import "server-only";
import { prisma } from "@/lib/db";
import { cached, cacheKey, TTL } from "@/lib/cache";
import { winRate } from "@/lib/format";
import type { Platform } from "@/lib/regions";
import type { LeaderboardEntry } from "@/types/domain";

const PAGE_SIZE = 50;

/**
 * Leaderboard servi depuis PostgreSQL (alimenté par un job d'agrégation).
 * Tri par rankValue desc — index dédié dans le schéma.
 */
export async function getLeaderboard(
  region: Platform,
  queue: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR",
  page = 0,
): Promise<LeaderboardEntry[]> {
  return cached(cacheKey.leaderboard(region, queue, page), TTL.leaderboard, async () => {
    const rows = await prisma.summonerRank.findMany({
      where: { queueType: queue, summoner: { region } },
      orderBy: { rankValue: "desc" },
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { summoner: { select: { gameName: true, tagLine: true } } },
    });

    return rows.map((r, i) => ({
      rank: page * PAGE_SIZE + i + 1,
      gameName: r.summoner.gameName,
      tagLine: r.summoner.tagLine,
      tier: r.tier,
      division: r.rank,
      leaguePoints: r.leaguePoints,
      wins: r.wins,
      losses: r.losses,
      winRate: winRate(r.wins, r.losses),
    }));
  });
}

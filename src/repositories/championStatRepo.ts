import "server-only";
import { prisma } from "@/lib/db";
import { cached, cacheKey, TTL } from "@/lib/cache";
import { buildChampionMap } from "@/services/ddragon/championMap";
import type { TierListEntry } from "@/types/domain";

function grade(winRate: number, pickRate: number): TierListEntry["tierGrade"] {
  const score = winRate + pickRate * 0.5;
  if (score >= 56) return "S";
  if (score >= 53) return "A";
  if (score >= 50) return "B";
  if (score >= 47) return "C";
  return "D";
}

export async function getTierList(
  role: string,
  tier: string,
  patch: string,
): Promise<TierListEntry[]> {
  return cached(cacheKey.tierlist(role, tier, patch), TTL.tierlist, async () => {
    const champMap = await buildChampionMap();
    const where = {
      patch,
      tier,
      ...(role !== "ALL" ? { role: role as "TOP" } : {}),
    };
    const rows = await prisma.championStat.findMany({ where, orderBy: { winRate: "desc" } });

    return rows.map((r) => ({
      championId: r.championId,
      championName: champMap[r.championId]?.name ?? r.championId,
      role: r.role,
      winRate: Math.round(r.winRate * 10) / 10,
      pickRate: Math.round(r.pickRate * 10) / 10,
      banRate: Math.round(r.banRate * 10) / 10,
      matches: r.matches,
      tierGrade: grade(r.winRate, r.pickRate),
    }));
  });
}

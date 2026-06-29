import "server-only";
import { prisma } from "@/lib/db";
import { cached, cacheKey, TTL } from "@/lib/cache";
import { getAccountByRiotId } from "@/services/riot/account-v1";
import { getSummonerByPuuid } from "@/services/riot/summoner-v4";
import { getLeagueEntriesByPuuid } from "@/services/riot/league-v4";
import { rankValue, winRate } from "@/lib/format";
import type { Platform } from "@/lib/regions";
import type { SummonerProfile } from "@/types/domain";

/**
 * Résout un profil complet : Redis -> upsert PostgreSQL -> API Riot.
 * Les écritures DB persistent le cache "chaud" et la popularité.
 */
export async function getSummonerProfile(
  region: Platform,
  gameName: string,
  tagLine: string,
): Promise<SummonerProfile> {
  const riotId = `${gameName}#${tagLine}`;
  return cached(cacheKey.summoner(region, riotId), TTL.summoner, async () => {
    const account = await getAccountByRiotId(region, gameName, tagLine);
    const [summoner, entries] = await Promise.all([
      getSummonerByPuuid(region, account.puuid),
      getLeagueEntriesByPuuid(region, account.puuid),
    ]);

    await prisma.summoner.upsert({
      where: { puuid: account.puuid },
      create: {
        puuid: account.puuid,
        gameName: account.gameName,
        tagLine: account.tagLine,
        region,
        profileIconId: summoner.profileIconId,
        summonerLevel: summoner.summonerLevel,
        revisionDate: BigInt(summoner.revisionDate),
        views: 1,
      },
      update: {
        gameName: account.gameName,
        tagLine: account.tagLine,
        profileIconId: summoner.profileIconId,
        summonerLevel: summoner.summonerLevel,
        revisionDate: BigInt(summoner.revisionDate),
        views: { increment: 1 },
      },
    });

    for (const e of entries) {
      await prisma.summonerRank.upsert({
        where: {
          summonerPuuid_queueType: {
            summonerPuuid: account.puuid,
            queueType: e.queueType as "RANKED_SOLO_5x5" | "RANKED_FLEX_SR",
          },
        },
        create: {
          summonerPuuid: account.puuid,
          queueType: e.queueType as "RANKED_SOLO_5x5" | "RANKED_FLEX_SR",
          tier: e.tier, rank: e.rank, leaguePoints: e.leaguePoints,
          wins: e.wins, losses: e.losses,
          rankValue: BigInt(rankValue(e.tier, e.rank, e.leaguePoints)),
        },
        update: {
          tier: e.tier, rank: e.rank, leaguePoints: e.leaguePoints,
          wins: e.wins, losses: e.losses,
          rankValue: BigInt(rankValue(e.tier, e.rank, e.leaguePoints)),
        },
      }).catch(() => undefined); // queue non-ranked ignorée
    }

    return {
      puuid: account.puuid,
      gameName: account.gameName,
      tagLine: account.tagLine,
      region,
      profileIconId: summoner.profileIconId,
      summonerLevel: summoner.summonerLevel,
      ranks: entries
        .filter((e) => e.queueType.startsWith("RANKED"))
        .map((e) => ({
          queueType: e.queueType,
          tier: e.tier,
          rank: e.rank,
          leaguePoints: e.leaguePoints,
          wins: e.wins,
          losses: e.losses,
          winRate: winRate(e.wins, e.losses),
        })),
    };
  });
}

import "server-only";
import { cached, cacheKey, TTL } from "@/lib/cache";
import { getMatchIdsByPuuid, getMatch } from "@/services/riot/match-v5";
import { computeLegendScore } from "@/lib/legendScore";
import { buildChampionMap } from "@/services/ddragon/championMap";
import type { Platform } from "@/lib/regions";
import type { MatchSummary } from "@/types/domain";
import type { MatchDTO, ParticipantDTO } from "@/types/riot";

const PAGE_SIZE = 10;

export async function getMatchHistory(
  region: Platform,
  puuid: string,
  page = 0,
): Promise<MatchSummary[]> {
  const ids = await cached(cacheKey.matchIds(region, puuid, page), TTL.matchIds, () =>
    getMatchIdsByPuuid(region, puuid, { start: page * PAGE_SIZE, count: PAGE_SIZE }),
  );

  const champMap = await buildChampionMap();

  const matches = await Promise.all(
    ids.map((id) =>
      cached(cacheKey.match(id), TTL.match, () => getMatch(region, id)).then((m) =>
        toSummary(m, puuid, champMap),
      ),
    ),
  );

  return matches.filter((m): m is MatchSummary => m !== null);
}

function toSummary(
  match: MatchDTO,
  puuid: string,
  champMap: Record<string, { name: string }>,
): MatchSummary | null {
  const p = match.info.participants.find((x) => x.puuid === puuid);
  if (!p) return null;

  const team = match.info.participants.filter((x) => x.teamId === p.teamId);
  const teamKills = team.reduce((s, x) => s + x.kills, 0);
  const teamDamage = team.reduce((s, x) => s + x.totalDamageDealtToChampions, 0);
  const cs = p.totalMinionsKilled + p.neutralMinionsKilled;

  const legendScore = computeLegendScore({
    kills: p.kills, deaths: p.deaths, assists: p.assists,
    teamKills, damageToChampions: p.totalDamageDealtToChampions, teamDamage,
    cs, visionScore: p.visionScore,
    gameDurationSec: match.info.gameDuration, win: p.win, role: p.teamPosition,
  });

  return {
    matchId: match.metadata.matchId,
    gameCreation: match.info.gameCreation,
    gameDuration: match.info.gameDuration,
    gameMode: match.info.gameMode,
    championId: p.championId,
    championName: champMap[String(p.championId)]?.name ?? p.championName,
    role: p.teamPosition,
    win: p.win,
    kills: p.kills, deaths: p.deaths, assists: p.assists,
    cs,
    csPerMin: Math.round((cs / Math.max(1, match.info.gameDuration / 60)) * 10) / 10,
    goldEarned: p.goldEarned,
    visionScore: p.visionScore,
    damageToChampions: p.totalDamageDealtToChampions,
    items: itemsOf(p),
    summonerSpells: [p.summoner1Id, p.summoner2Id],
    legendScore,
  };
}

function itemsOf(p: ParticipantDTO): number[] {
  return [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6].filter((i) => i > 0);
}

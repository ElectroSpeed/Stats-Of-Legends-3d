import "server-only";
import { riotFetch } from "./client";
import { clusterFor, type Platform } from "@/lib/regions";
import type { MatchDTO } from "@/types/riot";

export function getMatchIdsByPuuid(
  platform: Platform,
  puuid: string,
  { start = 0, count = 10 } = {},
) {
  const c = clusterFor(platform);
  return riotFetch<string[]>(
    `https://${c}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`,
  );
}

export function getMatch(platform: Platform, matchId: string) {
  const c = clusterFor(platform);
  return riotFetch<MatchDTO>(
    `https://${c}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
  );
}

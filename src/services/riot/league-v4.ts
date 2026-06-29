import "server-only";
import { riotFetch } from "./client";
import type { Platform } from "@/lib/regions";
import type { LeagueEntryDTO } from "@/types/riot";

export function getLeagueEntriesByPuuid(platform: Platform, puuid: string) {
  return riotFetch<LeagueEntryDTO[]>(
    `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
  );
}

/** Apex tiers pour le leaderboard. queue = RANKED_SOLO_5x5. */
export function getChallengerLeague(platform: Platform, queue: string) {
  return riotFetch<{ entries: LeagueEntryDTO[] }>(
    `https://${platform}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue}`,
  );
}

import "server-only";
import { riotFetch } from "./client";
import type { Platform } from "@/lib/regions";
import type { SummonerDTO } from "@/types/riot";

export function getSummonerByPuuid(platform: Platform, puuid: string) {
  return riotFetch<SummonerDTO>(
    `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
  );
}

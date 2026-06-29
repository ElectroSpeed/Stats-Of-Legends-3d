import "server-only";
import { riotFetch } from "./client";
import { clusterFor, type Platform } from "@/lib/regions";
import type { AccountDTO } from "@/types/riot";

export function getAccountByRiotId(platform: Platform, gameName: string, tagLine: string) {
  const c = clusterFor(platform);
  const url = `https://${c}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
    gameName,
  )}/${encodeURIComponent(tagLine)}`;
  return riotFetch<AccountDTO>(url);
}

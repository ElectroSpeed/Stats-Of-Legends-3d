"use client";
import { useQuery } from "@tanstack/react-query";
import { qk } from "./queryKeys";
import type { MatchSummary } from "@/types/domain";

async function fetchMatches(region: string, puuid: string, page: number): Promise<MatchSummary[]> {
  const res = await fetch(`/api/matches/${region}/${puuid}?page=${page}`);
  if (!res.ok) throw new Error("Échec du chargement des matchs");
  const json = await res.json();
  return json.data;
}

export function useMatches(region: string, puuid: string, page = 0) {
  return useQuery({
    queryKey: qk.matches(region, puuid, page),
    queryFn: () => fetchMatches(region, puuid, page),
  });
}

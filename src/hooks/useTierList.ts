"use client";
import { useQuery } from "@tanstack/react-query";
import { qk } from "./queryKeys";
import type { TierListEntry } from "@/types/domain";

async function fetchTierList(role: string, tier: string): Promise<TierListEntry[]> {
  const res = await fetch(`/api/champions/tierlist?role=${role}&tier=${tier}`);
  if (!res.ok) throw new Error("Échec du chargement de la tier list");
  const json = await res.json();
  return json.data;
}

export function useTierList(role: string, tier: string) {
  return useQuery({
    queryKey: qk.tierlist(role, tier),
    queryFn: () => fetchTierList(role, tier),
  });
}

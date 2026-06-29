import type { ChampionStats } from "@/types/builder";

// Agrégation additive des bonus d'items sur les stats du champion.
export function aggregateItemStats(items: Partial<ChampionStats>[]): Partial<ChampionStats> {
  return items.reduce<Partial<ChampionStats>>((acc, item) => {
    for (const key of Object.keys(item) as (keyof ChampionStats)[]) {
      acc[key] = (acc[key] ?? 0) + (item[key] ?? 0);
    }
    return acc;
  }, {});
}

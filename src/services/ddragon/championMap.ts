import { latestVersion, getChampions } from "./client";

// Index championId (numérique) -> { name, image }.
export async function buildChampionMap(): Promise<Record<string, { name: string; image: string }>> {
  const version = await latestVersion();
  const { data } = await getChampions(version);
  const map: Record<string, { name: string; image: string }> = {};
  for (const champ of Object.values(data)) {
    map[champ.key] = { name: champ.name, image: `${champ.id}.png` };
  }
  return map;
}

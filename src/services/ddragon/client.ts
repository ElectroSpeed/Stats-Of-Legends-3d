import { cached, TTL } from "@/lib/cache";

export { ddragonUrl } from "./urls";

const BASE = "https://ddragon.leagueoflegends.com";

export async function latestVersion(): Promise<string> {
  return cached("ddragon:version", TTL.ddragonVersion, async () => {
    const res = await fetch(`${BASE}/api/versions.json`);
    const versions = (await res.json()) as string[];
    return versions[0] ?? "14.24.1";
  });
}

async function ddragonJson<T>(version: string, file: string): Promise<T> {
  const res = await fetch(`${BASE}/cdn/${version}/data/fr_FR/${file}`);
  if (!res.ok) throw new Error(`Data Dragon ${res.status} (${file})`);
  return (await res.json()) as T;
}

export async function getChampions(version: string) {
  return cached(`ddragon:champs:${version}`, TTL.ddragonStatic, () =>
    ddragonJson<{ data: Record<string, DDragonChampion> }>(version, "champion.json"),
  );
}

export interface DDragonChampion {
  id: string;
  key: string;
  name: string;
  title: string;
  tags: string[];
}

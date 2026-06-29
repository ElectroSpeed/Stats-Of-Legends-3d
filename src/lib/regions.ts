export const PLATFORMS = [
  "euw1", "eun1", "na1", "kr", "br1", "jp1", "la1", "la2", "oc1", "tr1", "ru",
] as const;

export type Platform = (typeof PLATFORMS)[number];
export type Cluster = "europe" | "americas" | "asia" | "sea";

const PLATFORM_TO_CLUSTER: Record<Platform, Cluster> = {
  euw1: "europe", eun1: "europe", tr1: "europe", ru: "europe",
  na1: "americas", br1: "americas", la1: "americas", la2: "americas",
  kr: "asia", jp1: "asia",
  oc1: "sea",
};

export function isPlatform(value: string): value is Platform {
  return (PLATFORMS as readonly string[]).includes(value);
}

export function clusterFor(platform: Platform): Cluster {
  return PLATFORM_TO_CLUSTER[platform];
}

/** "Faker#KR1" -> { gameName: "Faker", tagLine: "KR1" }. */
export function parseRiotId(
  raw: string,
  fallbackTag = "EUW",
): { gameName: string; tagLine: string } {
  const decoded = decodeURIComponent(raw).trim();
  const [gameName, tagLine] = decoded.split("#");
  return { gameName: gameName ?? decoded, tagLine: (tagLine || fallbackTag).toUpperCase() };
}

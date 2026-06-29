export function kda(kills: number, deaths: number, assists: number): string {
  const ratio = (kills + assists) / Math.max(1, deaths);
  return deaths === 0 ? "Perfect" : ratio.toFixed(2);
}

export function winRate(wins: number, losses: number): number {
  const total = wins + losses;
  return total === 0 ? 0 : Math.round((wins / total) * 100);
}

export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  const units: [number, string][] = [
    [60, "s"], [60, "min"], [24, "h"], [7, "j"], [4.34, "sem"], [12, "mois"],
  ];
  let value = sec;
  let unit = "s";
  for (const [factor, label] of units) {
    if (value < factor) break;
    value = Math.floor(value / factor);
    unit = label;
  }
  return `il y a ${value} ${unit}`;
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Valeur monotone de rang pour tri (tier > division > LP). */
const TIER_ORDER = [
  "IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD",
  "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER",
];
const DIVISION_ORDER = ["IV", "III", "II", "I"];

export function rankValue(tier: string, rank: string, lp: number): number {
  const t = TIER_ORDER.indexOf(tier.toUpperCase());
  const d = DIVISION_ORDER.indexOf(rank.toUpperCase());
  return (t < 0 ? 0 : t) * 1_000_000 + (d < 0 ? 0 : d) * 100_000 + lp;
}

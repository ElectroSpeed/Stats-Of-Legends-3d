// Legend Score : note de performance 0-100 d'une partie, pondérée et bornée.
// Combine KDA, participation aux kills, dégâts, farm/min, vision et résultat.
// Volontairement déterministe et testable (voir legendScore.test.ts).

export interface PerformanceInput {
  kills: number;
  deaths: number;
  assists: number;
  teamKills: number;
  damageToChampions: number;
  teamDamage: number;
  cs: number;
  visionScore: number;
  gameDurationSec: number;
  win: boolean;
  role: string;
}

const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v));

export function computeLegendScore(p: PerformanceInput): number {
  const minutes = Math.max(1, p.gameDurationSec / 60);

  const kda = (p.kills + p.assists) / Math.max(1, p.deaths);
  const kdaScore = clamp((kda / 5) * 100); // KDA de 5 ≈ excellent

  const kp = p.teamKills > 0 ? (p.kills + p.assists) / p.teamKills : 0;
  const kpScore = clamp(kp * 100);

  const dmgShare = p.teamDamage > 0 ? p.damageToChampions / p.teamDamage : 0;
  const dmgScore = clamp(dmgShare * 300); // ~33% de part = top

  const csPerMin = p.cs / minutes;
  const csScore = clamp((csPerMin / 9) * 100); // 9 cs/min ≈ référence

  const visPerMin = p.visionScore / minutes;
  const visScore = clamp((visPerMin / 2) * 100); // 2 vision/min ≈ très bon

  // Pondérations selon le rôle (le support priorise vision/KP, l'ADC les dégâts).
  const isSupport = p.role.toUpperCase() === "SUPPORT" || p.role.toUpperCase() === "UTILITY";
  const weights = isSupport
    ? { kda: 0.2, kp: 0.3, dmg: 0.1, cs: 0.05, vis: 0.35 }
    : { kda: 0.3, kp: 0.2, dmg: 0.25, cs: 0.2, vis: 0.05 };

  const base =
    kdaScore * weights.kda +
    kpScore * weights.kp +
    dmgScore * weights.dmg +
    csScore * weights.cs +
    visScore * weights.vis;

  const result = base + (p.win ? 6 : -4); // léger bonus/malus de résultat
  return Math.round(clamp(result) * 10) / 10;
}

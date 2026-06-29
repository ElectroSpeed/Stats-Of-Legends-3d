// Croissance d'une stat de base du niveau 1 au niveau 18 (formule Riot).
export function statAtLevel(base: number, growth: number, level: number): number {
  const n = Math.min(Math.max(level, 1), 18);
  return base + growth * (n - 1) * (0.7025 + 0.0175 * (n - 1));
}

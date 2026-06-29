// Réduction de dégâts par l'armure / RM et gestion de la pénétration.

/** Multiplicateur de dégâts effectif pour une résistance donnée. */
export function resistMultiplier(resist: number): number {
  return resist >= 0 ? 100 / (100 + resist) : 2 - 100 / (100 - resist);
}

/**
 * Applique la pénétration dans l'ordre réglementaire :
 * réduction %, puis pénétration %, puis pénétration plate.
 */
export function effectiveResist(
  resist: number,
  { percentReduction = 0, percentPen = 0, flatPen = 0 } = {},
): number {
  let r = resist * (1 - percentReduction);
  r = r * (1 - percentPen);
  r = Math.max(0, r - flatPen);
  return r;
}

/** Dégâts finaux infligés à une cible. */
export function finalDamage(
  raw: number,
  targetResist: number,
  pen?: Parameters<typeof effectiveResist>[1],
): number {
  return raw * resistMultiplier(effectiveResist(targetResist, pen));
}

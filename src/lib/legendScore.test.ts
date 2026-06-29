import { describe, it, expect } from "vitest";
import { computeLegendScore } from "./legendScore";

const base = {
  teamKills: 40, teamDamage: 100_000, gameDurationSec: 1800, role: "MID",
};

describe("legendScore", () => {
  it("reste borné entre 0 et 100", () => {
    const s = computeLegendScore({
      ...base, kills: 20, deaths: 0, assists: 20,
      damageToChampions: 50_000, cs: 300, visionScore: 60, win: true,
    });
    expect(s).toBeGreaterThanOrEqual(0);
    expect(s).toBeLessThanOrEqual(100);
  });

  it("récompense une meilleure performance", () => {
    const good = computeLegendScore({
      ...base, kills: 12, deaths: 2, assists: 10,
      damageToChampions: 40_000, cs: 250, visionScore: 40, win: true,
    });
    const bad = computeLegendScore({
      ...base, kills: 1, deaths: 12, assists: 1,
      damageToChampions: 5_000, cs: 80, visionScore: 10, win: false,
    });
    expect(good).toBeGreaterThan(bad);
  });
});

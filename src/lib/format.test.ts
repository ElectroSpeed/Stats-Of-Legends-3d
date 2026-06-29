import { describe, it, expect } from "vitest";
import { kda, winRate, rankValue, formatDuration } from "./format";

describe("format", () => {
  it("calcule le KDA", () => {
    expect(kda(10, 0, 5)).toBe("Perfect");
    expect(kda(5, 5, 5)).toBe("2.00");
  });

  it("calcule le win rate", () => {
    expect(winRate(50, 50)).toBe(50);
    expect(winRate(0, 0)).toBe(0);
  });

  it("ordonne les rangs de façon monotone", () => {
    const chall = rankValue("CHALLENGER", "I", 500);
    const iron = rankValue("IRON", "IV", 0);
    const goldI = rankValue("GOLD", "I", 50);
    const goldIV = rankValue("GOLD", "IV", 50);
    expect(chall).toBeGreaterThan(iron);
    expect(goldI).toBeGreaterThan(goldIV);
  });

  it("formate la durée", () => {
    expect(formatDuration(125)).toBe("2:05");
  });
});

import { describe, it, expect } from "vitest";
import { clusterFor, isPlatform, parseRiotId } from "./regions";

describe("regions", () => {
  it("mappe les plateformes vers les bons clusters", () => {
    expect(clusterFor("euw1")).toBe("europe");
    expect(clusterFor("na1")).toBe("americas");
    expect(clusterFor("kr")).toBe("asia");
    expect(clusterFor("oc1")).toBe("sea");
  });

  it("valide les plateformes", () => {
    expect(isPlatform("euw1")).toBe(true);
    expect(isPlatform("zzz")).toBe(false);
  });

  it("parse un Riot ID", () => {
    expect(parseRiotId("Faker#KR1")).toEqual({ gameName: "Faker", tagLine: "KR1" });
    expect(parseRiotId("NoTag")).toEqual({ gameName: "NoTag", tagLine: "EUW" });
  });
});

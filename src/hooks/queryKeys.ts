export const qk = {
  matches: (region: string, puuid: string, page: number) =>
    ["matches", region, puuid, page] as const,
  leaderboard: (region: string, queue: string, page: number) =>
    ["leaderboard", region, queue, page] as const,
  tierlist: (role: string, tier: string) => ["tierlist", role, tier] as const,
};

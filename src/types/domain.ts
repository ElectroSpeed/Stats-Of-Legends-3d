// Modèles de domaine exposés au client (dérivés des DTO Riot, sans données brutes).

export interface RankInfo {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  winRate: number;
}

export interface SummonerProfile {
  puuid: string;
  gameName: string;
  tagLine: string;
  region: string;
  profileIconId: number;
  summonerLevel: number;
  ranks: RankInfo[];
}

export interface MatchSummary {
  matchId: string;
  gameCreation: number;
  gameDuration: number;
  gameMode: string;
  championId: number;
  championName: string;
  role: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  csPerMin: number;
  goldEarned: number;
  visionScore: number;
  damageToChampions: number;
  items: number[];
  summonerSpells: number[];
  legendScore: number;
}

export interface LeaderboardEntry {
  rank: number;
  gameName: string;
  tagLine: string;
  tier: string;
  division: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  winRate: number;
}

export interface TierListEntry {
  championId: string;
  championName: string;
  role: string;
  winRate: number;
  pickRate: number;
  banRate: number;
  matches: number;
  tierGrade: "S" | "A" | "B" | "C" | "D";
}

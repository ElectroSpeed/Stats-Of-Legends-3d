// Sous-ensembles typés des DTO Riot utilisés par l'application.

export interface AccountDTO {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface SummonerDTO {
  puuid: string;
  profileIconId: number;
  summonerLevel: number;
  revisionDate: number;
}

export interface LeagueEntryDTO {
  puuid: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  summonerName?: string;
}

export interface MatchDTO {
  metadata: { matchId: string; participants: string[] };
  info: MatchInfo;
}

export interface MatchInfo {
  gameCreation: number;
  gameDuration: number;
  gameMode: string;
  gameVersion: string;
  queueId: number;
  teams: { teamId: number; win: boolean }[];
  participants: ParticipantDTO[];
}

export interface ParticipantDTO {
  puuid: string;
  championId: number;
  championName: string;
  teamId: number;
  teamPosition: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  totalDamageDealtToChampions: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  goldEarned: number;
  visionScore: number;
  item0: number; item1: number; item2: number;
  item3: number; item4: number; item5: number; item6: number;
  summoner1Id: number;
  summoner2Id: number;
}

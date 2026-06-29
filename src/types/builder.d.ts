export interface ChampionStats {
  hp: number;
  armor: number;
  mr: number;
  ad: number;
  ap: number;
  attackSpeed: number;
}

export interface BuildState {
  championId: string | null;
  level: number;
  items: string[];
  runes: string[];
  setChampion: (id: string | null) => void;
  setLevel: (level: number) => void;
  setItems: (items: string[]) => void;
  setRunes: (runes: string[]) => void;
  reset: () => void;
}

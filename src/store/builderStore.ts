import { create } from "zustand";
import type { BuildState } from "@/types/builder";

// Source de vérité du builder. Les recalculs de stats dérivent de cet état.
export const useBuilderStore = create<BuildState>((set) => ({
  championId: null,
  level: 1,
  items: [],
  runes: [],
  setChampion: (championId) => set({ championId }),
  setLevel: (level) => set({ level: Math.min(Math.max(level, 1), 18) }),
  setItems: (items) => set({ items }),
  setRunes: (runes) => set({ runes }),
  reset: () => set({ championId: null, level: 1, items: [], runes: [] }),
}));

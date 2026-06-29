// Constructeurs d'URL Data Dragon — fonctions pures, sûres côté client.
const BASE = "https://ddragon.leagueoflegends.com";

export const ddragonUrl = {
  championSquare: (version: string, championImage: string) =>
    `${BASE}/cdn/${version}/img/champion/${championImage}`,
  profileIcon: (version: string, iconId: number) =>
    `${BASE}/cdn/${version}/img/profileicon/${iconId}.png`,
  item: (version: string, itemId: number) => `${BASE}/cdn/${version}/img/item/${itemId}.png`,
};

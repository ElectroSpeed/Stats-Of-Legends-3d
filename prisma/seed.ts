// Seed minimal (exécuter : npx prisma db seed).
// Insère quelques ChampionStat de démonstration pour la tier list.
// Non bloquant : en cas d'erreur sur une ligne, on log et on continue.
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const PATCH = "14.24";
const TIER = "ALL";

const demo = [
  { championId: "266", role: Role.TOP, winRate: 52.3, pickRate: 9.1, banRate: 4.2, matches: 12000 },
  { championId: "64", role: Role.JUNGLE, winRate: 50.8, pickRate: 11.4, banRate: 6.1, matches: 15000 },
  { championId: "103", role: Role.MID, winRate: 51.5, pickRate: 8.7, banRate: 3.3, matches: 9000 },
];

async function main() {
  for (const d of demo) {
    const data = {
      championId: d.championId,
      role: d.role,
      tier: TIER,
      patch: PATCH,
      matches: d.matches,
      wins: Math.round((d.winRate / 100) * d.matches),
      winRate: d.winRate,
      pickRate: d.pickRate,
      banRate: d.banRate,
    };

    try {
      await prisma.championStat.upsert({
        where: {
          championId_role_tier_patch: {
            championId: d.championId,
            role: d.role,
            tier: TIER,
            patch: PATCH,
          },
        },
        create: data,
        update: data,
      });
      console.log(`✓ ChampionStat ${d.championId} (${d.role})`);
    } catch (err) {
      console.warn(`✗ ChampionStat ${d.championId} ignoré:`, (err as Error).message);
    }
  }
  console.log("Seed terminé.");
}

main()
  .catch((e) => console.error("Seed échoué:", e))
  .finally(() => prisma.$disconnect());

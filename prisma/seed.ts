// Seed minimal (exécuter : npx prisma db seed).
// Insère quelques ChampionStat de démonstration pour la tier list.
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const patch = "14.24";
  const demo = [
    { championId: "266", role: Role.TOP, winRate: 52.3, pickRate: 9.1, banRate: 4.2, matches: 12000 },
    { championId: "64", role: Role.JUNGLE, winRate: 50.8, pickRate: 11.4, banRate: 6.1, matches: 15000 },
    { championId: "103", role: Role.MID, winRate: 51.5, pickRate: 8.7, banRate: 3.3, matches: 9000 },
  ];
  for (const d of demo) {
    await prisma.championStat.upsert({
      where: { championId_role_tier_patch: { championId: d.championId, role: d.role, tier: "ALL", patch } },
      create: { ...d, tier: "ALL", patch, wins: Math.round((d.winRate / 100) * d.matches) },
      update: { ...d },
    });
  }
  console.log("Seed terminé.");
}

main().finally(() => prisma.$disconnect());

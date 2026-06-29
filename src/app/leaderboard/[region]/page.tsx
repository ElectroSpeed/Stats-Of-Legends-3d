import { isPlatform } from "@/lib/regions";
import { notFound } from "next/navigation";
import { getLeaderboard } from "@/repositories/leaderboardRepo";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import styles from "./page.module.scss";

interface Props {
  params: Promise<{ region: string }>;
}

export default async function LeaderboardPage({ params }: Props) {
  const { region } = await params;
  if (!isPlatform(region)) notFound();

  const entries = await getLeaderboard(region, "RANKED_SOLO_5x5", 0);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Leaderboard — {region.toUpperCase()}</h1>
      <LeaderboardTable entries={entries} region={region} />
    </div>
  );
}

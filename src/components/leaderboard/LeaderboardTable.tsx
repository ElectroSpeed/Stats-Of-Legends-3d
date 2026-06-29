import Link from "next/link";
import { Badge } from "@/components/ui";
import type { LeaderboardEntry } from "@/types/domain";
import styles from "./LeaderboardTable.module.scss";

export function LeaderboardTable({
  entries,
  region,
}: {
  entries: LeaderboardEntry[];
  region: string;
}) {
  if (entries.length === 0) {
    return (
      <p className={styles.empty}>
        Aucune donnée de classement pour l&apos;instant. Le job d&apos;agrégation doit être exécuté.
      </p>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Invocateur</th>
          <th>Rang</th>
          <th>LP</th>
          <th>Win rate</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr key={`${e.gameName}-${e.tagLine}`}>
            <td className={styles.rank}>{e.rank}</td>
            <td>
              <Link href={`/summoner/${region}/${encodeURIComponent(`${e.gameName}#${e.tagLine}`)}`}>
                {e.gameName}
                <span className={styles.tag}>#{e.tagLine}</span>
              </Link>
            </td>
            <td>
              <Badge tone="gold">
                {e.tier} {e.division}
              </Badge>
            </td>
            <td>{e.leaguePoints}</td>
            <td>{e.winRate}% ({e.wins}V/{e.losses}D)</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

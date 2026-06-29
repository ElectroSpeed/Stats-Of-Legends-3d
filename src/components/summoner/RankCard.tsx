import { Card } from "@/components/ui";
import type { RankInfo } from "@/types/domain";
import styles from "./RankCard.module.scss";

const QUEUE_LABEL: Record<string, string> = {
  RANKED_SOLO_5x5: "Classé Solo/Duo",
  RANKED_FLEX_SR: "Classé Flexible",
};

export function RankCard({ rank }: { rank: RankInfo }) {
  return (
    <Card className={styles.card}>
      <p className={styles.queue}>{QUEUE_LABEL[rank.queueType] ?? rank.queueType}</p>
      <p className={styles.tier}>
        {rank.tier} {rank.rank} · {rank.leaguePoints} LP
      </p>
      <p className={styles.record}>
        {rank.wins}V {rank.losses}D
        <span className={styles.wr}> · {rank.winRate}% WR</span>
      </p>
    </Card>
  );
}

import Image from "next/image";
import clsx from "clsx";
import { Badge } from "@/components/ui";
import { kda, formatDuration, timeAgo } from "@/lib/format";
import { ddragonUrl } from "@/services/ddragon/urls";
import type { MatchSummary } from "@/types/domain";
import styles from "./MatchRow.module.scss";

export function MatchRow({ match, version }: { match: MatchSummary; version: string }) {
  return (
    <article className={clsx(styles.row, match.win ? styles.win : styles.loss)}>
      <div className={styles.result}>
        <Badge tone={match.win ? "win" : "loss"}>{match.win ? "Victoire" : "Défaite"}</Badge>
        <span className={styles.meta}>{formatDuration(match.gameDuration)}</span>
        <span className={styles.meta}>{timeAgo(new Date(match.gameCreation))}</span>
      </div>

      <div className={styles.champ}>
        <span className={styles.champName}>{match.championName}</span>
        <span className={styles.role}>{match.role}</span>
      </div>

      <div className={styles.kda}>
        <strong>
          {match.kills} / <span className={styles.deaths}>{match.deaths}</span> / {match.assists}
        </strong>
        <span className={styles.ratio}>{kda(match.kills, match.deaths, match.assists)} KDA</span>
      </div>

      <div className={styles.stats}>
        <span>{match.cs} CS ({match.csPerMin}/min)</span>
        <span>Vision {match.visionScore}</span>
      </div>

      <div className={styles.items}>
        {match.items.map((id, i) => (
          <Image
            key={`${id}-${i}`}
            src={ddragonUrl.item(version, id)}
            alt=""
            width={28}
            height={28}
            className={styles.item}
          />
        ))}
      </div>

      <div className={styles.score} title="Legend Score">
        <Badge tone="gold">{match.legendScore}</Badge>
      </div>
    </article>
  );
}

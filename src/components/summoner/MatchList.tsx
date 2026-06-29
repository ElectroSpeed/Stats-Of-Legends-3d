"use client";

import { useMatches } from "@/hooks/useMatches";
import { Spinner } from "@/components/ui";
import { MatchRow } from "./MatchRow";
import styles from "./MatchList.module.scss";

export function MatchList({
  region,
  puuid,
  version,
}: {
  region: string;
  puuid: string;
  version: string;
}) {
  const { data, isLoading, isError } = useMatches(region, puuid, 0);

  if (isLoading) return <Spinner label="Chargement des parties…" />;
  if (isError) return <p className={styles.error}>Impossible de charger l&apos;historique.</p>;
  if (!data || data.length === 0) return <p className={styles.empty}>Aucune partie récente.</p>;

  return (
    <section className={styles.list} aria-label="Historique des parties">
      {data.map((m) => (
        <MatchRow key={m.matchId} match={m} version={version} />
      ))}
    </section>
  );
}

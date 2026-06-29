"use client";

import { useState } from "react";
import clsx from "clsx";
import { useTierList } from "@/hooks/useTierList";
import { Spinner, Badge } from "@/components/ui";
import styles from "./TierList.module.scss";

const ROLES = ["ALL", "TOP", "JUNGLE", "MID", "ADC", "SUPPORT"] as const;

export function TierList() {
  const [role, setRole] = useState<(typeof ROLES)[number]>("ALL");
  const { data, isLoading, isError } = useTierList(role, "ALL");

  return (
    <div>
      <div className={styles.filters} role="tablist">
        {ROLES.map((r) => (
          <button
            key={r}
            className={clsx(styles.filter, role === r && styles.active)}
            onClick={() => setRole(r)}
            role="tab"
            aria-selected={role === r}
          >
            {r}
          </button>
        ))}
      </div>

      {isLoading && <Spinner label="Chargement de la tier list…" />}
      {isError && <p className={styles.error}>Impossible de charger la tier list.</p>}
      {data && data.length === 0 && (
        <p className={styles.empty}>
          Aucune statistique agrégée. Lance le job d&apos;agrégation des champions.
        </p>
      )}

      {data && data.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Champion</th>
              <th>Rôle</th>
              <th>Win</th>
              <th>Pick</th>
              <th>Ban</th>
              <th>Parties</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={`${c.championId}-${c.role}`}>
                <td>
                  <Badge tone="gold">{c.tierGrade}</Badge>
                </td>
                <td className={styles.name}>{c.championName}</td>
                <td>{c.role}</td>
                <td>{c.winRate}%</td>
                <td>{c.pickRate}%</td>
                <td>{c.banRate}%</td>
                <td>{c.matches.toLocaleString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

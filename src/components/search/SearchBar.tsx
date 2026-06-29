"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLATFORMS } from "@/lib/regions";
import styles from "./SearchBar.module.scss";

export function SearchBar() {
  const router = useRouter();
  const [region, setRegion] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_PLATFORM ?? "euw1",
  );
  const [riotId, setRiotId] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = riotId.trim();
    if (!value) return;
    router.push(`/summoner/${region}/${encodeURIComponent(value)}`);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} role="search">
      <select
        className={styles.region}
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        aria-label="Région"
      >
        {PLATFORMS.map((p) => (
          <option key={p} value={p}>
            {p.toUpperCase()}
          </option>
        ))}
      </select>
      <input
        className={styles.input}
        type="text"
        placeholder="Pseudo#TAG (ex. Faker#KR1)"
        value={riotId}
        onChange={(e) => setRiotId(e.target.value)}
        aria-label="Riot ID"
        maxLength={64}
      />
      <button className={styles.button} type="submit">
        Rechercher
      </button>
    </form>
  );
}

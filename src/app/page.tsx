import { SearchBar } from "@/components/search/SearchBar";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Stats <span>Of Legends</span>
      </h1>
      <p className={styles.subtitle}>
        Profils, historiques, leaderboards et tier list — toutes les stats League of Legends.
      </p>
      <SearchBar />
      <nav className={styles.quicklinks}>
        <a href="/leaderboard/euw1">Leaderboard EUW</a>
        <a href="/champions">Tier list des champions</a>
      </nav>
    </section>
  );
}

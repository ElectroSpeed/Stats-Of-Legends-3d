import Link from "next/link";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Stats<span>OfLegends</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/leaderboard/euw1">Leaderboard</Link>
          <Link href="/champions">Champions</Link>
        </nav>
      </div>
    </header>
  );
}

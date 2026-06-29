import { TierList } from "@/components/champions/TierList";
import styles from "./page.module.scss";

export const metadata = { title: "Tier list des champions" };

export default function ChampionsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Tier list des champions</h1>
      <TierList />
    </div>
  );
}

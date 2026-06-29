import Image from "next/image";
import type { SummonerProfile } from "@/types/domain";
import styles from "./ProfileHeader.module.scss";

export function ProfileHeader({
  profile,
  iconUrl,
}: {
  profile: SummonerProfile;
  iconUrl: string;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.iconWrap}>
        <Image src={iconUrl} alt="" width={96} height={96} className={styles.icon} />
        <span className={styles.level}>{profile.summonerLevel}</span>
      </div>
      <div className={styles.identity}>
        <h1 className={styles.name}>
          {profile.gameName}
          <span className={styles.tag}>#{profile.tagLine}</span>
        </h1>
        <p className={styles.region}>{profile.region.toUpperCase()}</p>
      </div>
    </header>
  );
}

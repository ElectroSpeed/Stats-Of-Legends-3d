import { notFound } from "next/navigation";
import { getSummonerProfile } from "@/repositories/summonerRepo";
import { isPlatform, parseRiotId } from "@/lib/regions";
import { latestVersion } from "@/services/ddragon/client";
import { ddragonUrl } from "@/services/ddragon/urls";
import { ProfileHeader } from "@/components/summoner/ProfileHeader";
import { RankCard } from "@/components/summoner/RankCard";
import { MatchList } from "@/components/summoner/MatchList";
import { RiotApiError } from "@/services/riot/client";
import styles from "./page.module.scss";

interface Props {
  params: Promise<{ region: string; riotId: string }>;
}

export default async function SummonerPage({ params }: Props) {
  const { region, riotId } = await params;
  if (!isPlatform(region)) notFound();

  const { gameName, tagLine } = parseRiotId(riotId);

  try {
    const [profile, version] = await Promise.all([
      getSummonerProfile(region, gameName, tagLine),
      latestVersion(),
    ]);

    return (
      <div className={styles.page}>
        <ProfileHeader
          profile={profile}
          iconUrl={ddragonUrl.profileIcon(version, profile.profileIconId)}
        />
        <section className={styles.ranks}>
          {profile.ranks.length === 0 ? (
            <p className={styles.unranked}>Non classé cette saison.</p>
          ) : (
            profile.ranks.map((r) => <RankCard key={r.queueType} rank={r} />)
          )}
        </section>
        <MatchList region={region} puuid={profile.puuid} version={version} />
      </div>
    );
  } catch (err) {
    if (err instanceof RiotApiError && err.status === 404) notFound();
    throw err;
  }
}

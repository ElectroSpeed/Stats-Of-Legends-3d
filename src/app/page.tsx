import { Radio, Bot, Hammer, ArrowRight } from "lucide-react";
import { HeroSearch } from "@/components/search/HeroSearch";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import styles from "./page.module.scss";

const STATS = [
  { to: 2_400_000, suffix: "+", label: "Invocateurs analysés" },
  { to: 180, suffix: " M", label: "Parties traitées" },
  { to: 168, suffix: "", label: "Champions suivis" },
  { to: 11, suffix: "", label: "Régions couvertes" },
];

const FEATURES = [
  { icon: Radio, title: "Temps réel", desc: "Profil, rang et historique récupérés en direct dès la fin de partie." },
  { icon: Bot, title: "Legend Score", desc: "Une note de performance claire, pondérée par rôle, sur chaque partie." },
  { icon: Hammer, title: "Builder & 3D", desc: "Theorycraft et visualisation 3D des champions — bientôt disponible." },
];

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className="eyebrow">Stats Of Legends — Season 2026</p>
          <h1 className={styles.title}>
            Maîtrisez <span className="grad-fire">votre jeu</span>.
          </h1>
          <p className="lede">
            Profils, historiques, classements et tier list — des analyses claires et rapides
            pour comprendre tes parties et grimper le ladder.
          </p>
          <div className={styles.search}>
            <HeroSearch />
          </div>
        </div>
      </section>

      <Reveal>
        <section className={styles.statStrip}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div className={styles.statValue}>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </section>
      </Reveal>

      <section className={styles.features}>
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.title} delay={i * 90}>
              <article className={`card card--interactive hover-lift ${styles.feature}`}>
                <div className={styles.featureIcon}>
                  <Icon size={26} color="#ff2d4e" />
                </div>
                <h2 className={styles.featureTitle}>{f.title}</h2>
                <p className={styles.featureDesc}>{f.desc}</p>
              </article>
            </Reveal>
          );
        })}
      </section>

      <Reveal>
        <section className={styles.cta}>
          <div className="banner banner--accent">
            <p className="banner__eyebrow eyebrow">Commence maintenant</p>
            <h2 className="banner__title">
              Cherche un invocateur, <span className="grad-fire">tout</span> est là.
            </h2>
            <p className="banner__text">
              Classements par région, tier list des champions et profils détaillés.
            </p>
            <div className="banner__actions">
              <a href="/leaderboard/euw1" className="btn btn--primary">
                Voir le classement <ArrowRight size={16} />
              </a>
              <a href="/champions" className="btn btn--outline">
                Tier list
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}

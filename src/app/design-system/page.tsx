import {
  Search, ArrowRight, Plus, Star, Trophy, Swords, Shield, Eye, Sword,
  TrendingUp, Filter, ChevronDown, Sparkles, Crosshair, Gem,
  Info, CheckCircle2, AlertTriangle, XCircle,
  Newspaper, Inbox, Play,
} from "lucide-react";
import { Carousel } from "@/components/blocks/Carousel";
import { Tabs } from "@/components/blocks/Tabs";
import { Accordion } from "@/components/blocks/Accordion";
import { PeekCarousel } from "@/components/blocks/PeekCarousel";
import { ScrollCarousel } from "@/components/blocks/ScrollCarousel";
import { Select } from "@/components/ui/Select";

export const metadata = { title: "Design System" };

const SLIDES = [
  { label: "Patch 14.24 — la nouvelle méta", bg: "linear-gradient(120deg,#2a0b12,#3a0f1a)" },
  { label: "Worlds 2026 — suivez vos joueurs", bg: "linear-gradient(120deg,#14140f,#23232a)" },
  { label: "Nouveau : Legend Score 2.0", bg: "linear-gradient(120deg,#1a0a0e,#2c1116)" },
];
const AD_SLIDES = [
  { label: "Publicité — 970×250", bg: "repeating-linear-gradient(45deg,#151517,#151517 16px,#1c1c20 16px,#1c1c20 32px)" },
  { label: "Sponsor — Marque A", bg: "linear-gradient(120deg,#1c1c20,#242429)" },
  { label: "Promo — Premium", bg: "linear-gradient(120deg,#2a0b12,#1c1c20)" },
];

const COLORS = [
  { name: "Fond", hex: "#0C0C0D" },
  { name: "Surface", hex: "#151517" },
  { name: "Surface 2", hex: "#1C1C20" },
  { name: "Bordure", hex: "#2E2E33" },
  { name: "Rouge T1", hex: "#E2012D" },
  { name: "Rouge foncé", hex: "#A80020" },
  { name: "Or T1", hex: "#C9A24E" },
  { name: "Or +", hex: "#E6C879" },
  { name: "Vert (victoire)", hex: "#2DC46A" },
  { name: "Texte", hex: "#F5F5F6" },
  { name: "Gris", hex: "#B7B7BC" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="sg-section">
      <p className="sg-section__title">{title}</p>
      {children}
    </section>
  );
}

const PEEK_SLIDES = [
  { label: "Tier list — Patch 14.24", bg: "linear-gradient(120deg,#2a0b12,#3a0f1a)" },
  { label: "Worlds 2026 — Highlights", bg: "linear-gradient(120deg,#14140f,#23232a)" },
  { label: "Builder 3D — Aperçu", bg: "linear-gradient(120deg,#1a0a0e,#2c1116)" },
  { label: "Champion de la semaine", bg: "linear-gradient(120deg,#241607,#2c1116)" },
];

export default function DesignSystemPage() {
  return (
    <div className="sg">
      <header>
        <h1 className="sg__title">Design System</h1>
        <p className="sg__sub">
          Bibliothèque de composants de Stats Of Legends — DA « T1 · Rouge &amp; Or » (fond noir),
          full Inter, contrastes conformes RGAA. Survole les éléments pour voir les états.
        </p>
      </header>

      {/* COULEURS */}
      <Section title="Palette">
        <div className="sg-grid sg-grid--sm">
          {COLORS.map((c) => (
            <div key={c.name}>
              <div className="sg-swatch__chip" style={{ background: c.hex }} />
              <p className="sg-swatch__name">{c.name}</p>
              <p className="sg-swatch__hex">{c.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TYPOGRAPHIE */}
      <Section title="Typographie — Inter">
        <div className="sg-stack">
          <p className="eyebrow">Eyebrow · label</p>
          <h1 className="display" style={{ margin: 0 }}>
            Display — Maîtrisez <span className="italic-accent">votre jeu</span>.
          </h1>
          <h2 style={{ fontSize: "2rem" }}>Titre H2 — Statistiques détaillées</h2>
          <h3 style={{ fontSize: "1.375rem" }}>Titre H3 — Historique des parties</h3>
          <p className="lede">
            Lede — Une lecture claire de vos performances : KDA, vision, dégâts et Legend Score.
          </p>
          <p style={{ color: "#f3eeec", maxWidth: "60ch" }}>
            Corps de texte standard en Inter. Lisible, neutre, parfait pour les tableaux denses et
            les descriptions. Texte secondaire en gris clair, liens et accents en rouge / or.
          </p>
        </div>
      </Section>

      {/* BOUTONS */}
      <Section title="Boutons — variantes, tailles & états">
        <p className="sg-cap">Variantes</p>
        <div className="sg-row">
          <button className="btn btn--primary">Primaire <ArrowRight size={16} /></button>
          <button className="btn btn--gold">Doré <Star size={15} /></button>
          <button className="btn btn--outline">Outline</button>
          <button className="btn btn--subtle">Subtle</button>
          <button className="btn btn--ghost">Ghost</button>
          <button className="btn btn--danger">Danger</button>
        </div>

        <p className="sg-cap" style={{ marginTop: "1.5rem" }}>Tailles</p>
        <div className="sg-row">
          <button className="btn btn--primary btn--sm">Small</button>
          <button className="btn btn--primary">Medium</button>
          <button className="btn btn--primary btn--lg">Large</button>
        </div>

        <p className="sg-cap" style={{ marginTop: "1.5rem" }}>Icônes & états</p>
        <div className="sg-row">
          <button className="btn btn--primary btn--icon" aria-label="Ajouter"><Plus size={18} /></button>
          <button className="btn btn--outline btn--icon" aria-label="Filtrer"><Filter size={18} /></button>
          <button className="btn btn--subtle btn--icon" aria-label="Favori"><Star size={18} /></button>
          <button className="btn btn--primary">Avec icône <Search size={16} /></button>
          <button className="btn btn--primary" disabled>Désactivé</button>
        </div>
      </Section>

      {/* BADGES / TIERS */}
      <Section title="Badges, tiers & rangs">
        <div className="sg-row">
          <span className="badge badge--accent">Accent</span>
          <span className="badge badge--win">Victoire</span>
          <span className="badge badge--loss">Défaite</span>
          <span className="badge badge--neutral">Neutre</span>
          <span className="badge badge--outline">Outline</span>
        </div>
        <p className="sg-cap" style={{ marginTop: "1.5rem" }}>
          Tier grades — spectre infra-rouge → ultra-violet (S+ → D-)
        </p>
        <div className="sg-row">
          {[
            ["S+", "s-plus"], ["S", "s"], ["S-", "s-minus"],
            ["A+", "a-plus"], ["A", "a"], ["A-", "a-minus"],
            ["B+", "b-plus"], ["B", "b"], ["B-", "b-minus"],
            ["C+", "c-plus"], ["C", "c"], ["C-", "c-minus"],
            ["D+", "d-plus"], ["D", "d"], ["D-", "d-minus"],
          ].map(([label, cls]) => (
            <span key={cls} className={`tier tier--${cls}`}>{label}</span>
          ))}
        </div>
        <p className="sg-cap" style={{ marginTop: "1.5rem" }}>Rangs</p>
        <div className="sg-row">
          <span className="rank-pill"><Trophy size={13} /> Challenger 1320 LP</span>
          <span className="rank-pill"><Gem size={13} /> Diamond II</span>
        </div>
      </Section>

      {/* CARTES */}
      <Section title="Cartes">
        <div className="sg-grid">
          <article className="card">
            <div className="card__head">
              <span className="card__title">Carte simple</span>
              <span className="badge badge--accent">Info</span>
            </div>
            <p className="card__body">Une carte de base : surface, bordure, rayon. Conteneur polyvalent.</p>
          </article>

          <article className="card card--interactive">
            <div className="card__head">
              <span className="card__title">Carte interactive</span>
              <ArrowRight size={16} />
            </div>
            <p className="card__body">Survole-moi : élévation, bordure accent et ombre.</p>
          </article>

          <article className="card">
            <p className="stat-card__label">Win rate</p>
            <p className="stat-card__value">58,4 %</p>
            <p className="stat-card__delta stat-card__delta--up"><TrendingUp size={14} /> +3,2 % cette semaine</p>
          </article>

          <article className="card champ-card">
            <div className="champ-card__img"><Swords size={34} /></div>
            <p className="champ-card__name">Ahri</p>
            <p className="champ-card__meta">Mid · 53,1 % WR</p>
          </article>
        </div>
      </Section>

      {/* TABLEAU */}
      <Section title="Tableau (classement)">
        <table className="data-table">
          <thead>
            <tr><th>#</th><th>Invocateur</th><th>Rang</th><th>LP</th><th>Win rate</th></tr>
          </thead>
          <tbody>
            {[
              { r: 1, n: "Agurin", t: "EUW", rank: "Challenger", lp: 1487, wr: 61 },
              { r: 2, n: "Caps", t: "EUW", rank: "Challenger", lp: 1402, wr: 58 },
              { r: 3, n: "Jankos", t: "EUW", rank: "Grandmaster", lp: 1190, wr: 55 },
              { r: 4, n: "Nemesis", t: "EUW", rank: "Grandmaster", lp: 1120, wr: 53 },
            ].map((row) => (
              <tr key={row.r}>
                <td className="data-table__rank">{row.r}</td>
                <td>{row.n}<span style={{ color: "#5d655f" }}> #{row.t}</span></td>
                <td><span className="rank-pill">{row.rank}</span></td>
                <td>{row.lp}</td>
                <td>{row.wr}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* LISTES / MATCH ROWS */}
      <Section title="Listes & match rows">
        <div className="sg-stack">
          <article className="match-row match-row--win">
            <div className="match-row__col">
              <span className="badge badge--win">Victoire</span>
              <span className="match-row__muted">Classé Solo · 28:14</span>
            </div>
            <div className="match-row__col"><strong>Ahri</strong><span className="match-row__muted">MID</span></div>
            <div className="match-row__col"><strong>9 / 2 / 11</strong><span className="match-row__muted">10.0 KDA</span></div>
            <div className="slot-grid">
              <span className="slot slot--filled"><Gem size={16} /></span>
              <span className="slot slot--filled"><Shield size={16} /></span>
              <span className="slot slot--filled"><Sword size={16} /></span>
            </div>
            <span className="badge badge--accent">87 LS</span>
          </article>

          <article className="match-row match-row--loss">
            <div className="match-row__col">
              <span className="badge badge--loss">Défaite</span>
              <span className="match-row__muted">Classé Solo · 34:02</span>
            </div>
            <div className="match-row__col"><strong>Lee Sin</strong><span className="match-row__muted">JUNGLE</span></div>
            <div className="match-row__col"><strong>3 / 7 / 5</strong><span className="match-row__muted">1.1 KDA</span></div>
            <div className="slot-grid">
              <span className="slot slot--filled"><Sword size={16} /></span>
              <span className="slot slot--filled"><Crosshair size={16} /></span>
            </div>
            <span className="badge badge--neutral">41 LS</span>
          </article>

          <div className="card" style={{ maxWidth: 360 }}>
            <p className="card__title" style={{ marginBottom: ".5rem" }}>Stat lines</p>
            <div className="stat-line"><span className="stat-line__label">Dégâts champions</span><span className="stat-line__value">24 380</span></div>
            <div className="stat-line"><span className="stat-line__label">CS / min</span><span className="stat-line__value">8,4</span></div>
            <div className="stat-line"><span className="stat-line__label">Score de vision</span><span className="stat-line__value">42</span></div>
          </div>
        </div>
      </Section>

      {/* SLOTS */}
      <Section title="Slots — items, runes & sorts">
        <p className="sg-cap">Inventaire (6 + trinket) — rempli & vide</p>
        <div className="slot-grid">
          <span className="slot slot--filled"><Gem size={18} /></span>
          <span className="slot slot--filled"><Sword size={18} /></span>
          <span className="slot slot--filled"><Shield size={18} /></span>
          <span className="slot slot--empty"><Plus size={16} /></span>
          <span className="slot slot--empty"><Plus size={16} /></span>
          <span className="slot slot--empty"><Plus size={16} /></span>
          <span className="slot slot--filled slot--trinket"><Eye size={18} /></span>
        </div>

        <p className="sg-cap" style={{ marginTop: "1.5rem" }}>Runes & sorts d&apos;invocateur</p>
        <div className="sg-row">
          <span className="slot slot--filled slot--lg"><Sparkles size={20} /></span>
          <span className="slot slot--filled"><Star size={16} /></span>
          <span className="slot slot--filled"><Star size={16} /></span>
          <span style={{ width: 16 }} />
          <span className="slot slot--filled"><Crosshair size={16} /></span>
          <span className="slot slot--filled"><Shield size={16} /></span>
        </div>
      </Section>

      {/* FORMS */}
      <Section title="Formulaires">
        <div className="sg-grid">
          <div className="field">
            <label className="field__label">Champ texte</label>
            <input className="input" placeholder="Pseudo#TAG" />
          </div>
          <div className="field">
            <label className="field__label">Select (menu custom)</label>
            <Select
              ariaLabel="Région"
              defaultValue="euw1"
              options={[
                { value: "euw1", label: "EUW" },
                { value: "na1", label: "NA" },
                { value: "kr", label: "KR" },
                { value: "br1", label: "BR" },
              ]}
            />
          </div>
          <div className="field">
            <label className="field__label">Toggle</label>
            <div className="sg-row">
              <span className="switch switch--on" role="switch" aria-checked="true" />
              <span className="switch" role="switch" aria-checked="false" />
            </div>
          </div>
        </div>
        <div className="field" style={{ marginTop: "1.5rem", maxWidth: 620 }}>
          <label className="field__label">Barre de recherche</label>
          <div className="search-pill">
            <Search size={18} color="#8a8a90" />
            <input placeholder="Nom d&apos;invocateur + tag — ex. Faker#KR1" />
            <button className="btn btn--primary" style={{ borderRadius: 999 }}>
              Rechercher <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Section>

      {/* CONTROLS */}
      <Section title="Segmented, chips & filtres">
        <p className="sg-cap">Segmented control (rôles)</p>
        <div className="segmented">
          <span className="segmented__item segmented__item--active">Tous</span>
          <span className="segmented__item">Top</span>
          <span className="segmented__item">Jungle</span>
          <span className="segmented__item">Mid</span>
          <span className="segmented__item">ADC</span>
          <span className="segmented__item">Support</span>
        </div>
        <p className="sg-cap" style={{ marginTop: "1.5rem" }}>Chips</p>
        <div className="sg-row">
          <span className="chip chip--active"><Filter size={14} /> Patch 14.24</span>
          <span className="chip">Émeraude+</span>
          <span className="chip">Diamant+</span>
          <span className="chip"><ChevronDown size={14} /> Plus</span>
        </div>
      </Section>

      {/* PROGRESS */}
      <Section title="Barres de progression & meters">
        <div className="sg-stack" style={{ maxWidth: 420 }}>
          <div>
            <div className="stat-line"><span className="stat-line__label">Win rate</span><span className="stat-line__value">58 %</span></div>
            <div className="meter"><div className="meter__fill" style={{ width: "58%" }} /></div>
          </div>
          <div>
            <div className="stat-line"><span className="stat-line__label">Maîtrise</span><span className="stat-line__value">82 %</span></div>
            <div className="meter"><div className="meter__fill" style={{ width: "82%" }} /></div>
          </div>
          <div>
            <div className="stat-line"><span className="stat-line__label">Taux de défaite</span><span className="stat-line__value">42 %</span></div>
            <div className="meter meter--danger"><div className="meter__fill" style={{ width: "42%" }} /></div>
          </div>
        </div>
      </Section>

      {/* AVATARS / TOOLTIP / KPI */}
      <Section title="Avatars, tooltips & KPI">
        <div className="sg-row" style={{ gap: "2.5rem" }}>
          <div className="avatar">
            <div className="avatar__img"><Swords size={26} /></div>
            <span className="avatar__level">312</span>
          </div>

          <div className="tooltip">
            <button className="btn btn--subtle">Survole-moi <Eye size={15} /></button>
            <span className="tooltip__bubble">Legend Score normalisé sur 100</span>
          </div>

          <div className="card" style={{ display: "flex", gap: "2.5rem" }}>
            <div className="kpi"><span className="kpi__value" style={{ color: "#e6c879"}}>10.0</span><span className="kpi__label">KDA</span></div>
            <div className="kpi"><span className="kpi__value">8,4</span><span className="kpi__label">CS/min</span></div>
            <div className="kpi"><span className="kpi__value">42</span><span className="kpi__label">Vision</span></div>
            <div className="kpi"><span className="kpi__value" style={{ color: "#e6c879"}}>87</span><span className="kpi__label">Legend</span></div>
          </div>
        </div>
      </Section>

      {/* BANNERS */}
      <Section title="Banners (promo)">
        <div className="sg-stack">
          <div className="banner">
            <p className="banner__eyebrow eyebrow">Premium</p>
            <h2 className="banner__title">Passe en illimité, sans publicité.</h2>
            <p className="banner__text">Historique complet, comparaisons avancées et Legend Score détaillé.</p>
            <div className="banner__actions">
              <button className="btn btn--primary">Découvrir <ArrowRight size={16} /></button>
              <button className="btn btn--ghost">Plus tard</button>
            </div>
          </div>
          <div className="banner banner--accent">
            <p className="banner__eyebrow eyebrow">Événement</p>
            <h2 className="banner__title">Worlds 2026 — suis tes joueurs en direct.</h2>
            <p className="banner__text">Scores live, brackets et stats des pros, mis à jour en continu.</p>
            <div className="banner__actions">
              <button className="btn btn--primary">Voir le live <Play size={15} /></button>
            </div>
          </div>
        </div>
      </Section>

      {/* CAROUSEL */}
      <Section title="Carrousel (multi-images) — scrollable souris">
        <ScrollCarousel step={440}>
          {SLIDES.map((s, k) => (
            <div key={k} className="peek__card" style={{ width: 560, height: 240, background: s.bg }}>
              <span className="peek__caption">{s.label}</span>
            </div>
          ))}
        </ScrollCarousel>
      </Section>

      {/* PUBLICITÉ */}
      <Section title="Publicité — emplacements & bannière multi-images">
        <p className="sg-cap">Bannière publicitaire (scrollable souris)</p>
        <ScrollCarousel step={440}>
          {AD_SLIDES.map((s, k) => (
            <div key={k} className="peek__card" style={{ width: 560, height: 200, background: s.bg }}>
              <span className="peek__caption">{s.label}</span>
            </div>
          ))}
        </ScrollCarousel>

        <p className="sg-cap" style={{ marginTop: "2rem" }}>Formats standard</p>
        <div className="sg-stack">
          <div className="ad ad--billboard"><span className="ad__tag">Publicité</span>Billboard 970×250</div>
          <div className="ad ad--leaderboard"><span className="ad__tag">Publicité</span>Leaderboard 728×90</div>
          <div className="ad-strip">
            <div className="ad ad--mpu"><span className="ad__tag">Pub</span>Pavé 300×250</div>
            <div className="ad ad--mpu"><span className="ad__tag">Pub</span>Pavé 300×250</div>
            <div className="ad ad--sky"><span className="ad__tag">Pub</span>Skyscraper 160×600</div>
          </div>
        </div>
      </Section>

      {/* SPONSORS */}
      <Section title="Sponsors (scrollable souris)">
        <ScrollCarousel step={220}>
          {["Sponsor A","Sponsor B","Sponsor C","Sponsor D","Sponsor E","Sponsor F","Sponsor G","Sponsor H"].map((s,k)=>(
            <span className="sponsor" key={k}>{s}</span>
          ))}
        </ScrollCarousel>
      </Section>

      {/* TICKER */}
      <Section title="Ticker scores (scrollable souris)">
        <ScrollCarousel step={240}>
          {["T1 2 — 1 GENG","KT 0 — 2 DK","FNC 1 — 1 G2","C9 2 — 0 TL","DK 1 — 2 HLE","GEN 2 — 0 BRO"].map((m,k)=>(
            <span className="ticker__item" key={k} style={{ whiteSpace: "nowrap" }}><span className="ticker__live">● LIVE</span> {m}</span>
          ))}
        </ScrollCarousel>
      </Section>

      {/* ONGLETS */}
      <Section title="Onglets">
        <Tabs tabs={[
          { label: "Aperçu", content: "Vue d'ensemble du profil : rang, win rate, champions favoris." },
          { label: "Champions", content: "Statistiques par champion : parties, KDA, win rate." },
          { label: "Historique", content: "Les dernières parties avec détails et Legend Score." },
          { label: "Maîtrises", content: "Niveaux de maîtrise et points par champion." },
        ]} />
      </Section>

      {/* ACCORDÉON / FAQ */}
      <Section title="Accordéon (FAQ)">
        <Accordion items={[
          { q: "Comment est calculé le Legend Score ?", a: "Une note 0–100 pondérée selon le rôle (KDA, participation, dégâts, farm, vision) bornée et déterministe." },
          { q: "Les données sont-elles en temps réel ?", a: "Le profil et l'historique sont récupérés en direct via l'API Riot, avec un cache court pour la performance." },
          { q: "Quelles régions sont supportées ?", a: "EUW, EUNE, NA, KR, BR, JP, et plus — sélectionnables dans la recherche." },
        ]} />
      </Section>

      {/* SPOTLIGHT */}
      <Section title="Spotlight (mise en avant)">
        <div className="spotlight">
          <div>
            <p className="eyebrow">Champion de la semaine</p>
            <h2 className="spotlight__title">Ahri grimpe à 53,1 % de win rate en Mid.</h2>
            <p className="lede" style={{ marginTop: ".5rem" }}>Build, runes et matchups recommandés pour le patch actuel.</p>
            <div className="banner__actions"><button className="btn btn--primary">Voir le build <ArrowRight size={16} /></button></div>
          </div>
          <div className="spotlight__media"><Swords size={40} /></div>
        </div>
      </Section>

      {/* NEWS */}
      <Section title="News / articles">
        <div className="news-grid">
          {[
            { tag: "Patch", title: "14.24 : ce qui change pour la jungle", meta: "il y a 2 h" },
            { tag: "Esport", title: "T1 qualifié pour la finale", meta: "il y a 5 h" },
            { tag: "Guide", title: "Monter en Diamant : 5 conseils", meta: "hier" },
          ].map((n,k)=>(
            <article className="news-card" key={k}>
              <div className="news-card__media"><Newspaper size={28} /></div>
              <div className="news-card__body">
                <span className="news-card__tag">{n.tag}</span>
                <p className="news-card__title">{n.title}</p>
                <p className="news-card__meta">{n.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ALERTES */}
      <Section title="Alertes / notices">
        <div className="sg-stack">
          <div className="alert alert--info"><Info size={18} className="alert__icon" /><span>Astuce : ajoute un tag (ex. Faker#KR1) pour une recherche précise.</span></div>
          <div className="alert alert--success"><CheckCircle2 size={18} className="alert__icon" /><span>Profil mis à jour avec succès.</span></div>
          <div className="alert alert--warn"><AlertTriangle size={18} className="alert__icon" /><span>Quota API proche de la limite, certaines données peuvent être en cache.</span></div>
          <div className="alert alert--error"><XCircle size={18} className="alert__icon" /><span>Invocateur introuvable. Vérifie la région et le Riot ID.</span></div>
        </div>
      </Section>

      {/* SKELETONS */}
      <Section title="Skeletons (chargement)">
        <div className="card" style={{ maxWidth: 520 }}>
          <div className="sg-row" style={{ gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
            <div className="skeleton skeleton--circle" />
            <div style={{ flex: 1 }}>
              <div className="skeleton skeleton--title" />
              <div className="skeleton skeleton--line" style={{ width: "40%" }} />
            </div>
          </div>
          <div className="skeleton skeleton--block" />
        </div>
      </Section>

      {/* NAV : pagination / breadcrumb / steps */}
      <Section title="Pagination, fil d'Ariane & étapes">
        <p className="sg-cap">Fil d'Ariane</p>
        <nav className="breadcrumb">
          <a href="#">Accueil</a><span className="breadcrumb__sep">/</span>
          <a href="#">EUW</a><span className="breadcrumb__sep">/</span>
          <span>Faker</span>
        </nav>

        <p className="sg-cap" style={{ marginTop: "1.5rem" }}>Pagination</p>
        <div className="pagination">
          <span className="pagination__item">‹</span>
          <span className="pagination__item pagination__item--active">1</span>
          <span className="pagination__item">2</span>
          <span className="pagination__item">3</span>
          <span className="pagination__item">…</span>
          <span className="pagination__item">12</span>
          <span className="pagination__item">›</span>
        </div>

        <p className="sg-cap" style={{ marginTop: "1.5rem" }}>Étapes</p>
        <div className="steps">
          <span className="step step--active"><span className="step__num">1</span> Région</span>
          <span className="step__line" />
          <span className="step step--active"><span className="step__num">2</span> Recherche</span>
          <span className="step__line" />
          <span className="step"><span className="step__num">3</span> Profil</span>
        </div>
      </Section>

      {/* EMPTY STATE */}
      <Section title="État vide">
        <div className="empty-state">
          <div className="empty-state__icon"><Inbox size={36} /></div>
          <p className="empty-state__title">Aucune partie récente</p>
          <p>Joue une partie classée pour voir apparaître ton historique ici.</p>
          <div className="banner__actions" style={{ justifyContent: "center" }}>
            <button className="btn btn--subtle" style={{ marginTop: "1rem" }}>Rafraîchir</button>
          </div>
        </div>
      </Section>
      {/* PEEK CAROUSEL */}
      <Section title="Carrousel central (aperçu des slides latéraux)">
        <PeekCarousel slides={PEEK_SLIDES} />
      </Section>

      {/* RINGS */}
      <Section title="Cercles de progression">
        <div className="ring-row">
          <div className="ring-item">
            <div className="ring" style={{ ["--p"]: 58 } as React.CSSProperties}><span className="ring__val">58%</span></div>
            <span className="ring__label">Win rate</span>
          </div>
          <div className="ring-item">
            <div className="ring ring--gold" style={{ ["--p"]: 82 } as React.CSSProperties}><span className="ring__val">82%</span></div>
            <span className="ring__label">Maîtrise</span>
          </div>
          <div className="ring-item">
            <div className="ring ring--win" style={{ ["--p"]: 67 } as React.CSSProperties}><span className="ring__val">67</span></div>
            <span className="ring__label">Legend score</span>
          </div>
        </div>
      </Section>

      {/* COMPARAISON */}
      <Section title="Comparaison (versus)">
        <div className="cmp" style={{ maxWidth: 560 }}>
          <div className="cmp__head"><span className="a">Faker</span><span className="b">Chovy</span></div>
          {([
            ["KDA", "4.8", "6.1", 44, 56],
            ["CS/min", "8.9", "9.4", 49, 51],
            ["Dégâts", "31k", "27k", 53, 47],
            ["Vision", "38", "52", 42, 58],
          ] as [string, string, string, number, number][]).map(([label, a, b, fa, fb]) => (
            <div key={label}>
              <div className="cmp__label">{label}</div>
              <div className="cmp__row">
                <span className="cmp__num a">{a}</span>
                <span className="cmp__bar">
                  <span className="cmp__fill-a" style={{ flex: fa }} />
                  <span className="cmp__fill-b" style={{ flex: fb }} />
                </span>
                <span className="cmp__num">{b}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
      {/* SCROLL CAROUSEL (souris / drag) */}
      <Section title="Carrousel scrollable (drag souris + molette)">
        <p className="sg-cap">Glisse à la souris, utilise la molette, ou les flèches — défilement libre, non infini.</p>
        <ScrollCarousel step={300}>
          {Array.from({ length: 9 }).map((_, k) => (
            <article key={k} className="card" style={{ width: 240 }}>
              <div className="champ-card__img" style={{ width: "100%", height: 120, borderRadius: 10 }}>
                <Swords size={30} />
              </div>
              <p className="card__title" style={{ marginTop: ".75rem" }}>Élément {k + 1}</p>
              <p className="card__body">Carte scrollable — parcours à la souris.</p>
            </article>
          ))}
        </ScrollCarousel>
      </Section>

      {/* BANNIÈRE MULTI-ÉLÉMENTS SCROLLABLE */}
      <Section title="Bannière multi-éléments (scrollable)">
        <ScrollCarousel step={340}>
          {["970×250", "728×90", "300×250", "300×250", "320×100", "300×600"].map((fmt, k) => (
            <div key={k} className="ad" style={{ width: 320, height: 130 }}>
              <span className="ad__tag">Publicité</span>
              {fmt}
            </div>
          ))}
        </ScrollCarousel>
      </Section>

      {/* CARROUSEL NON-INFINI */}
      <Section title="Carrousel non-infini (flèches bloquées aux extrémités)">
        <Carousel slides={SLIDES} auto={false} loop={false} />
      </Section>
    </div>
  );
}

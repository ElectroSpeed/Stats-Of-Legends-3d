import Link from "next/link";
import { Github, Twitter, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <p className="site-footer__wordmark">
          Stats <em>of</em> Legends
        </p>
        <div className="site-footer__nav">
          <div className="site-footer__links">
            <Link href="/">Accueil</Link>
            <Link href="/leaderboard/euw1">Classement</Link>
            <Link href="/champions">Tier List</Link>
            <a href="https://developer.riotgames.com">Riot API</a>
          </div>
          <div className="site-footer__socials">
            <a href="https://github.com/ElectroSpeed" aria-label="GitHub"><Github size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" aria-label="Site"><Globe size={18} /></a>
          </div>
        </div>
      </div>
      <div className="rule" />
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Stats Of Legends</span>
        <span>Non affilié à Riot Games · League of Legends © Riot Games, Inc.</span>
      </div>
    </footer>
  );
}

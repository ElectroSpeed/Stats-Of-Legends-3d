"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swords } from "lucide-react";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/leaderboard/euw1", label: "Classement" },
  { href: "/champions", label: "Tier List" },
  { href: "/builder", label: "Theorycraft" },
  { href: "/map", label: "Carte de Runeterra" },
  { href: "/news", label: "Actualités" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    const baseSegment = `/${href.split("/")[1]}`;

    return pathname === baseSegment || pathname.startsWith(`${baseSegment}/`);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo">
          <Swords className="site-header__emblem" size={20} aria-hidden />
          Stats <em>of</em> Legends
        </Link>
        <nav className="site-header__nav">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`site-header__link ${isActive(href) ? "site-header__link--active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        {/* Placeholder à remplacer par la région dynamique */}
        <span className="site-header__region">EUW</span>
      </div>
    </header>
  );
}

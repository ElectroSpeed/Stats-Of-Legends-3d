"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swords } from "lucide-react";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/leaderboard/euw1", label: "Classement" },
  { href: "/champions", label: "Tier List" },
  { href: "/design", label: "Design" },
];

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith("/" + href.split("/")[1]);

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
        <span className="site-header__region">EUW</span>
      </div>
    </header>
  );
}

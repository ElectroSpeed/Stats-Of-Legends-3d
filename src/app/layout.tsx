import type { Metadata } from "next";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/styles/main.scss";

export const metadata: Metadata = {
  title: { default: "Stats Of Legends", template: "%s · Stats Of Legends" },
  description:
    "Statistiques League of Legends : profils d'invocateurs, historiques de parties, leaderboards et tier list des champions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: { title: "Stats Of Legends", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          <main className="app-main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

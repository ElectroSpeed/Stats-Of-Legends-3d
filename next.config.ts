import type { NextConfig } from "next";
import path from "node:path";
import { securityHeaders } from "./src/lib/security/headers";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // ne pas divulguer "X-Powered-By: Next.js"
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src/styles")],
    additionalData: `@use "abstracts" as *;`,
  },
  transpilePackages: ["three"],
  images: {
    // Assets statiques officiels (icônes, splash) servis par Riot/Data Dragon.
    remotePatterns: [
      { protocol: "https", hostname: "ddragon.leagueoflegends.com" },
      { protocol: "https", hostname: "raw.communitydragon.org" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

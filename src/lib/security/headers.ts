// En-têtes de sécurité appliqués à toutes les réponses (voir next.config.ts).
// CSP stricte en production ; assouplie en dev pour le HMR de Next.js
// (React Refresh utilise eval, le serveur de dev utilise un websocket).
const isDev = process.env.NODE_ENV !== "production";

const scriptSrc = ["'self'", "'unsafe-inline'", isDev ? "'unsafe-eval'" : ""]
  .filter(Boolean)
  .join(" ");

const connectSrc = ["'self'", isDev ? "ws: http://localhost:*" : ""]
  .filter(Boolean)
  .join(" ");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://ddragon.leagueoflegends.com https://raw.communitydragon.org",
  "font-src 'self'",
  `connect-src ${connectSrc}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // N'upgrade vers HTTPS qu'en production (sinon casse http://localhost).
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const headers = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

// HSTS uniquement en production (inutile/contre-productif en http local).
if (!isDev) {
  headers.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

export const securityHeaders = headers;

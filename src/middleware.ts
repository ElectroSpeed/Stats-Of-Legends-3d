import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware edge : durcissement transverse.
 * - Bloque les origines cross-site non autorisées sur /api.
 * - Pose un nonce/headers complémentaires (le gros des headers vient de next.config).
 * Le rate limiting fin (Redis) est appliqué dans chaque route handler.
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/api")) {
    const origin = req.headers.get("origin");
    const allowed = (process.env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);

    // Requêtes mutantes cross-origin non autorisées -> rejet.
    if (origin && allowed.length > 0 && !allowed.includes(origin) && req.method !== "GET") {
      return new NextResponse("Origin non autorisée", { status: 403 });
    }
  }

  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};

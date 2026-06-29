import type { NextRequest } from "next/server";
import { getSummonerProfile } from "@/repositories/summonerRepo";
import { platformSchema } from "@/lib/validation";
import { parseRiotId } from "@/lib/regions";
import { rateLimit } from "@/lib/security/rateLimit";
import { ok, fail, rateLimited } from "@/lib/security/apiResponse";
import { RiotApiError } from "@/services/riot/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ region: string; riotId: string }> },
) {
  const { region, riotId } = await params;

  const platform = platformSchema.safeParse(region);
  if (!platform.success) return fail(400, "Région invalide", "BAD_REGION");

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  const rl = await rateLimit(`summoner:${ip}`, 30, 60);
  if (!rl.success) return rateLimited(rl.reset);

  const { gameName, tagLine } = parseRiotId(riotId);

  try {
    const profile = await getSummonerProfile(platform.data, gameName, tagLine);
    return ok(profile);
  } catch (err) {
    if (err instanceof RiotApiError && err.status === 404)
      return fail(404, "Invocateur introuvable", "NOT_FOUND");
    console.error(err);
    return fail(502, "Service Riot indisponible", "UPSTREAM");
  }
}

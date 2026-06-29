import type { NextRequest } from "next/server";
import { getMatchHistory } from "@/repositories/matchRepo";
import { platformSchema, pageSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/security/rateLimit";
import { ok, fail, rateLimited } from "@/lib/security/apiResponse";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ region: string; puuid: string }> },
) {
  const { region, puuid } = await params;
  const platform = platformSchema.safeParse(region);
  if (!platform.success) return fail(400, "Région invalide", "BAD_REGION");

  const page = pageSchema.parse(req.nextUrl.searchParams.get("page") ?? 0);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  const rl = await rateLimit(`matches:${ip}`, 30, 60);
  if (!rl.success) return rateLimited(rl.reset);

  try {
    const matches = await getMatchHistory(platform.data, puuid, page);
    return ok(matches);
  } catch (err) {
    console.error(err);
    return fail(502, "Service Riot indisponible", "UPSTREAM");
  }
}

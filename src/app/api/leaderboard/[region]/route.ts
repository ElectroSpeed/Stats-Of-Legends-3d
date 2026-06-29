import type { NextRequest } from "next/server";
import { getLeaderboard } from "@/repositories/leaderboardRepo";
import { platformSchema, pageSchema, queueSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/security/rateLimit";
import { ok, fail, rateLimited } from "@/lib/security/apiResponse";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ region: string }> },
) {
  const { region } = await params;
  const platform = platformSchema.safeParse(region);
  if (!platform.success) return fail(400, "Région invalide", "BAD_REGION");

  const queue = queueSchema.parse(req.nextUrl.searchParams.get("queue") ?? undefined);
  const page = pageSchema.parse(req.nextUrl.searchParams.get("page") ?? 0);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  const rl = await rateLimit(`lb:${ip}`, 60, 60);
  if (!rl.success) return rateLimited(rl.reset);

  const entries = await getLeaderboard(platform.data, queue, page);
  return ok(entries);
}

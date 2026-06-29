import type { NextRequest } from "next/server";
import { getTierList } from "@/repositories/championStatRepo";
import { roleSchema } from "@/lib/validation";
import { latestVersion } from "@/services/ddragon/client";
import { rateLimit } from "@/lib/security/rateLimit";
import { ok, rateLimited } from "@/lib/security/apiResponse";

export async function GET(req: NextRequest) {
  const role = roleSchema.parse(req.nextUrl.searchParams.get("role") ?? undefined);
  const tier = req.nextUrl.searchParams.get("tier") ?? "ALL";

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  const rl = await rateLimit(`tl:${ip}`, 60, 60);
  if (!rl.success) return rateLimited(rl.reset);

  const version = await latestVersion();
  const patch = version.split(".").slice(0, 2).join("."); // "14.24.1" -> "14.24"
  const list = await getTierList(role, tier, patch);
  return ok(list);
}

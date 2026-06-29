import { NextResponse } from "next/server";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function fail(status: number, message: string, code?: string) {
  return NextResponse.json({ error: { message, code } }, { status });
}

export function rateLimited(reset: number) {
  return NextResponse.json(
    { error: { message: "Trop de requêtes, réessaie plus tard.", code: "RATE_LIMITED" } },
    { status: 429, headers: { "Retry-After": String(Math.max(1, reset - Math.floor(Date.now() / 1000))) } },
  );
}

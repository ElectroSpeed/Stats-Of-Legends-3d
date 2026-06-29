import { NextResponse } from "next/server";

// Endpoint de liveness (utile pour le monitoring / CI smoke test).
export function GET() {
  return NextResponse.json({ status: "ok", ts: Date.now() });
}

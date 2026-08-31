import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { calculateForecast, validateDeals } from "../../../lib/novaflow.mjs";

const privateHeaders = { "Cache-Control": "private, no-store, max-age=0" };

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: privateHeaders },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 250000) {
    return NextResponse.json(
      { error: "Forecast payload is too large" },
      { status: 413, headers: privateHeaders },
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: privateHeaders },
    );
  }

  const parsed = validateDeals(payload?.deals);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid opportunity payload" },
      { status: 422, headers: privateHeaders },
    );
  }

  const forecast = calculateForecast(parsed.data);

  return NextResponse.json(
    {
      ...forecast,
      meta: {
        validatedDeals: parsed.data.length,
        calculatedAt: new Date().toISOString(),
        source: "server",
      },
    },
    { headers: privateHeaders },
  );
}

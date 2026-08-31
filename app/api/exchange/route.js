import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v2/rates?base=USD&quotes=EUR,GBP,CLP",
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) throw new Error("FX provider unavailable");
    const data = await response.json();

    if (
      !Array.isArray(data) ||
      !["EUR", "GBP", "CLP"].every((currency) =>
        data.some(
          (row) =>
            row.base === "USD" &&
            row.quote === currency &&
            Number.isFinite(row.rate) &&
            row.rate > 0 &&
            /^\d{4}-\d{2}-\d{2}$/.test(row.date),
        ),
      )
    ) {
      throw new Error("Unexpected provider response");
    }

    return NextResponse.json(
      {
        provider: "Frankfurter",
        base: "USD",
        date: [...data.map((row) => row.date)].sort()[0],
        rates: Object.fromEntries(data.map((row) => [row.quote, row.rate])),
        dates: Object.fromEntries(data.map((row) => [row.quote, row.date])),
      },
      { headers: { "Cache-Control": "private, max-age=0, must-revalidate" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Could not load external market data" },
      { status: 502, headers: { "Cache-Control": "private, no-store" } },
    );
  }
}

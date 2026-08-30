import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getSql } from "../../../lib/db";
import { validateDeals } from "../../../lib/novaflow.mjs";

const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
};

function json(body, init = {}) {
  return NextResponse.json(body, {
    ...init,
    headers: { ...privateHeaders, ...(init.headers || {}) },
  });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sql = getSql();
    const rows = await sql`
      SELECT deals, updated_at
      FROM novaflow_workspaces
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    if (!rows.length) {
      return json({ deals: null, updatedAt: null, source: "neon" });
    }

    const parsed = validateDeals(rows[0].deals);
    if (!parsed.success) {
      console.error("NovaFlow database contains an invalid workspace payload");
      return json({ error: "Stored workspace is invalid" }, { status: 500 });
    }

    return json({
      deals: parsed.data,
      updatedAt: rows[0].updated_at,
      source: "neon",
    });
  } catch (error) {
    console.error("NovaFlow database read error", error);
    return json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PUT(request) {
  const { userId } = await auth();
  if (!userId) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 250000) {
    return json({ error: "Workspace payload is too large" }, { status: 413 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = validateDeals(payload?.deals);
  if (!parsed.success) {
    return json({ error: "Invalid opportunity payload" }, { status: 422 });
  }

  try {
    const sql = getSql();
    const rows = await sql`
      INSERT INTO novaflow_workspaces (user_id, deals, updated_at)
      VALUES (${userId}, ${JSON.stringify(parsed.data)}::jsonb, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET deals = EXCLUDED.deals, updated_at = NOW()
      RETURNING updated_at
    `;

    return json({
      saved: true,
      updatedAt: rows[0].updated_at,
      source: "neon",
    });
  } catch (error) {
    console.error("NovaFlow database write error", error);
    return json({ error: "Database unavailable" }, { status: 503 });
  }
}

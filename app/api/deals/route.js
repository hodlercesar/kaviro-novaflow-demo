import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { ensureSchema, getSql } from '../../../lib/db';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = getSql();
    await ensureSchema(sql);
    const rows = await sql`
      SELECT deals, updated_at
      FROM novaflow_workspaces
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    if (!rows.length) {
      return NextResponse.json({ deals: null, updatedAt: null, source: 'neon' });
    }

    return NextResponse.json({
      deals: rows[0].deals,
      updatedAt: rows[0].updated_at,
      source: 'neon',
    });
  } catch (error) {
    console.error('NovaFlow database read error', error);
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
}

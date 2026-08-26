import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { ensureSchema, getSql } from '../../../lib/db';

const allowedStages = new Set(['Discovery', 'Qualified', 'Proposal', 'Negotiation', 'Won']);

function riskFor(deal) {
  if (deal.daysIdle >= 7 || deal.probability < 40) return 'High';
  if (deal.daysIdle >= 4 || deal.probability < 60) return 'Medium';
  return 'Low';
}

function isValidDeal(deal) {
  return deal &&
    typeof deal.company === 'string' && deal.company.length <= 120 &&
    typeof deal.owner === 'string' && deal.owner.length <= 20 &&
    allowedStages.has(deal.stage) &&
    Number.isFinite(deal.value) && deal.value >= 0 && deal.value <= 100000000 &&
    Number.isFinite(deal.daysIdle) && deal.daysIdle >= 0 && deal.daysIdle <= 3650 &&
    Number.isFinite(deal.probability) && deal.probability >= 0 && deal.probability <= 100;
}

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const deals = payload?.deals;
  if (!Array.isArray(deals) || deals.length > 100 || !deals.every(isValidDeal)) {
    return NextResponse.json({ error: 'Invalid opportunity payload' }, { status: 422 });
  }

  const openDeals = deals.filter(deal => deal.stage !== 'Won');
  const pipeline = openDeals.reduce((sum, deal) => sum + deal.value, 0);
  const weighted = openDeals.reduce((sum, deal) => sum + deal.value * (deal.probability / 100), 0);
  const atRisk = openDeals.filter(deal => riskFor(deal) === 'High').length;
  const winPotential = deals
    .filter(deal => ['Proposal', 'Negotiation'].includes(deal.stage))
    .reduce((sum, deal) => sum + deal.value, 0);

  const riskBreakdown = ['High', 'Medium', 'Low'].reduce((acc, risk) => {
    acc[risk.toLowerCase()] = openDeals.filter(deal => riskFor(deal) === risk).length;
    return acc;
  }, {});

  const stageTotals = [...allowedStages].map(stage => ({
    stage,
    count: deals.filter(deal => deal.stage === stage).length,
    value: deals.filter(deal => deal.stage === stage).reduce((sum, deal) => sum + deal.value, 0),
  }));

  let persisted = false;
  try {
    const sql = getSql();
    await ensureSchema(sql);
    await sql`
      INSERT INTO novaflow_workspaces (user_id, deals, updated_at)
      VALUES (${userId}, ${JSON.stringify(deals)}::jsonb, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET deals = EXCLUDED.deals, updated_at = NOW()
    `;
    persisted = true;
  } catch (error) {
    console.error('NovaFlow persistence error', error);
  }

  return NextResponse.json({
    metrics: {
      pipeline: Math.round(pipeline),
      weighted: Math.round(weighted),
      atRisk,
      winPotential: Math.round(winPotential),
    },
    riskBreakdown,
    stageTotals,
    meta: {
      validatedDeals: deals.length,
      calculatedAt: new Date().toISOString(),
      source: 'server',
      persisted,
    },
  });
}

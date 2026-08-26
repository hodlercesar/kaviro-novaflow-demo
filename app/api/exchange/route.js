import { NextResponse } from 'next/server';

const COOKIE_NAME = 'novaflow_demo_session';

export async function GET(request) {
  if (request.cookies.get(COOKIE_NAME)?.value !== 'active') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,CLP', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) throw new Error('FX provider unavailable');
    const data = await response.json();

    if (!data?.rates?.EUR || !data?.date) {
      throw new Error('Unexpected provider response');
    }

    return NextResponse.json({
      provider: 'Frankfurter',
      base: data.base,
      date: data.date,
      rates: data.rates,
    });
  } catch {
    return NextResponse.json({ error: 'Could not load external market data' }, { status: 502 });
  }
}

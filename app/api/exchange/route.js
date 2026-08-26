import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,CLP', {
      next: { revalidate: 3600 },
    });

    if (!response.ok) throw new Error('FX provider unavailable');
    const data = await response.json();

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

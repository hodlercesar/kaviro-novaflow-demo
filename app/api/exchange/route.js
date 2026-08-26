import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
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

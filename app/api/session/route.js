import { NextResponse } from 'next/server';

const COOKIE_NAME = 'novaflow_demo_session';

export async function GET(request) {
  const authenticated = request.cookies.get(COOKIE_NAME)?.value === 'active';
  return NextResponse.json({ authenticated });
}

export async function POST(request) {
  const { email, password } = await request.json();
  const demoEmail = process.env.DEMO_EMAIL || 'demo@kaviro.studio';
  const demoPassword = process.env.DEMO_PASSWORD || 'kaviro-demo';

  if (email !== demoEmail || password !== demoPassword) {
    return NextResponse.json({ error: 'Invalid demo credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(COOKIE_NAME, 'active', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 4,
    path: '/',
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(COOKIE_NAME, '', { httpOnly: true, maxAge: 0, path: '/' });
  return response;
}

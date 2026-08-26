import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId, sessionId } = await auth();
  return NextResponse.json({ authenticated: Boolean(userId), userId, sessionId });
}

export async function POST() {
  const { userId, sessionId } = await auth();
  if (!userId) {
    return NextResponse.json({ authenticated: false, error: 'Authentication required' }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, userId, sessionId });
}

export async function DELETE() {
  const { sessionId } = await auth();
  if (sessionId) {
    const client = await clerkClient();
    await client.sessions.revokeSession(sessionId);
  }
  return NextResponse.json({ authenticated: false });
}

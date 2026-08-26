import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DemoLayout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in?redirect_url=/demo');
  }

  return children;
}

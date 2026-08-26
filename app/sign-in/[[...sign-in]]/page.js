import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '32px', background: '#f4f2ec' }}>
      <SignIn routing="path" path="/sign-in" forceRedirectUrl="/demo" />
    </main>
  );
}

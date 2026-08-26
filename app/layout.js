import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = {
  title: 'NovaFlow — Revenue Operations, simplified',
  description: 'Concept SaaS application designed and built by KAVIRO Studio as a technical product demonstration.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}

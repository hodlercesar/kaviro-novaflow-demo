import './globals.css';

export const metadata = {
  title: 'NovaFlow — Revenue Operations, simplified',
  description: 'Concept SaaS landing page designed and built by KAVIRO Studio as a frontend demonstration.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

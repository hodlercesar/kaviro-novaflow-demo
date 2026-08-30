import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://kaviro-novaflow-demo.vercel.app"),
  title: {
    default: "NovaFlow — Concept Revenue Operations SaaS",
    template: "%s · NovaFlow",
  },
  description:
    "A transparent, functional concept SaaS application designed and built by KAVIRO Studio as a technical product demonstration.",
  applicationName: "NovaFlow",
  authors: [{ name: "KAVIRO Studio" }],
  keywords: [
    "Next.js",
    "SaaS demo",
    "product engineering",
    "revenue operations",
    "KAVIRO Studio",
  ],
  openGraph: {
    title: "NovaFlow — Functional concept SaaS by KAVIRO Studio",
    description:
      "Explore a responsive, authenticated revenue-operations concept with fictional evaluation data and real product interactions.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "NovaFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaFlow — Functional concept SaaS",
    description: "A transparent technical portfolio project by KAVIRO Studio.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090f",
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

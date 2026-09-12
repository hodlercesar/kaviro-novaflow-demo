import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://kaviro-novaflow-demo.vercel.app"),
  title: {
    default: "KAVIRO Studio — Soluciones digitales para negocios",
    template: "%s · KAVIRO Studio",
  },
  description:
    "Soluciones digitales para negocios que quieren conseguir clientes, organizar procesos y automatizar tareas.",
  applicationName: "KAVIRO Studio",
  authors: [{ name: "KAVIRO Studio" }],
  keywords: [
    "soluciones digitales para negocios",
    "captación de clientes",
    "sistemas para negocios",
    "automatización de procesos",
    "KAVIRO Studio",
  ],
  openGraph: {
    title: "KAVIRO Studio — Soluciones digitales para negocios",
    description:
      "Soluciones digitales para negocios que quieren conseguir clientes, organizar procesos y automatizar tareas.",
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: "KAVIRO Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "KAVIRO Studio — Soluciones digitales para negocios",
    description:
      "Soluciones digitales para negocios que quieren conseguir clientes, organizar procesos y automatizar tareas.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ClerkProvider
          localization={{
            signIn: {
              start: {
                title: "Welcome to NovaFlow",
                subtitle: "",
              },
            },
            signUp: {
              start: {
                title: "Create your workspace",
                subtitle: "",
              },
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

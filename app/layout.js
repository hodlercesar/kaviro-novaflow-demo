import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://kaviro-novaflow-demo.vercel.app"),
  title: {
    default: "NovaFlow — SaaS conceptual de operaciones de ingresos",
    template: "%s · NovaFlow",
  },
  description:
    "Aplicación SaaS conceptual, transparente y funcional, diseñada y construida por KAVIRO Studio como demostración técnica de producto.",
  applicationName: "NovaFlow",
  authors: [{ name: "KAVIRO Studio" }],
  keywords: [
    "Next.js",
    "demo SaaS",
    "desarrollo de producto",
    "operaciones de ingresos",
    "KAVIRO Studio",
  ],
  openGraph: {
    title: "NovaFlow — SaaS conceptual funcional de KAVIRO Studio",
    description:
      "Explora un concepto responsive y autenticado de operaciones de ingresos con datos ficticios e interacciones reales de producto.",
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: "NovaFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaFlow — SaaS conceptual funcional",
    description: "Un proyecto técnico de portafolio de KAVIRO Studio.",
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
                title: "Bienvenido a NovaFlow",
                subtitle: "",
              },
            },
            signUp: {
              start: {
                title: "Crea tu espacio",
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

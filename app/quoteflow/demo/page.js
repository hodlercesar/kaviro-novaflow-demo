import QuoteFlowDemo from "./QuoteFlowDemo";

export const metadata = {
  title: "Demo interactiva QuoteFlow",
  description:
    "Prueba el flujo beta para cotizaciones, estados y seguimientos de pequeños negocios de servicios.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuoteFlowDemoPage() {
  return <QuoteFlowDemo />;
}

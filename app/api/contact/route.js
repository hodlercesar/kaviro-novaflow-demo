import { NextResponse } from "next/server";
import {
  getSectorLabel,
  MAX_BODY_LENGTH,
  validateLead,
} from "../../../lib/contact.mjs";

export const runtime = "nodejs";

const responseHeaders = {
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
};

function json(data, status) {
  return NextResponse.json(data, { status, headers: responseHeaders });
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_LENGTH) {
    return json({ error: "El mensaje es demasiado largo." }, 413);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "El formato de la solicitud no es válido." }, 415);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "No pudimos leer la solicitud." }, 400);
  }

  const parsed = validateLead(payload);
  if (!parsed.success) {
    return json({ error: parsed.error }, 422);
  }

  // Silently drop honeypot submissions so automated senders do not learn the
  // form's filtering rules. This response does not claim an email was sent.
  if (parsed.spam) {
    return new NextResponse(null, { status: 204, headers: responseHeaders });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "empresakavirostudio@gmail.com";

  if (!apiKey || !from) {
    return json(
      {
        error:
          "El canal de contacto todavía no está configurado. Escríbenos directamente a empresakavirostudio@gmail.com.",
      },
      503,
    );
  }

  const { data } = parsed;
  const message = [
    "Nueva solicitud de evaluación · KAVIRO Studio",
    "",
    "Nombre: " + data.name,
    "Empresa: " + data.company,
    "Sector: " + getSectorLabel(data.sector),
    "Email: " + data.email,
    "Teléfono: " + (data.phone || "No indicado"),
    "",
    "Problema a resolver:",
    data.problem,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: "Solicitud de evaluación · " + getSectorLabel(data.sector),
        text: message,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return json(
        { error: "No pudimos enviar tu solicitud. Inténtalo nuevamente." },
        502,
      );
    }
  } catch {
    return json(
      { error: "No pudimos enviar tu solicitud. Inténtalo nuevamente." },
      502,
    );
  }

  return json({ ok: true }, 200);
}

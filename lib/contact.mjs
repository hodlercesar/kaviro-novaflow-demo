const MAX_BODY_LENGTH = 16000;
const MAX_NAME_LENGTH = 120;
const MAX_COMPANY_LENGTH = 160;
const MAX_PROBLEM_LENGTH = 4000;
const MAX_PHONE_LENGTH = 40;

export const contactSectorOptions = [
  ["electricidad", "Electricidad"],
  ["climatizacion", "Climatización"],
  ["construccion", "Construcción"],
  ["servicios-tecnicos", "Servicios técnicos"],
  ["otro", "Otro negocio"],
];

const sectorLabels = Object.fromEntries(contactSectorOptions);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s-]{7,40}$/;

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";

  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function validateLead(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { success: false, error: "Completa el formulario para continuar." };
  }

  const data = {
    name: cleanText(payload.name, MAX_NAME_LENGTH),
    company: cleanText(payload.company, MAX_COMPANY_LENGTH),
    sector: cleanText(payload.sector, 40),
    email: cleanText(payload.email, 254).toLowerCase(),
    problem: cleanText(payload.problem, MAX_PROBLEM_LENGTH),
    phone: cleanText(payload.phone, MAX_PHONE_LENGTH),
    website: cleanText(payload.website, 120),
  };

  if (data.website) {
    return { success: true, data, spam: true };
  }

  if (data.name.length < 2 || data.company.length < 2) {
    return {
      success: false,
      error: "Indica tu nombre y el nombre de tu empresa.",
    };
  }

  if (!sectorLabels[data.sector]) {
    return { success: false, error: "Selecciona un sector válido." };
  }

  if (!emailPattern.test(data.email)) {
    return { success: false, error: "Escribe un email válido." };
  }

  if (data.problem.length < 10) {
    return {
      success: false,
      error: "Cuéntanos un poco más sobre el proceso que quieres mejorar.",
    };
  }

  if (data.phone && !phonePattern.test(data.phone)) {
    return { success: false, error: "Revisa el formato del teléfono." };
  }

  return { success: true, data, spam: false };
}

export function getSectorLabel(value) {
  return sectorLabels[value] || value;
}

export { MAX_BODY_LENGTH };

export const seedDeals = Object.freeze([
  {
    id: "northstar-labs",
    company: "Northstar Labs",
    contact: "Maya Chen",
    owner: "KM",
    stage: "Proposal",
    value: 42000,
    probability: 62,
    daysIdle: 5,
    next: "Revisar términos de seguridad",
  },
  {
    id: "monarch-systems",
    company: "Monarch Systems",
    contact: "Theo Grant",
    owner: "AR",
    stage: "Negotiation",
    value: 18000,
    probability: 78,
    daysIdle: 1,
    next: "Finalizar términos comerciales",
  },
  {
    id: "kepler-works",
    company: "Kepler Works",
    contact: "Nina Park",
    owner: "KM",
    stage: "Discovery",
    value: 27000,
    probability: 35,
    daysIdle: 8,
    next: "Confirmar responsable técnico",
  },
  {
    id: "atelier-cloud",
    company: "Atelier Cloud",
    contact: "Jon Bell",
    owner: "LS",
    stage: "Qualified",
    value: 56000,
    probability: 48,
    daysIdle: 2,
    next: "Agendar taller de solución",
  },
  {
    id: "cobalt-studio",
    company: "Cobalt Studio",
    contact: "Iris Cole",
    owner: "AR",
    stage: "Proposal",
    value: 33000,
    probability: 66,
    daysIdle: 3,
    next: "Enviar alcance revisado",
  },
  {
    id: "orbit-commerce",
    company: "Orbit Commerce",
    contact: "Sofia Reed",
    owner: "LS",
    stage: "Won",
    value: 24000,
    probability: 100,
    daysIdle: 0,
    next: "Entrega de demo completada",
  },
]);

export const seedAutomations = Object.freeze([
  {
    id: "stale",
    name: "Escalamiento por inactividad",
    detail:
      "Marca oportunidades sin actividad durante 7+ días y las muestra en la cola prioritaria.",
    enabled: true,
    runs: 14,
  },
  {
    id: "probability",
    name: "Sincronización de probabilidad",
    detail:
      "Actualiza automáticamente la confianza del pronóstico cuando una oportunidad cambia de etapa.",
    enabled: true,
    runs: 9,
  },
  {
    id: "followup",
    name: "Recordatorio de seguimiento",
    detail:
      "Crea un recordatorio cuando el siguiente paso no cambia después de una transición de etapa.",
    enabled: false,
    runs: 4,
  },
]);

export const seedActivity = Object.freeze([
  {
    id: "forecast-seed",
    text: "Pronóstico recalculado para el conjunto ficticio de oportunidades",
    time: "hace 2 min",
  },
  {
    id: "northstar-seed",
    text: "Northstar Labs pasó a revisión de propuesta",
    time: "hace 18 min",
  },
  {
    id: "kepler-seed",
    text: "La simulación por inactividad marcó a Kepler Works",
    time: "hace 41 min",
  },
]);

export function cloneSeedDeals() {
  return seedDeals.map((deal) => ({ ...deal }));
}

export function cloneSeedAutomations() {
  return seedAutomations.map((automation) => ({ ...automation }));
}

export function cloneSeedActivity() {
  return seedActivity.map((item) => ({ ...item }));
}

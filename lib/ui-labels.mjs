const STAGE_LABELS = Object.freeze({
  Discovery: "Descubrimiento",
  Qualified: "Calificada",
  Proposal: "Propuesta",
  Negotiation: "Negociación",
  Won: "Ganada",
});

const RISK_LABELS = Object.freeze({
  High: "Alto",
  Medium: "Medio",
  Low: "Bajo",
});

const NEXT_ACTION_LABELS = Object.freeze({
  "Review security terms": "Revisar términos de seguridad",
  "Finalize commercial terms": "Finalizar términos comerciales",
  "Confirm technical sponsor": "Confirmar responsable técnico",
  "Schedule solution workshop": "Agendar taller de solución",
  "Send revised scope": "Enviar alcance revisado",
  "Demo handoff completed": "Entrega de demo completada",
});

const ACTIVITY_LABELS = Object.freeze({
  "Forecast recalculated across the fictional opportunity set":
    "Pronóstico recalculado para el conjunto ficticio de oportunidades",
  "Northstar Labs moved into proposal review":
    "Northstar Labs pasó a revisión de propuesta",
  "Stale-deal simulation flagged Kepler Works":
    "La simulación por inactividad marcó a Kepler Works",
  "Workspace reset to the fictional evaluation baseline":
    "El espacio se restableció a la base ficticia de evaluación",
});

export function stageLabel(value) {
  return STAGE_LABELS[value] || value;
}

export function riskLabel(value) {
  return RISK_LABELS[value] || value;
}

export function nextActionLabel(value) {
  return NEXT_ACTION_LABELS[value] || value;
}

export function activityLabel(value) {
  if (ACTIVITY_LABELS[value]) return ACTIVITY_LABELS[value];

  const created = value.match(/^(.+) created in (Discovery|Qualified|Proposal|Negotiation|Won)$/);
  if (created) {
    return `${created[1]} se creó en ${stageLabel(created[2]).toLowerCase()}`;
  }

  const advanced = value.match(/^(.+) advanced to (Discovery|Qualified|Proposal|Negotiation|Won)$/);
  if (advanced) {
    return `${advanced[1]} avanzó a ${stageLabel(advanced[2]).toLowerCase()}`;
  }

  return value;
}

export function relativeTimeLabel(value) {
  if (!value) return "";
  if (value === "now" || value === "ahora") return "ahora";
  if (/^hace\s/i.test(value) || value === "ayer") return value;

  const minutes = value.match(/^(\d+)m$/);
  if (minutes) return `hace ${minutes[1]} min`;

  const hours = value.match(/^(\d+)h$/);
  if (hours) return `hace ${hours[1]} h`;

  const days = value.match(/^(\d+)d$/);
  if (days) return Number(days[1]) === 1 ? "ayer" : `hace ${days[1]} días`;

  return value;
}

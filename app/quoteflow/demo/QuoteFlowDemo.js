"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./demo.module.css";

const STORAGE_KEY = "quoteflow-demo-v1";

const STATUS_OPTIONS = [
  "Nueva",
  "Preparando",
  "Enviada",
  "Seguimiento",
  "Ganada",
  "Perdida",
];

const SEED_QUOTES = [
  {
    id: "qf-001",
    client: "Juan Martínez",
    business: "Instalación eléctrica",
    amount: 680000,
    status: "Seguimiento",
    followUp: "2026-09-07",
    phone: "56955123456",
    notes: "Confirmar disponibilidad para la próxima semana.",
  },
  {
    id: "qf-002",
    client: "Comercial Plaza",
    business: "Mantención preventiva",
    amount: 420000,
    status: "Enviada",
    followUp: "2026-09-09",
    phone: "56966778899",
    notes: "Cotización enviada por correo.",
  },
  {
    id: "qf-003",
    client: "Lucía Rojas",
    business: "Tablero eléctrico",
    amount: 1120000,
    status: "Ganada",
    followUp: "",
    phone: "56944332211",
    notes: "Trabajo aprobado.",
  },
  {
    id: "qf-004",
    client: "Bodega Norte",
    business: "Revisión de luminarias",
    amount: 310000,
    status: "Preparando",
    followUp: "2026-09-08",
    phone: "",
    notes: "Falta confirmar cantidad final de puntos.",
  },
];

const emptyForm = {
  client: "",
  business: "",
  amount: "",
  followUp: "",
  phone: "",
  notes: "",
};

function formatMoney(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function readableDate(value) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${value}T12:00:00`));
}

function isPending(status) {
  return !["Ganada", "Perdida"].includes(status);
}

function statusClass(status) {
  const key = status.toLowerCase().replace(/s+/g, "");
  return styles[`status_${key}`] || styles.statusDefault;
}

export default function QuoteFlowDemo() {
  const [quotes, setQuotes] = useState(SEED_QUOTES);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) {
          setQuotes(parsed);
        }
      }
    } catch {
      // If localStorage is unavailable, the demo still works in memory.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
    } catch {
      // Keep the in-memory experience functional even if storage is blocked.
    }
  }, [quotes, hydrated]);

  const metrics = useMemo(() => {
    const quoted = quotes
      .filter((quote) => quote.status !== "Perdida")
      .reduce((sum, quote) => sum + Number(quote.amount || 0), 0);
    const won = quotes
      .filter((quote) => quote.status === "Ganada")
      .reduce((sum, quote) => sum + Number(quote.amount || 0), 0);
    const followUps = quotes.filter(
      (quote) => isPending(quote.status) && quote.followUp,
    ).length;
    const closed = quotes.filter((quote) =>
      ["Ganada", "Perdida"].includes(quote.status),
    );
    const winRate = closed.length
      ? Math.round(
          (closed.filter((quote) => quote.status === "Ganada").length /
            closed.length) *
            100,
        )
      : 0;

    return { quoted, won, followUps, winRate };
  }, [quotes]);

  const visibleQuotes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return quotes.filter((quote) => {
      const matchesFilter = filter === "Todas" || quote.status === filter;
      const matchesSearch =
        !query ||
        quote.client.toLowerCase().includes(query) ||
        quote.business.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [filter, quotes, search]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.client.trim() || !form.business.trim()) return;

    const nextQuote = {
      id: `qf-${Date.now()}`,
      client: form.client.trim(),
      business: form.business.trim(),
      amount: Number(form.amount || 0),
      status: "Nueva",
      followUp: form.followUp,
      phone: form.phone.replace(/[^0-9]/g, ""),
      notes: form.notes.trim(),
    };

    setQuotes((current) => [nextQuote, ...current]);
    setForm(emptyForm);
  }

  function updateStatus(id, status) {
    setQuotes((current) =>
      current.map((quote) =>
        quote.id === id
          ? {
              ...quote,
              status,
              followUp:
                ["Ganada", "Perdida"].includes(status) ? "" : quote.followUp,
            }
          : quote,
      ),
    );
  }

  function removeQuote(id) {
    setQuotes((current) => current.filter((quote) => quote.id !== id));
  }

  function resetDemo() {
    setQuotes(SEED_QUOTES);
    setFilter("Todas");
    setSearch("");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // No action needed.
    }
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <div>
          <Link href="/quoteflow" className={styles.brand}>
            <span>QF</span>
            <strong>QuoteFlow</strong>
          </Link>
          <p className={styles.beta}>Beta de validación</p>
        </div>

        <nav className={styles.sideNav} aria-label="Demo QuoteFlow">
          <a href="#resumen" className={styles.active}>
            <span>⌂</span> Resumen
          </a>
          <a href="#cotizaciones">
            <span>≡</span> Cotizaciones
          </a>
          <a href="#nueva">
            <span>＋</span> Nueva cotización
          </a>
        </nav>

        <div className={styles.sidebarFoot}>
          <p>Los cambios de esta demo se guardan solo en este navegador.</p>
          <button type="button" onClick={resetDemo}>
            Restaurar demo
          </button>
        </div>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <div>
            <span>QuoteFlow / Demo</span>
            <strong>Panel de cotizaciones</strong>
          </div>
          <a
            href="mailto:empresakavirostudio@gmail.com?subject=Quiero%20probar%20QuoteFlow"
            className={styles.testerButton}
          >
            Quiero probarlo en mi negocio
          </a>
        </header>

        <div className={styles.main}>
          <section id="resumen" className={styles.intro}>
            <div>
              <span className={styles.eyebrow}>HOY</span>
              <h1>Qué tienes que seguir y cuánto hay en juego.</h1>
              <p>
                Esta demo usa datos ficticios. Agrega una cotización, cambia su estado y
                prueba el flujo como si fuera tu negocio.
              </p>
            </div>
            <div className={styles.demoBadge}>Modo demo · sin cuenta</div>
          </section>

          <section className={styles.metricGrid} aria-label="Indicadores">
            <article>
              <span>Cotizado activo</span>
              <strong>{formatMoney(metrics.quoted)}</strong>
              <small>Excluye oportunidades perdidas</small>
            </article>
            <article>
              <span>Ganado</span>
              <strong>{formatMoney(metrics.won)}</strong>
              <small>Trabajos confirmados</small>
            </article>
            <article>
              <span>Seguimientos</span>
              <strong>{metrics.followUps}</strong>
              <small>Con próxima fecha definida</small>
            </article>
            <article>
              <span>Tasa de cierre</span>
              <strong>{metrics.winRate}%</strong>
              <small>Sobre oportunidades cerradas</small>
            </article>
          </section>

          <section id="cotizaciones" className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <span className={styles.eyebrow}>PIPELINE SIMPLE</span>
                <h2>Cotizaciones</h2>
              </div>
              <div className={styles.controls}>
                <label>
                  <span className={styles.srOnly}>Buscar</span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar cliente o trabajo"
                  />
                </label>
                <label>
                  <span className={styles.srOnly}>Filtrar estado</span>
                  <select
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                  >
                    <option>Todas</option>
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Cliente / trabajo</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Próximo contacto</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleQuotes.map((quote) => (
                    <tr key={quote.id}>
                      <td>
                        <strong>{quote.client}</strong>
                        <small>{quote.business}</small>
                        {quote.notes ? <em>{quote.notes}</em> : null}
                      </td>
                      <td>{formatMoney(quote.amount)}</td>
                      <td>
                        <select
                          className={`${styles.statusSelect} ${statusClass(quote.status)}`}
                          value={quote.status}
                          onChange={(event) =>
                            updateStatus(quote.id, event.target.value)
                          }
                          aria-label={`Estado de ${quote.client}`}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <span className={styles.followDate}>
                          {readableDate(quote.followUp)}
                        </span>
                      </td>
                      <td>
                        <div className={styles.rowActions}>
                          {quote.phone ? (
                            <a
                              href={`https://wa.me/${quote.phone}`}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.whatsapp}
                            >
                              WhatsApp
                            </a>
                          ) : (
                            <span className={styles.noPhone}>Sin teléfono</span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeQuote(quote.id)}
                            aria-label={`Eliminar cotización de ${quote.client}`}
                          >
                            ×
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {!visibleQuotes.length ? (
                <div className={styles.empty}>
                  No hay cotizaciones que coincidan con este filtro.
                </div>
              ) : null}
            </div>
          </section>

          <section id="nueva" className={styles.formPanel}>
            <div className={styles.formIntro}>
              <span className={styles.eyebrow}>NUEVA OPORTUNIDAD</span>
              <h2>Registrar cotización</h2>
              <p>
                Guarda lo mínimo necesario para que el siguiente contacto no dependa de
                tu memoria.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label>
                Cliente *
                <input
                  required
                  value={form.client}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      client: event.target.value,
                    }))
                  }
                  placeholder="Ej. Ferretería Central"
                />
              </label>

              <label>
                Trabajo / servicio *
                <input
                  required
                  value={form.business}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      business: event.target.value,
                    }))
                  }
                  placeholder="Ej. Mantención eléctrica"
                />
              </label>

              <label>
                Monto estimado
                <input
                  min="0"
                  inputMode="numeric"
                  type="number"
                  value={form.amount}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      amount: event.target.value,
                    }))
                  }
                  placeholder="450000"
                />
              </label>

              <label>
                Próximo contacto
                <input
                  type="date"
                  value={form.followUp}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      followUp: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                WhatsApp
                <input
                  inputMode="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="56912345678"
                />
              </label>

              <label className={styles.fullField}>
                Nota
                <textarea
                  rows="3"
                  value={form.notes}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                  placeholder="Qué hay que recordar para el seguimiento"
                />
              </label>

              <div className={styles.formActions}>
                <button type="submit">Guardar cotización</button>
                <span>Se crea con estado “Nueva”.</span>
              </div>
            </form>
          </section>

          <section className={styles.feedback}>
            <div>
              <span className={styles.eyebrow}>ESTAMOS VALIDANDO</span>
              <h2>¿Esto te ahorraría seguimientos perdidos?</h2>
              <p>
                Si manejas cotizaciones en WhatsApp, correo o Excel, queremos escuchar
                cómo lo haces hoy antes de agregar más funciones.
              </p>
            </div>
            <a href="mailto:empresakavirostudio@gmail.com?subject=Feedback%20QuoteFlow">
              Dar feedback
            </a>
          </section>
        </div>
      </section>
    </main>
  );
}

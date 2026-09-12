"use client";

import { useState } from "react";
import Icon from "../demo/components/Icon";
import styles from "./contact.module.css";

const sectorOptions = [
  ["electricidad", "Electricidad"],
  ["climatizacion", "Climatización"],
  ["construccion", "Construcción"],
  ["servicios-tecnicos", "Servicios técnicos"],
  ["otro", "Otro negocio"],
];

export default function LeadForm({ defaultSector = "" }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          sector: data.get("sector"),
          email: data.get("email"),
          problem: data.get("problem"),
          phone: data.get("phone"),
          website: data.get("website"),
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
            "No pudimos enviar tu solicitud. Inténtalo nuevamente.",
        );
      }

      setStatus("success");
      form.reset();
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError.message ||
          "No pudimos enviar tu solicitud. Inténtalo nuevamente.",
      );
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} data-contact-form>
      <div className={styles.formGrid}>
        <label>
          Nombre <span aria-hidden="true">*</span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Tu nombre"
          />
        </label>
        <label>
          Empresa <span aria-hidden="true">*</span>
          <input
            name="company"
            required
            autoComplete="organization"
            placeholder="Nombre de tu empresa"
          />
        </label>
        <label>
          Sector <span aria-hidden="true">*</span>
          <select name="sector" defaultValue={defaultSector} required>
            <option value="" disabled>
              Selecciona una opción
            </option>
            {sectorOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Email <span aria-hidden="true">*</span>
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="tu@empresa.cl"
          />
        </label>
        <label className={styles.fullField}>
          Problema a resolver <span aria-hidden="true">*</span>
          <textarea
            name="problem"
            required
            rows="5"
            placeholder="¿Qué proceso quieres ordenar o mejorar?"
          />
        </label>
        <label>
          Teléfono <span className={styles.optional}>(opcional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+56 9 ..."
          />
        </label>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex="-1" autoComplete="off" />
      </div>

      <div className={styles.formFooter}>
        <button
          type="submit"
          className={styles.submit}
          disabled={status === "sending"}
          aria-busy={status === "sending"}
        >
          {status === "sending" ? "Enviando…" : "Solicitar evaluación"}
          {status === "sending" ? null : <Icon name="arrow" size={17} />}
        </button>
        <p>
          Tu solicitud se envía al equipo de KAVIRO. No guardamos tus datos en
          la base de datos de este sitio.
        </p>
      </div>
      {status === "success" ? (
        <p className={styles.status} aria-live="polite">
          Solicitud enviada. Te responderemos por correo.
        </p>
      ) : null}
      {status === "error" ? (
        <p className={styles.statusError} role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}

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
const sectorLabels = Object.fromEntries(sectorOptions);

export default function LeadForm({ defaultSector = "" }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = [
      ["Nombre", data.get("name")],
      ["Empresa", data.get("company")],
      ["Sector", sectorLabels[data.get("sector")] || data.get("sector")],
      ["Problema a resolver", data.get("problem")],
      ["Email", data.get("email")],
      ["Teléfono", data.get("phone") || "No indicado"],
    ];
    const body = fields
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");
    const subject = "Solicitud de evaluación · KAVIRO Studio";
    setSubmitted(true);
    window.location.href = `mailto:empresakavirostudio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

      <div className={styles.formFooter}>
        <button type="submit" className={styles.submit}>
          Solicitar evaluación <Icon name="arrow" size={17} />
        </button>
        <p>
          Por ahora se abrirá tu correo con la información lista para enviar. No
          guardamos tus datos en este formulario.
        </p>
      </div>
      {submitted ? (
        <p className={styles.status} aria-live="polite">
          Preparamos tu mensaje. Si no se abrió tu correo, escríbenos a
          empresakavirostudio@gmail.com.
        </p>
      ) : null}
    </form>
  );
}

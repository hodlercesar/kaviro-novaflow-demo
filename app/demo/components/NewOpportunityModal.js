"use client";

import { useEffect, useRef, useState } from "react";
import { OWNERS, STAGES } from "../../../lib/novaflow.mjs";
import styles from "../demo.module.css";
import Icon from "./Icon";

const initialDraft = {
  company: "",
  contact: "",
  owner: "KM",
  stage: "Discovery",
  value: "24000",
  probability: "35",
  next: "",
};

export default function NewOpportunityModal({ open, onClose, onCreate }) {
  const [draft, setDraft] = useState(initialDraft);
  const [error, setError] = useState("");
  const companyRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    companyRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll(
          "button:not([disabled]), input:not([disabled]), select:not([disabled])",
        );
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  function submit(event) {
    event.preventDefault();
    setError("");
    const value = Number(draft.value);
    const probability = Number(draft.probability);
    if (!draft.company.trim() || !draft.contact.trim() || !draft.next.trim()) {
      setError("Company, contact and next action are required.");
      return;
    }
    if (!Number.isFinite(value) || value <= 0 || value > 100000000) {
      setError("Enter a valid opportunity value.");
      return;
    }
    if (!Number.isFinite(probability) || probability < 0 || probability > 100) {
      setError("Probability must be between 0 and 100.");
      return;
    }

    const created = onCreate({
      id: crypto.randomUUID(),
      company: draft.company.trim(),
      contact: draft.contact.trim(),
      owner: draft.owner,
      stage: draft.stage,
      value: Math.round(value),
      probability: Math.round(probability),
      daysIdle: 0,
      next: draft.next.trim(),
    });

    if (created === false) {
      setError(
        "This evaluation workspace has reached its opportunity limit. Reset the demo or remove data before creating another record.",
      );
      return;
    }

    setDraft(initialDraft);
    onClose();
  }

  return (
    <div
      className={styles.modalBackdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-opportunity-title"
      >
        <div className={styles.modalHeader}>
          <div>
            <span className={styles.eyebrow}>Fictional pipeline</span>
            <h2 id="new-opportunity-title">Create opportunity</h2>
            <p>Add an evaluation record to your private demo workspace.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close create opportunity dialog"
          >
            <Icon name="close" />
          </button>
        </div>
        <form onSubmit={submit} className={styles.modalForm}>
          <div className={styles.fieldGrid}>
            <label>
              Company
              <input
                ref={companyRef}
                value={draft.company}
                onChange={(event) =>
                  setDraft({ ...draft, company: event.target.value })
                }
                placeholder="Acme Inc."
                maxLength={120}
              />
            </label>
            <label>
              Contact
              <input
                value={draft.contact}
                onChange={(event) =>
                  setDraft({ ...draft, contact: event.target.value })
                }
                placeholder="Jordan Lee"
                maxLength={120}
              />
            </label>
            <label>
              Owner
              <select
                value={draft.owner}
                onChange={(event) =>
                  setDraft({ ...draft, owner: event.target.value })
                }
              >
                {OWNERS.map((owner) => (
                  <option key={owner}>{owner}</option>
                ))}
              </select>
            </label>
            <label>
              Stage
              <select
                value={draft.stage}
                onChange={(event) =>
                  setDraft({ ...draft, stage: event.target.value })
                }
              >
                {STAGES.map((stage) => (
                  <option key={stage}>{stage}</option>
                ))}
              </select>
            </label>
            <label>
              Deal value
              <input
                type="number"
                min="1"
                max="100000000"
                value={draft.value}
                onChange={(event) =>
                  setDraft({ ...draft, value: event.target.value })
                }
              />
            </label>
            <label>
              Probability %
              <input
                type="number"
                min="0"
                max="100"
                value={draft.probability}
                onChange={(event) =>
                  setDraft({ ...draft, probability: event.target.value })
                }
              />
            </label>
          </div>
          <label>
            Next action
            <input
              value={draft.next}
              onChange={(event) =>
                setDraft({ ...draft, next: event.target.value })
              }
              placeholder="Book technical discovery"
              maxLength={180}
            />
          </label>
          {error && (
            <div className={styles.formError} role="alert">
              {error}
            </div>
          )}
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.primaryButton}>
              Create opportunity <Icon name="arrow" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

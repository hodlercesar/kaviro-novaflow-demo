"use client";

import { SignIn, SignUp, useAuth } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Brand from "./Brand";
import NovaMascot from "./NovaMascot";
import { mascotPose } from "../../lib/mascot-state.mjs";
import styles from "../auth.module.css";

const appearance = {
  variables: {
    colorPrimary: "#b9a6ff",
    colorPrimaryForeground: "#191225",
    colorBackground: "#131219",
    colorForeground: "#eee9f5",
    colorMutedForeground: "#aea3bf",
    colorNeutral: "#e2d6f2",
    colorInput: "#0e0e14",
    colorInputForeground: "#f1ebfa",
    colorBorder: "#63576f",
    colorRing: "#c2a6ff",
    colorDanger: "#ffaaa6",
    colorSuccess: "#94d7bc",
    borderRadius: "0.625rem",
    fontFamily: "inherit",
  },
  elements: {
    rootBox: styles.clerkRoot,
    cardBox: styles.clerkBox,
    card: styles.clerkCard,
    headerTitle: styles.clerkTitle,
    headerSubtitle: styles.clerkSubtitle,
    socialButtonsBlockButton: styles.socialButton,
    formFieldInput: styles.input,
    formButtonPrimary: styles.submit,
    footer: styles.clerkFooter,
    footerActionLink: styles.authLink,
    formFieldAction: styles.authLink,
    formFieldErrorText: "nf-auth-error",
    alert: "nf-auth-error",
  },
};

export default function AuthExperience({ mode = "sign-in" }) {
  const { isSignedIn } = useAuth();
  const formRef = useRef(null);
  const [pose, setPose] = useState("idle");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const root = formRef.current;
    if (!root) return undefined;
    let frame;
    const inspect = () => {
      const focused = document.activeElement;
      // No .value, keyboard text, selection, credential storage or analytics.
      if (focused instanceof HTMLInputElement && root.contains(focused)) {
        setPose(
          mascotPose({
            type: focused.type,
            id: focused.id,
            name: focused.name,
          }),
        );
      } else if (
        focused instanceof Element &&
        root.contains(focused) &&
        focused.closest(".cl-formFieldInputGroup")
      ) {
        const field = focused
          .closest(".cl-formFieldInputGroup")
          .querySelector("input");
        setPose(
          field
            ? mascotPose({ type: field.type, id: field.id, name: field.name })
            : "idle",
        );
      } else {
        setPose("idle");
      }
      setHasError(
        Boolean(root.querySelector('[aria-invalid="true"]')) ||
          [...root.querySelectorAll(".nf-auth-error")].some(
            (node) =>
              node.getClientRects().length > 0 &&
              node.textContent.trim().length > 0,
          ),
      );
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(inspect);
    };
    // Observe only the Clerk form; decorative state never changes its DOM.
    const observer = new MutationObserver(schedule);
    observer.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["type", "aria-invalid"],
    });
    root.addEventListener("focusin", schedule);
    root.addEventListener("focusout", schedule);
    inspect();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      root.removeEventListener("focusin", schedule);
      root.removeEventListener("focusout", schedule);
    };
  }, []);

  return (
    <main className={styles.page} lang="en">
      <header className={styles.topbar}>
        <Link href="/" aria-label="NovaFlow home">
          <Brand className={styles.brand} />
        </Link>
        <span>CONCEPT WORKSPACE</span>
      </header>
      <div className={styles.center}>
        <section
          className={styles.card}
          aria-label={
            mode === "sign-up"
              ? "Create your NovaFlow account"
              : "Sign in to NovaFlow"
          }
        >
          <NovaMascot
            pose={pose}
            feedback={isSignedIn ? "success" : hasError ? "error" : "idle"}
          />
          <div className={styles.mascotLabel}>
            <span />
            YOUR QUIET CO-PILOT
          </div>
          <div ref={formRef} className={styles.formSlot}>
            {mode === "sign-up" ? (
              <SignUp
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
                forceRedirectUrl="/demo"
                appearance={appearance}
              />
            ) : (
              <SignIn
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                forceRedirectUrl="/demo"
                appearance={appearance}
              />
            )}
          </div>
          <div className={styles.cardNote}>
            <svg
              width="13"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="m12 3-7 3v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            Clerk authentication · Fictional demo data
          </div>
        </section>
        <Link href="/" className={styles.backLink}>
          ← Back to NovaFlow
        </Link>
      </div>
      <footer className={styles.footer}>
        A conceptual SaaS by KAVIRO Studio.
        <span>For evaluation, not customer records.</span>
      </footer>
    </main>
  );
}

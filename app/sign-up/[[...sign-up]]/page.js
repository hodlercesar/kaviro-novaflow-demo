import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import styles from "../../auth.module.css";

export const metadata = {
  title: "Create a NovaFlow demo workspace",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <main className={styles.page}>
      <section className={styles.story}>
        <Link href="/" className={styles.brand}>
          <span>N</span>NovaFlow
        </Link>
        <div className={styles.copy}>
          <span className={styles.kicker}>Private evaluation workspace</span>
          <h1>Start with fictional data. Test real interactions.</h1>
          <p>
            Create an account through Clerk and NovaFlow will prepare a
            user-scoped concept workspace. The experience never represents
            fabricated client work.
          </p>
          <div className={styles.proof}>
            <span>Isolated demo state</span>
            <span>Server-verified forecast</span>
            <span>Safe reset controls</span>
          </div>
        </div>
        <small>
          Technical portfolio project · Built for transparent evaluation
        </small>
      </section>
      <section className={styles.formPanel}>
        <div className={styles.formIntro}>
          <span className={styles.miniMark}>N</span>
          <div>
            <b>Create demo workspace</b>
            <small>Authentication managed by Clerk</small>
          </div>
        </div>
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/demo"
          appearance={{
            variables: {
              colorPrimary: "#7158f5",
              colorBackground: "#ffffff",
              colorText: "#131620",
              colorInputBackground: "#f7f7fa",
              colorInputText: "#131620",
              borderRadius: "0.75rem",
            },
            elements: {
              cardBox: { boxShadow: "none", width: "100%" },
              card: { boxShadow: "none", border: 0, padding: 0 },
            },
          }}
        />
        <Link href="/" className={styles.backLink}>
          ← Back to NovaFlow
        </Link>
      </section>
    </main>
  );
}

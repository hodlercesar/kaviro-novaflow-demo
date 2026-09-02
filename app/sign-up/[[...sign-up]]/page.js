import AuthExperience from "../../_components/AuthExperience";

export const metadata = {
  title: "Crear un espacio demo de NovaFlow",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <AuthExperience mode="sign-up" />;
}

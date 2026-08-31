import AuthExperience from "../../_components/AuthExperience";

export const metadata = {
  title: "Create a NovaFlow demo workspace",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <AuthExperience mode="sign-up" />;
}

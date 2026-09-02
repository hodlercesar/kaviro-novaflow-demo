import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Espacio privado de demo",
  robots: { index: false, follow: false },
};

export default async function DemoLayout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/demo");
  }

  return children;
}

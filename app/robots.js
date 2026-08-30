export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/demo", "/sign-in", "/sign-up", "/api/"],
      },
    ],
    sitemap: "https://kaviro-novaflow-demo.vercel.app/sitemap.xml",
  };
}

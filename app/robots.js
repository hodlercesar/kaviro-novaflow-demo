import { siteUrl } from "../lib/site-config.mjs";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/demo", "/sign-in", "/sign-up", "/api/"],
      },
    ],
    sitemap: siteUrl + "/sitemap.xml",
  };
}

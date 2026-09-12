import { siteUrl } from "../lib/site-config.mjs";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: siteUrl + "/quoteflow",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: siteUrl + "/contacto",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: siteUrl + "/como-trabajamos",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: siteUrl + "/privacidad",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...[
      "electricidad",
      "climatizacion",
      "construccion",
      "servicios-tecnicos",
    ].map((slug) => ({
      url: siteUrl + "/sectores/" + slug,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}

export default function sitemap() {
  return [
    {
      url: "https://kaviro-novaflow-demo.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://kaviro-novaflow-demo.vercel.app/quoteflow",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://kaviro-novaflow-demo.vercel.app/contacto",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...[
      "electricidad",
      "climatizacion",
      "construccion",
      "servicios-tecnicos",
    ].map((slug) => ({
      url: `https://kaviro-novaflow-demo.vercel.app/sectores/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}

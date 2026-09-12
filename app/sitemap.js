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
  ];
}

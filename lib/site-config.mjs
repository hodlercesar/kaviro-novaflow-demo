const fallbackSiteUrl = "https://kaviro-novaflow-demo.vercel.app";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl = (
  configuredSiteUrl && /^https?:\/\//i.test(configuredSiteUrl)
    ? configuredSiteUrl
    : fallbackSiteUrl
).replace(/\/+$/, "");

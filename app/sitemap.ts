import type { MetadataRoute } from "next";

/**
 * Produce the sitemap entries for mdesk.tech.
 *
 * Each entry describes a public site URL and includes `url`, `lastModified` (set to the current date/time), `changeFrequency`, and `priority`.
 *
 * @returns An array of sitemap entry objects for the site's pages containing `url`, `lastModified`, `changeFrequency`, and `priority`
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mdesk.tech",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://mdesk.tech/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://mdesk.tech/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://mdesk.tech/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://mdesk.tech/services/hosting",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://mdesk.tech/services/seo",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://mdesk.tech/services/web-design",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://mdesk.tech/services/web-development",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://mdesk.tech/open-source",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://mdesk.tech/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://mdesk.tech/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
import type { MetadataRoute } from "next";

/**
 * Supply robots.txt directives and sitemap URL for the site.
 *
 * The returned object defines crawl rules that allow all user agents to access a set of public paths and specifies the sitemap location.
 *
 * @returns A `MetadataRoute.Robots` object containing the crawl rules (allowed paths for all user agents) and the sitemap URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/contact",
          "/services",
          "/services/hosting",
          "/services/seo",
          "/services/web-design",
          "/services/web-development",
          "/privacy",
          "/terms",
          "/open-source",
        ],
      },
    ],

    sitemap: "https://mdesk.tech/sitemap.xml",
  };
}
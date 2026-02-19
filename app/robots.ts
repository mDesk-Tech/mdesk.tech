import type { MetadataRoute } from "next";

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

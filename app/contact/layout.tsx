import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact | mdesk.tech",
  description: "Get in touch with the mdesk.tech team.",
  path: "/contact",
});

export { default } from "@/components/PassthroughLayout";

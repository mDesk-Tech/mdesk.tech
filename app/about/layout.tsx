import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About | mdesk.tech",
  description: "Learn more about mdesk.tech and our mission.",
  path: "/about",
});

export { default } from "@/components/PassthroughLayout";

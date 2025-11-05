import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Open Source | mdesk.tech",
  description:
    "Free website development offer and our commitment to open source.",
  path: "/open-source",
});

export { default } from "@/components/PassthroughLayout";

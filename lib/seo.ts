import type { Metadata } from "next";

type PageMetaInput = {
  title: string;
  description?: string;
  path: `/${string}`;
};

export function pageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
  } satisfies Metadata;
}

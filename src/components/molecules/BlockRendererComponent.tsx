"use client";
import Image from "next/image";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({
  content,
}: {
  readonly content: BlocksContent;
}) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => {
          return (
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alternativeText || ""}
            />
          );
        },
        list: ({ children, format }) => {
          if (format === "ordered") {
            return <ol className="list-decimal pl-5 mb-4">{children}</ol>;
          } else {
            return <ul className="list-disc pl-5 mb-4">{children}</ul>;
          }
        },
        link: ({ url, children }) => {
          return (
            <a href={url} className="text-blue-600 underline">
              {children}
            </a>
          );
        },
      }}
    />
  );
}

// @ts-nocheck

import React from "react";
import type { PortableTextComponents } from "@portabletext/react";

export type ListItem =
  | string
  | { text: string; href: string }
  | { content: string | React.ReactNode };

export type CardItem = {
  icon: React.ReactNode;
  text: string;
};

export type StepItem = {
  step: number;
  content: string | React.ReactNode;
};

export type ContentBlock =
  | string
  | { list: ListItem[] }
  | { cards: CardItem[] }
  | { link: { before?: string; href: string; after?: string } }
  | { steps: StepItem[] };

export const portableTextComponents: PortableTextComponents = {
  block: ({ value, children }: { value: any; children: React.ReactNode }) => {
    // Handle list items (bullets or numbers)
    if (value.listItem) {
      return (
        <li
          className={`text-sm font-normal text-foreground/55 ${value.level > 1 ? "ml-4" : ""}`}
        >
          {children}
        </li>
      );
    }

    switch (value?.style) {
      case "normal":
        return (
          <span className="text-sm font-normal text-foreground/55 mb-2">
            {children}
          </span>
        );
      case "h2":
        return (
          <h2 className="text-xl font-semibold text-foreground mb-3">
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3 className="text-base font-semibold text-foreground mb-2">
            {children}
          </h3>
        );
      default:
        return (
          <span className="text-sm font-normal text-foreground/55 mb-2">
            {children}
          </span>
        );
    }
  },
  list: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc text-foreground/55 pl-5 space-y-1 mb-3">{children}</ul>
  ),
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-foreground/55">{children}</em>
    ),
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { href: string };
    }) => (
      <a
        href={value?.href || "#"}
        className="text-foreground/55 underline hover:text-foreground"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

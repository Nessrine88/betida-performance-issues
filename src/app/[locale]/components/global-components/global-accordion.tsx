import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import type { ReactNode } from "react";

interface SliderData {
  title: string | ReactNode;
  content: string | ReactNode;
}

interface GlobalAccordionProps {
  data: SliderData[];
  defaultOpen?: boolean;
}

export function GlobalAccordion({
  data,
  defaultOpen = false,
}: GlobalAccordionProps) {
  const defaultValue = defaultOpen
    ? data.map((_, index) => `item-${index}`)
    : [];
  return (
    <div className="">
      <Accordion
        type="multiple"
        defaultValue={defaultValue}
        className="space-y-2.5"
      >
        {data.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-lg bg-sidebar"
          >
            <AccordionTrigger className="text-foreground text-base font-semibold decoration-none p-4 cursor-pointer transition-all duration-300 hover:bg-background-2">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-foreground-muted text-sm font-normal gap-2.5 px-4 pb-4 pt-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

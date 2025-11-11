import React from "react";
import { cn } from "@/lib/utils";

const RenderHtml = ({
  text = "",
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div
      className={cn("html_render text-black", className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default RenderHtml;

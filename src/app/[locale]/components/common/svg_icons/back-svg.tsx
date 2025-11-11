import React from "react";

function BackSVG({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M20 12.75C20.1989 12.75 20.3897 12.671 20.5303 12.5303C20.671 12.3897 20.75 12.1989 20.75 12C20.75 11.8011 20.671 11.6103 20.5303 11.4697C20.3897 11.329 20.1989 11.25 20 11.25V12.75ZM20 11.25H4V12.75H20V11.25Z"
        fill="currentcolor"
      />
      <path
        d="M10 6L4 12L10 18"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default BackSVG;

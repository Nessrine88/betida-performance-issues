import React from "react";

function SearchSVG({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_309_20545"
        maskUnits="userSpaceOnUse"
        x="3"
        y="3"
        width="18"
        height="18"
      >
        <path
          d="M11.6 19.2C15.7974 19.2 19.2 15.7974 19.2 11.6C19.2 7.40264 15.7974 4 11.6 4C7.40264 4 4 7.40264 4 11.6C4 15.7974 7.40264 19.2 11.6 19.2Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M18.3999 18.4004L19.9999 20.0004"
          stroke="currentcolor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </mask>
      <g mask="url(#mask0_309_20545)">
        <path
          d="M2.3999 2.40039H21.5999V21.6004H2.3999V2.40039Z"
          fill="currentcolor"
        />
      </g>
    </svg>
  );
}

export default SearchSVG;

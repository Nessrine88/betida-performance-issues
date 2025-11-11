"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type ButtonVariant =
  | "gray"
  | "ghost"
  | "outline"
  | "link"
  | "orangeGradient"
  | "purpleGradient"
  | "greenGradient";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  asChild?: boolean;
  prefetch?: boolean;
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  [key: string]: any;
}

const variantClasses: Record<ButtonVariant, string> = {
  gray: "bg-background-2 text-white hover:bg-gray-500",
  ghost: "bg-transparent text-white hover:bg-gray-500",
  outline:
    "border border-2 border-white-3 bg-background text-white hover:bg-gray-900 transition-colors",
  link: "border-b border-foreground/55 bg-transparent text-foreground/80 hover:text-foreground duration-300 transition-colors !h-fit !w-fit !p-0 rounded-none ",
  orangeGradient:
    "bg-gradient-to-t from-orange-1 to-yellow-1 text-white hover:opacity-80",
  purpleGradient:
    "bg-gradient-to-t from-purple-1 to-blue-1 text-white hover:opacity-80",
  greenGradient:
    "bg-gradient-to-t from-cyan-1 to-green-1 text-white hover:opacity-80",
};

export function Button({
  variant = "gray",
  fullWidth = false,
  className,
  icon,
  children,
  asChild = false,
  href,
  disabled = false,
  onClick,
  ariaLabel,
  prefetch,
  ...props
}: ButtonProps) {
  const hasAccessibleName = React.Children.count(children) > 0 || ariaLabel;
  if (!hasAccessibleName && process.env.NODE_ENV === "development") {
    console.warn(
      "Button missing accessible name: Add children (text) or ariaLabel prop."
    );
  }

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300",
    fullWidth && "w-full",
    variantClasses[variant],
    disabled
      ? "bg-background-2 text-foreground/15 cursor-not-allowed opacity-50"
      : "cursor-pointer",
    className
  );

  const buttonProps = {
    ...props,
    "aria-label": ariaLabel || undefined,
  };

  if (asChild && href) {
    return (
      <Link
        prefetch={prefetch ?? "auto"}
        href={href}
        className={classes}
        aria-disabled={disabled}
        {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
      >
        {children}
        {icon && <span>{icon}</span>}
      </Link>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      {...buttonProps}
    >
      {children}
      {icon && <span aria-hidden="true">{icon}</span>}
    </button>
  );
}

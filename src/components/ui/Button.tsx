import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
};

const variants = {
  primary:
    "border-matrix-green/60 bg-matrix-green text-matrix-black shadow-glow hover:bg-matrix-cyan hover:border-matrix-cyan",
  secondary:
    "border-matrix-cyan/45 bg-matrix-cyan/10 text-matrix-cyan hover:bg-matrix-cyan hover:text-matrix-black",
  ghost:
    "border-white/12 bg-white/5 text-matrix-text hover:border-matrix-green/50 hover:bg-matrix-green/10 hover:text-matrix-green"
};

export function Button({
  children,
  href,
  external,
  variant = "primary",
  className,
  icon,
  onClick,
  type = "button",
  ariaLabel
}: ButtonProps) {
  const classes = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-matrix-green",
    variants[variant],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {icon}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} className={classes} aria-label={ariaLabel} onClick={onClick}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

import { cn } from "@/lib/utils";

type TechBadgeProps = {
  children: string;
  className?: string;
};

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-matrix-green/25 bg-matrix-green/10 px-2.5 py-1 font-mono text-xs text-matrix-green",
        className
      )}
    >
      {children}
    </span>
  );
}

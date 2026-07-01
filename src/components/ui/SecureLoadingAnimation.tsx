import { cn } from "@/lib/utils";

type SecureLoadingAnimationProps = {
  active: boolean;
  complete: boolean;
  reducedMotion: boolean;
};

export function SecureLoadingAnimation({
  active,
  complete,
  reducedMotion
}: SecureLoadingAnimationProps) {
  return (
    <div
      className={cn(
        "secure-loading-visual",
        active && "is-active",
        complete && "is-complete",
        reducedMotion && "is-reduced-motion"
      )}
      aria-hidden
    >
      <div className="secure-loading-grid" />
      <div className="secure-loading-track">
        <span className="secure-loading-lane" />
        <span className="secure-loading-packet">
          <span />
        </span>
      </div>

      <div className="secure-loading-shield">
        <span className="secure-loading-ring" />
        <span className="secure-loading-fragment fragment-one" />
        <span className="secure-loading-fragment fragment-two" />
        <span className="secure-loading-fragment fragment-three" />

        <svg viewBox="0 0 96 108" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M48 8L82 20V48C82 70.5 68.3 89.8 48 100C27.7 89.8 14 70.5 14 48V20L48 8Z"
            className="secure-loading-shield-body"
          />
          <path
            d="M48 18L72 26.5V48.8C72 64.7 62.6 79.2 48 87.8C33.4 79.2 24 64.7 24 48.8V26.5L48 18Z"
            className="secure-loading-shield-inner"
          />
          <path
            d="M34 55L44 65L64 41"
            className="secure-loading-check"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M31 34H41M55 34H65M30 75H39M57 75H66" className="secure-loading-circuit" />
        </svg>
      </div>
    </div>
  );
}

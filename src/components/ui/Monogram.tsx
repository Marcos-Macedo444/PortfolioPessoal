export function Monogram({
  className = "",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 112 56"
      fill="none"
      className={`monogram ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 46V10L28 34L50 10V46M62 46V10L84 34L106 10V46"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="46" r="3" className="monogram-point" />
      <circle cx="106" cy="10" r="3" className="monogram-point" />
    </svg>
  );
}

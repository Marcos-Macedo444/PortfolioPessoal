export const monogramSegments = [
  "M6 46V10",
  "M6 10L28 34",
  "M28 34L50 10",
  "M50 10V46",
  "M62 46V10",
  "M62 10L84 34",
  "M84 34L106 10",
  "M106 10V46",
] as const;

export function Monogram({
  className = "",
  assemble = false,
  ...props
}: React.SVGProps<SVGSVGElement> & { assemble?: boolean }) {
  return (
    <svg
      viewBox="0 0 112 56"
      fill="none"
      className={`monogram ${className}`}
      aria-hidden="true"
      {...props}
    >
      {assemble ? (
        <g
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {monogramSegments.map((d, index) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              className="intro-piece"
              style={
                {
                  "--piece": index,
                  "--piece-x": `${index % 2 ? 9 : -9}px`,
                  "--piece-y": `${index % 3 ? -12 : 12}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </g>
      ) : (
        <path
          pathLength={1}
          d="M6 46V10L28 34L50 10V46M62 46V10L84 34L106 10V46"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      )}
      <circle cx="6" cy="46" r="3" className="monogram-point" />
      <circle cx="106" cy="10" r="3" className="monogram-point" />
    </svg>
  );
}

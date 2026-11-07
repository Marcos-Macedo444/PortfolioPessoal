import { Monogram } from "./Monogram";

export function IntroRocket() {
  return (
    <svg
      className="intro-rocket"
      viewBox="0 0 320 88"
      fill="none"
      aria-hidden="true"
    >
      <path className="intro-rocket-guide" d="M16 44H304" />
      <path
        className="intro-rocket-ticks"
        d="M24 75V78M88 75V78M152 75V78M216 75V78M280 75V78"
      />
      <g className="intro-rocket-flight">
        <g className="intro-rocket-trail">
          <path d="M14 37H-20M10 44H-44M14 51H-20" />
        </g>
        <path
          className="intro-rocket-flame"
          d="M20 38Q10 34 0 44Q10 54 20 50Z"
        />
        <g className="intro-rocket-shell">
          <path className="intro-rocket-fin" d="M25 33L29 17L48 30Z" />
          <path className="intro-rocket-fin" d="M25 55L29 71L48 58Z" />
          <path d="M20 34Q45 20 76 44Q45 68 20 54Z" />
          <path
            className="intro-rocket-nose"
            d="M62 34Q69 38 76 44Q69 50 62 54Z"
          />
          <rect x="16" y="35" width="6" height="18" rx="2" />
          <circle className="intro-rocket-window" cx="50" cy="44" r="7" />
          <path className="intro-rocket-glint" d="M47 42L51 39" />
        </g>
        <Monogram x="28" y="40" width="14" height="7" />
      </g>
    </svg>
  );
}

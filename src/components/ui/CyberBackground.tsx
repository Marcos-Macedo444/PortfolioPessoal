const networkPaths = [
  "M55 310 C190 120 330 420 500 210 S780 105 960 260",
  "M90 170 C260 260 340 85 520 150 S760 360 930 120",
  "M140 470 C300 360 360 520 540 420 S775 310 910 455",
  "M20 390 C190 410 260 250 420 305 S690 500 980 360"
];

const nodes = [
  { left: "13%", top: "24%", delay: "0s", color: "bg-matrix-cyan" },
  { left: "28%", top: "43%", delay: "0.8s", color: "bg-matrix-green" },
  { left: "46%", top: "18%", delay: "1.4s", color: "bg-matrix-blue" },
  { left: "62%", top: "34%", delay: "2.2s", color: "bg-matrix-cyan" },
  { left: "78%", top: "21%", delay: "3s", color: "bg-matrix-purple" },
  { left: "86%", top: "49%", delay: "1.8s", color: "bg-matrix-green" }
];

export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(45,255,143,0.20),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(32,230,255,0.18),transparent_24%),radial-gradient(circle_at_52%_64%,rgba(90,124,255,0.15),transparent_34%),linear-gradient(180deg,#020605_0%,#071013_44%,#020605_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(45,255,143,0.08),transparent_32%,rgba(32,230,255,0.07)_62%,transparent_82%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle,rgba(230,255,244,0.55)_1px,transparent_1.5px)] [background-size:26px_26px]" />

      <div className="absolute left-1/2 top-[7%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-matrix-cyan/15 opacity-80 blur-[0.2px] sm:top-[4%] sm:h-[44rem] sm:w-[44rem]">
        <div className="absolute inset-8 rounded-full border border-matrix-green/10" />
        <div className="absolute inset-20 rounded-full border border-matrix-blue/12" />
        <div className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top animate-radar-sweep bg-gradient-to-b from-matrix-cyan/45 via-matrix-green/18 to-transparent motion-reduce:animate-none" />
      </div>

      <div className="absolute bottom-[-22%] left-1/2 h-[62vh] w-[150vw] -translate-x-1/2 animate-grid-flow opacity-[0.34] [background-image:linear-gradient(rgba(45,255,143,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(32,230,255,0.26)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_top,black,transparent_78%)] [transform:perspective(900px)_rotateX(64deg)] motion-reduce:animate-none sm:bottom-[-26%] sm:h-[72vh] sm:[background-size:64px_64px]" />

      <svg
        className="absolute inset-x-[-8%] top-[12%] hidden h-[48vh] w-[116%] opacity-80 sm:block"
        viewBox="0 0 1000 560"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="signal-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(45,255,143,0)" />
            <stop offset="44%" stopColor="rgba(45,255,143,0.62)" />
            <stop offset="72%" stopColor="rgba(32,230,255,0.5)" />
            <stop offset="100%" stopColor="rgba(90,124,255,0)" />
          </linearGradient>
        </defs>
        {networkPaths.map((path, index) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="url(#signal-gradient)"
            strokeDasharray="16 18"
            strokeWidth={index === 0 ? 1.7 : 1.2}
            vectorEffect="non-scaling-stroke"
            className="animate-signal-trace motion-reduce:animate-none"
            style={{ animationDelay: `${index * 1.2}s` }}
          />
        ))}
      </svg>

      <div className="absolute inset-x-0 top-[11%] h-[52vh]">
        {nodes.map((node) => (
          <span
            key={`${node.left}-${node.top}`}
            className={`absolute h-2.5 w-2.5 rounded-full ${node.color} animate-node-pulse shadow-cyan motion-reduce:animate-none`}
            style={{ left: node.left, top: node.top, animationDelay: node.delay }}
          />
        ))}
      </div>

      <div className="absolute right-[-18rem] top-[8%] h-[34rem] w-[34rem] animate-energy-breath rounded-full bg-[conic-gradient(from_140deg,rgba(45,255,143,0.0),rgba(45,255,143,0.18),rgba(32,230,255,0.12),rgba(157,107,255,0.12),rgba(45,255,143,0.0))] blur-2xl motion-reduce:animate-none" />
      <div className="absolute left-[-16rem] top-[42%] h-[30rem] w-[30rem] rounded-full bg-matrix-blue/[0.10] blur-3xl" />
      <div className="absolute inset-x-[-12%] top-1/3 h-px animate-scan bg-gradient-to-r from-transparent via-matrix-green/35 to-transparent motion-reduce:animate-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_56%,rgba(2,6,5,0.84)_100%)]" />
    </div>
  );
}

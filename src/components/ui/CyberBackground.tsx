export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(45,255,143,0.13),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(32,230,255,0.10),transparent_26%),radial-gradient(circle_at_50%_86%,rgba(157,107,255,0.10),transparent_30%),linear-gradient(180deg,#020605_0%,#07100f_48%,#020605_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(45,255,143,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(32,230,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(115deg,transparent_0%,transparent_44%,rgba(45,255,143,0.45)_45%,transparent_46%,transparent_100%)] [background-size:240px_240px]" />
      <div className="absolute left-[-12%] top-1/4 h-px w-[124%] animate-scan bg-gradient-to-r from-transparent via-matrix-green/35 to-transparent motion-reduce:animate-none" />
      <div className="absolute bottom-[-14rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-matrix-cyan/10 blur-3xl" />
    </div>
  );
}

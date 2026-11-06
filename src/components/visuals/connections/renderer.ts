import {
  createPaths,
  localProgress,
  project,
  SAMPLES,
  STRANDS,
  strandPoint,
} from "./geometry";

export function mountConnections(root: HTMLElement, moving: () => boolean) {
  const stage = root.querySelector<HTMLElement>(".cable-stage")!;
  const links = root.querySelector<HTMLElement>(".cable-projects")!;
  const canvases = Array.from(
    root.querySelectorAll<HTMLCanvasElement>("canvas"),
  );
  const contexts = canvases.map((canvas) =>
    canvas.getContext("2d", { alpha: true }),
  );
  if (contexts.some((ctx) => !ctx)) return () => {};
  let disposed = false,
    frame = 0,
    visible = false,
    last = 0,
    frames = 0;
  let width = 0,
    height = 0,
    compact = false,
    extent = 0,
    inset = 0;
  let blue = "",
    green = "",
    line = "",
    exit = -0.9;
  let paths = createPaths(false, exit);
  const caches = canvases.map(() => ({
    progress: -1,
    coordinates: new Float32Array(STRANDS * SAMPLES * 2),
    wires: [] as Path2D[],
    image: document.createElement("canvas"),
  }));
  let dirty = true;
  const visibleElements = new Set<Element>();
  const metrics = () => {
    compact = matchMedia("(max-width: 700px)").matches;
    const rect = root.getBoundingClientRect();
    extent = rect.height;
    inset = parseFloat(getComputedStyle(stage).top) || 0;
    const rail = document.querySelector<HTMLElement>(".experience-list");
    if (rail) {
      const x = rail.getBoundingClientRect().left + (compact ? 9 : 27);
      exit = ((x - rect.left) / rect.width - 0.5) / 0.46;
    }
    const styles = getComputedStyle(root);
    blue = styles.getPropertyValue("--blue").trim();
    green = styles.getPropertyValue("--green").trim();
    line = styles.getPropertyValue("--line").trim();
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvases.forEach((canvas) => {
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(bounds.width * dpr));
      canvas.height = Math.max(1, Math.round(bounds.height * dpr));
      canvas.dataset.dpr = String(dpr);
    });
    paths = createPaths(compact, exit);
    caches.forEach((cache) => {
      cache.progress = -1;
    });
    dirty = true;
    request();
  };
  function draw(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    progress: number,
    now: number,
    index: number,
  ) {
    const dpr = Number(canvas.dataset.dpr);
    width = canvas.width / dpr;
    height = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const cache = caches[index];
    const changed = cache.progress !== progress;
    if (changed) {
      cache.progress = progress;
      cache.wires = [];
      for (let strand = 0; strand < STRANDS; strand++) {
        const wire = new Path2D();
        for (let i = 0; i < SAMPLES; i++) {
          const p = project(
            strandPoint(paths, i, strand, progress),
            width,
            height,
            progress,
          );
          const at = (strand * SAMPLES + i) * 2;
          cache.coordinates[at] = p.x;
          cache.coordinates[at + 1] = p.y;
          if (i === 0) wire.moveTo(p.x, p.y);
          else wire.lineTo(p.x, p.y);
        }
        cache.wires.push(wire);
      }
    }
    if (changed) {
      // Cache the floor and wires; idle frames only restore this image and move two pulses.
      ctx.strokeStyle = line;
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.moveTo(width * 0.5, height * 0.42);
        ctx.lineTo(width * (i / 4 - 0.25), height);
        ctx.stroke();
      }
      for (const y of [0.68, 0.8, 0.97]) {
        ctx.beginPath();
        ctx.moveTo(0, height * y);
        ctx.lineTo(width, height * y);
        ctx.stroke();
      }
      for (let strand = 0; strand < STRANDS; strand++) {
        ctx.strokeStyle = blue;
        ctx.globalAlpha = 0.26 + (strand % 4) * 0.19;
        ctx.lineWidth = compact ? 0.9 : 1.05 + (strand % 3) * 0.3;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke(cache.wires[strand]);
      }
      cache.image.width = canvas.width;
      cache.image.height = canvas.height;
      cache.image.getContext("2d")?.drawImage(canvas, 0, 0);
    } else {
      ctx.globalAlpha = 1;
      ctx.drawImage(cache.image, 0, 0, width, height);
    }
    for (const strand of [3, 13]) {
      const pulse = ((now / 4400 + strand / STRANDS) % 1) * (SAMPLES - 12);
      ctx.beginPath();
      for (let i = Math.floor(pulse); i < Math.min(SAMPLES, pulse + 9); i++) {
        const at = (strand * SAMPLES + i) * 2;
        if (i === Math.floor(pulse))
          ctx.moveTo(cache.coordinates[at], cache.coordinates[at + 1]);
        else ctx.lineTo(cache.coordinates[at], cache.coordinates[at + 1]);
      }
      ctx.globalAlpha = 0.95;
      ctx.strokeStyle = green;
      ctx.lineWidth = compact ? 1.8 : 2.2;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    canvas.dataset.progress = progress.toFixed(3);
    canvas.dataset.frame = String(index);
  }
  function tick(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden || !moving()) return;
    if (now - last < 32 && !dirty) {
      request();
      return;
    }
    last = now;
    dirty = false;
    const progress = localProgress(
      root.getBoundingClientRect().top,
      extent,
      stage.offsetHeight,
      inset,
    );
    if (!compact) {
      const activeLink = links.contains(document.activeElement);
      const show = (progress >= 0.64 && progress <= 0.83) || activeLink;
      links.inert = !show;
      root.dataset.links = show ? "visible" : "hidden";
      root.dataset.act =
        progress < 0.2
          ? "arrival"
          : progress < 0.55
            ? "signature"
            : progress < 0.83
              ? "projects"
              : "trajectory";
      draw(canvases[0], contexts[0]!, progress, now, 0);
    } else {
      links.inert = false;
      canvases.slice(1).forEach((canvas, i) => {
        const bounds = canvas.getBoundingClientRect();
        if (bounds.top > innerHeight || bounds.bottom < 0) return;
        const local = Math.max(
          0,
          Math.min(
            1,
            (innerHeight - bounds.top) / (innerHeight + bounds.height),
          ),
        );
        const p =
          i === 0 ? 0.25 + local * 0.17 : i === 1 ? 0.72 : 0.94 + local * 0.06;
        draw(canvas, contexts[i + 1]!, p, now, i + 1);
      });
    }
    root.dataset.animated = "true";
    root.dataset.frames = String(++frames);
    root.dataset.running = "true";
    request();
  }
  function request() {
    if (!frame && visible && !document.hidden && moving())
      frame = requestAnimationFrame(tick);
  }
  function suspend() {
    cancelAnimationFrame(frame);
    frame = 0;
    root.dataset.running = "false";
  }
  function visibility() {
    if (document.hidden) suspend();
    else request();
  }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleElements.add(entry.target);
      else visibleElements.delete(entry.target);
    }
    visible = visibleElements.size > 0;
    if (visible) request();
    else suspend();
  });
  // Observe the visible stage, not the long sticky container above the viewport.
  [stage, ...canvases.slice(1)].forEach((el) => observer.observe(el));
  const resize = new ResizeObserver(metrics);
  resize.observe(root);
  resize.observe(stage);
  canvases.slice(1).forEach((canvas) => resize.observe(canvas));
  const theme = new MutationObserver(metrics);
  theme.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", metrics);
  document.addEventListener("visibilitychange", visibility);
  metrics();
  return () => {
    disposed = true;
    suspend();
    observer.disconnect();
    resize.disconnect();
    theme.disconnect();
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", metrics);
    document.removeEventListener("visibilitychange", visibility);
    delete root.dataset.animated;
    delete root.dataset.links;
    links.inert = false;
  };
}

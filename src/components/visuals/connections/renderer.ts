import {
  createPaths,
  localProgress,
  project,
  SAMPLES,
  STRANDS,
  strandPoint,
  centerPoint,
  knotWeight,
  occludes,
  smooth,
  type Point,
} from "./geometry";

type Segment = { z: number; width: number; center: Path2D; wires: Path2D[] };

export function mountConnections(root: HTMLElement, moving: () => boolean) {
  const stage = root.querySelector<HTMLElement>(".cable-stage")!;
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
    frames = 0,
    elapsed = 0;
  let width = 0,
    height = 0,
    compact = false,
    extent = 0,
    inset = 0;
  let blue = "",
    green = "",
    line = "",
    exit = -0.9,
    background = "",
    tube = "";
  let paths = createPaths(false, exit);
  const caches = canvases.map(() => ({
    progress: -1,
    coordinates: new Float32Array(STRANDS * SAMPLES * 3),
    wires: [] as Path2D[],
    segments: [] as Segment[],
    pulseVisible: new Uint8Array(SAMPLES),
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
    background = styles.getPropertyValue("--bg").trim();
    tube = styles.getPropertyValue("--blue-soft").trim();
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
          const at = (strand * SAMPLES + i) * 3;
          cache.coordinates[at] = p.x;
          cache.coordinates[at + 1] = p.y;
          cache.coordinates[at + 2] = p.z;
          if (i === 0) wire.moveTo(p.x, p.y);
          else wire.lineTo(p.x, p.y);
        }
        cache.wires.push(wire);
      }
      const centers = Array.from({ length: SAMPLES }, (_, i) =>
        project(centerPoint(paths, i, progress), width, height, progress),
      );
      const radii = centers.map((p, i) => {
        let radius = 0;
        for (let strand = 0; strand < STRANDS; strand++) {
          const at = (strand * SAMPLES + i) * 3;
          radius = Math.max(
            radius,
            Math.hypot(
              cache.coordinates[at] - p.x,
              cache.coordinates[at + 1] - p.y,
            ),
          );
        }
        return radius + 1.4;
      });
      cache.segments = [];
      cache.pulseVisible.fill(1);
      if (knotWeight(progress) > 0.1) {
        const front = new Uint8Array(SAMPLES);
        for (let i = 0; i < SAMPLES; i++) {
          const at = (3 * SAMPLES + i) * 3;
          const point: Point = {
            x: cache.coordinates[at],
            y: cache.coordinates[at + 1],
            z: cache.coordinates[at + 2],
          };
          for (let j = 0; j < SAMPLES - 1; j++) {
            if (Math.abs(i - j) <= 7) continue;
            if (
              occludes(
                point,
                centers[j],
                centers[j + 1],
                (radii[j] + radii[j + 1]) / 2,
              )
            ) {
              cache.pulseVisible[i] = 0;
            }
            if (
              occludes(
                centers[i],
                centers[j],
                centers[j + 1],
                (radii[j] + radii[j + 1]) / 2,
              )
            )
              front[j] = 1;
          }
        }
        for (let from = 0; from < SAMPLES - 1; from++) {
          if (!front[from]) continue;
          let end = from;
          while (front[end + 1]) end++;
          const lo = Math.max(0, from - 1),
            hi = Math.min(SAMPLES - 1, end + 2);
          const center = new Path2D(),
            wires = Array.from({ length: STRANDS }, () => new Path2D());
          for (let i = lo; i <= hi; i++) {
            if (i === lo) center.moveTo(centers[i].x, centers[i].y);
            else center.lineTo(centers[i].x, centers[i].y);
          }
          const wireStart = Math.max(0, lo - 7),
            wireEnd = Math.min(SAMPLES - 1, hi + 7);
          for (let i = wireStart; i <= wireEnd; i++)
            for (let strand = 0; strand < STRANDS; strand++) {
              const at = (strand * SAMPLES + i) * 3;
              if (i === wireStart)
                wires[strand].moveTo(
                  cache.coordinates[at],
                  cache.coordinates[at + 1],
                );
              else
                wires[strand].lineTo(
                  cache.coordinates[at],
                  cache.coordinates[at + 1],
                );
            }
          cache.segments.push({
            z: centers[Math.floor((lo + hi) / 2)].z,
            width: Math.max(...radii.slice(lo, hi + 1)) * 2,
            center,
            wires,
          });
          from = end;
        }
        cache.segments.sort((a, b) => b.z - a.z);
      }
      canvas.dataset.occludedSamples = String(
        cache.pulseVisible.filter((value) => !value).length,
      );
    }
    if (changed) {
      // Cache the floor and wires; idle frames only restore this image and move the pulse.
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
      const paintWires = (wires: Path2D[]) => {
        for (let strand = 0; strand < STRANDS; strand++) {
          ctx.strokeStyle = blue;
          ctx.globalAlpha = 0.26 + (strand % 4) * 0.19;
          ctx.lineWidth = compact ? 0.9 : 1.05 + (strand % 3) * 0.3;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          ctx.stroke(wires[strand]);
        }
      };
      paintWires(cache.wires);
      if (cache.segments.length) {
        // Opaque, depth-sorted cable sections hide the rear crossing, not just its pulse.
        for (const segment of cache.segments) {
          ctx.globalAlpha = 1;
          ctx.lineCap = "butt";
          ctx.lineJoin = "round";
          ctx.strokeStyle = background;
          ctx.lineWidth = segment.width;
          ctx.stroke(segment.center);
          ctx.strokeStyle = tube;
          ctx.lineWidth = Math.max(1, segment.width - 2);
          ctx.stroke(segment.center);
          paintWires(segment.wires);
        }
      }
      cache.image.width = canvas.width;
      cache.image.height = canvas.height;
      cache.image.getContext("2d")?.drawImage(canvas, 0, 0);
    } else {
      ctx.globalAlpha = 1;
      ctx.drawImage(cache.image, 0, 0, width, height);
    }
    {
      const phase =
        progress >= 0.53 && progress < 0.68
          ? 0.45 + smooth(0.53, 0.68, progress) * 0.4
          : progress >= 0.83
            ? 0.75 + smooth(0.83, 1, progress) * 0.25
            : (now / 4800) % 1;
      const pulse = phase * (SAMPLES - 9);
      ctx.beginPath();
      let penDown = false;
      for (let i = Math.floor(pulse); i < Math.min(SAMPLES, pulse + 9); i++) {
        if (!cache.pulseVisible[i]) {
          penDown = false;
          continue;
        }
        const at = (3 * SAMPLES + i) * 3;
        if (!penDown)
          ctx.moveTo(cache.coordinates[at], cache.coordinates[at + 1]);
        else ctx.lineTo(cache.coordinates[at], cache.coordinates[at + 1]);
        penDown = true;
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
    if (last) elapsed += Math.min(64, now - last);
    last = now;
    dirty = false;
    const progress = localProgress(
      root.getBoundingClientRect().top,
      extent,
      stage.offsetHeight,
      inset,
    );
    if (!compact) {
      root.dataset.act =
        progress < 0.2
          ? "arrival"
          : progress < 0.55
            ? "signature"
            : progress < 0.83
              ? "knot"
              : "trajectory";
      draw(canvases[0], contexts[0]!, progress, elapsed, 0);
    } else {
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
          i === 0
            ? 0.25 + local * 0.17
            : i === 1
              ? 0.7 + local * 0.1
              : 0.94 + local * 0.06;
        draw(canvas, contexts[i + 1]!, p, elapsed, i + 1);
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
    last = 0;
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
  };
}

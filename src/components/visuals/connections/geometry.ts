export type Point = { x: number; y: number; z: number };
export const STRANDS = 18;
export const SAMPLES = 180;
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const smooth = (a: number, b: number, n: number) => {
  const t = clamp((n - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export const localProgress = (
  top: number,
  height: number,
  stage: number,
  inset: number,
) => clamp((inset - top) / Math.max(1, height - stage));

// Equal-distance samples keep corresponding strands continuous through every act.
export function samplePath(vertices: number[][], count = SAMPLES): Point[] {
  const points = vertices.map(([x, y, z = 0]) => ({ x, y, z }));
  const distances = [0];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1],
      b = points[i];
    distances.push(
      distances[i - 1] + Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z),
    );
  }
  let segment = 1;
  return Array.from({ length: count }, (_, i) => {
    const distance = (distances[distances.length - 1] * i) / (count - 1);
    while (segment < points.length - 1 && distances[segment] < distance)
      segment++;
    const a = points[segment - 1],
      b = points[segment];
    const t =
      (distance - distances[segment - 1]) /
      (distances[segment] - distances[segment - 1] || 1);
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      z: a.z + (b.z - a.z) * t,
    };
  });
}

export function createPaths(compact: boolean, exit: number) {
  const rounded = (vertices: number[][]) => {
    let points = vertices.map(([x, y, z = 0]) => [x, y, z]);
    for (let pass = 0; pass < 2; pass++) {
      const next = [points[0]];
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1],
          b = points[i];
        next.push(
          a.map((n, axis) => n * 0.9 + b[axis] * 0.1),
          a.map((n, axis) => n * 0.1 + b[axis] * 0.9),
        );
      }
      next.push(points[points.length - 1]);
      points = next;
    }
    return samplePath(points);
  };
  const signature = rounded([
    [-1.2, 0.4, 0.04],
    [-0.83, 0.4],
    [-0.83, -0.42],
    [-0.5, 0.24, -0.08],
    [-0.17, -0.42],
    [-0.17, 0.4],
    [0.17, 0.4],
    [0.17, -0.42],
    [0.5, 0.24, 0.08],
    [0.83, -0.42],
    [0.83, 0.4],
    [1.2, 0.4, 0.04],
  ]);
  const arrival = rounded([
    [-1.25, 0.88, 0.25],
    [-0.65, 0.42],
    [0.05, -0.08, -0.15],
    [1.25, -0.72, 0.2],
  ]);
  const scale = compact ? 1.05 : 1;
  const core = Array.from({ length: 241 }, (_, i) => {
    const t = Math.PI + 0.15 + (i / 240) * (2 * Math.PI - 0.3);
    return [
      ((Math.sin(t) + 2 * Math.sin(2 * t)) / 3) * 0.94 * scale,
      (-(Math.cos(t) - 2 * Math.cos(2 * t)) / 3) * 0.9 * scale - 0.12,
      -Math.sin(3 * t) * 0.36,
    ];
  });
  const knot = samplePath([
    [-1.2, 0.4, 0.04],
    [-0.65, 0.72, -0.08],
    ...core,
    [0.65, 0.72, 0.08],
    [1.2, 0.4, 0.04],
  ]);
  const handoff = rounded([
    [-1.2, 0.4],
    [-0.65, 0.32],
    [exit, 0.48, 0.05],
    [exit, 0.8],
    [exit, 1.17],
  ]);
  return { signature, arrival, knot, handoff };
}

export const knotWeight = (progress: number) =>
  smooth(0.53, 0.68, progress) * (1 - smooth(0.83, 0.99, progress));

export function centerPoint(
  paths: ReturnType<typeof createPaths>,
  index: number,
  progress: number,
): Point {
  const signature = smooth(0.06, 0.27, progress);
  const knot = smooth(0.53, 0.68, progress);
  const exit = smooth(0.83, 0.99, progress);
  const a = paths.arrival[index],
    b = paths.signature[index],
    c = paths.knot[index],
    d = paths.handoff[index];
  const mix = (key: keyof Point) => {
    const ab = a[key] + (b[key] - a[key]) * signature;
    const abc = ab + (c[key] - ab) * knot;
    return abc + (d[key] - abc) * exit;
  };
  return { x: mix("x"), y: mix("y"), z: mix("z") };
}

export function strandPoint(
  paths: ReturnType<typeof createPaths>,
  index: number,
  strand: number,
  progress: number,
): Point {
  const exit = smooth(0.83, 0.99, progress);
  const point = centerPoint(paths, index, progress);
  const before = centerPoint(paths, Math.max(0, index - 1), progress);
  const after = centerPoint(paths, Math.min(SAMPLES - 1, index + 1), progress);
  const tangent = Math.atan2(after.y - before.y, after.x - before.x);
  const twist = (strand * Math.PI * 2) / STRANDS + index * 0.12;
  const radius = 0.014 + (0.022 * (strand % 3)) / 2;
  const spread = 1 - exit * 0.97;
  const arrivalFan =
    (strand - (STRANDS - 1) / 2) *
    0.025 *
    (1 - smooth(0.02, 0.2, progress)) *
    (1 - index / (SAMPLES - 1)) ** 2;
  return {
    x: point.x - Math.sin(tangent) * Math.cos(twist) * radius * spread,
    y:
      point.y +
      Math.cos(twist) * Math.cos(tangent) * radius * spread +
      arrivalFan,
    z: point.z + Math.sin(twist) * 0.055 * spread,
  };
}

export function project(
  point: Point,
  width: number,
  height: number,
  progress: number,
) {
  const weight = knotWeight(progress);
  const angle =
    Math.sin(progress * Math.PI) * 0.11 * (1 - weight) +
    (0.22 + 0.32 * smooth(0.68, 0.83, progress)) * weight;
  const x = point.x * Math.cos(angle) + point.z * Math.sin(angle);
  const z = point.z * Math.cos(angle) - point.x * Math.sin(angle);
  const pitch = -0.22 * weight;
  const y = point.y * Math.cos(pitch) - z * Math.sin(pitch);
  const depth = point.y * Math.sin(pitch) + z * Math.cos(pitch);
  const perspective = 3.6 / (3.6 + depth);
  const isotropic = Math.min(width * 0.52, height * 0.5);
  const scaleX = width * 0.46 * (1 - weight) + isotropic * weight;
  const scaleY = height * 0.43 * (1 - weight) + isotropic * weight;
  return {
    x: width * 0.5 + x * scaleX * perspective,
    y: height * 0.5 + y * scaleY * perspective,
    z: depth,
    depth: perspective,
  };
}

export function occludes(point: Point, a: Point, b: Point, radius: number) {
  const dx = b.x - a.x,
    dy = b.y - a.y;
  const t = clamp(
    ((point.x - a.x) * dx + (point.y - a.y) * dy) / (dx * dx + dy * dy || 1),
  );
  const z = a.z + (b.z - a.z) * t;
  return (
    z < point.z - 0.045 &&
    Math.hypot(point.x - a.x - dx * t, point.y - a.y - dy * t) < radius
  );
}

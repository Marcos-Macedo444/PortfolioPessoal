export type Point = { x: number; y: number; z: number };
export const STRANDS = 18;
export const SAMPLES = 140;
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
  const branches = [0, 1, 2].map((i) => {
    const y = (i - 1) * (compact ? 0.48 : 0.36);
    return rounded([
      [-1.2, 0.4],
      [-0.7, 0.4],
      [compact ? -0.65 : -0.42, 0.23, -0.1],
      [compact ? -0.52 : -0.14, y, 0.05],
      [compact ? -0.36 : 0.31, y, 0],
    ]);
  });
  const handoff = rounded([
    [-1.2, 0.4],
    [-0.65, 0.32],
    [exit, 0.48, 0.05],
    [exit, 0.8],
    [exit, 1.17],
  ]);
  return { signature, arrival, branches, handoff };
}

export function strandPoint(
  paths: ReturnType<typeof createPaths>,
  index: number,
  strand: number,
  progress: number,
): Point {
  const signature = smooth(0.06, 0.27, progress);
  const projects = smooth(0.53, 0.65, progress);
  const exit = smooth(0.83, 0.99, progress);
  const mix = (key: keyof Point, at = index) => {
    const a = paths.arrival[at],
      b = paths.signature[at];
    const c = paths.branches[Math.floor(strand / (STRANDS / 3))][at],
      d = paths.handoff[at];
    const ab = a[key] + (b[key] - a[key]) * signature;
    const abc = ab + (c[key] - ab) * projects;
    return abc + (d[key] - abc) * exit;
  };
  const before = Math.max(0, index - 1),
    after = Math.min(SAMPLES - 1, index + 1);
  const tangent = Math.atan2(
    mix("y", after) - mix("y", before),
    mix("x", after) - mix("x", before),
  );
  const twist = (strand * Math.PI * 2) / STRANDS + index * 0.12;
  const radius = 0.014 + (0.022 * (strand % 3)) / 2;
  const spread = 1 - exit * 0.82;
  const arrivalFan =
    (strand - (STRANDS - 1) / 2) *
    0.025 *
    (1 - smooth(0.02, 0.2, progress)) *
    (1 - index / (SAMPLES - 1)) ** 2;
  return {
    x: mix("x") - Math.sin(tangent) * Math.cos(twist) * radius * spread,
    y:
      mix("y") +
      Math.cos(twist) * Math.cos(tangent) * radius * spread +
      arrivalFan,
    z: mix("z") + Math.sin(twist) * 0.075 * spread,
  };
}

export function project(
  point: Point,
  width: number,
  height: number,
  progress: number,
) {
  // Camera settles at the HTML endpoints during the project reading window.
  const angle =
    Math.sin(progress * Math.PI) * 0.11 * (1 - smooth(0.52, 0.65, progress));
  const x = point.x * Math.cos(angle) + point.z * Math.sin(angle);
  const z = point.z * Math.cos(angle) - point.x * Math.sin(angle);
  const perspective = 3.6 / (3.6 + z);
  return {
    x: width * (0.5 + x * 0.46 * perspective),
    y: height * (0.5 + point.y * 0.43 * perspective),
    depth: perspective,
  };
}

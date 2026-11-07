const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const vm = require("node:vm");
const test = require("node:test");
const source = fs.readFileSync(
  "src/components/visuals/connections/geometry.ts",
  "utf8",
);
const geometry = {};
vm.runInNewContext(
  ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  { exports: geometry, Math },
);
const {
  createPaths,
  strandPoint,
  project,
  samplePath,
  localProgress,
  SAMPLES,
  STRANDS,
  centerPoint,
  occludes,
} = geometry;

test("distance sampling keeps equal steps along a polyline", () => {
  const points = samplePath(
    [
      [0, 0],
      [1, 0],
      [1, 2],
    ],
    7,
  );
  assert.equal(points.length, 7);
  for (let i = 1; i < points.length; i++)
    assert.ok(
      Math.abs(
        Math.hypot(
          points[i].x - points[i - 1].x,
          points[i].y - points[i - 1].y,
        ) - 0.5,
      ) < 1e-8,
    );
});
test("local scroll progress is bounded and reversible", () => {
  assert.equal(localProgress(1000, 2000, 800, 88), 0);
  assert.equal(localProgress(-2000, 2000, 800, 88), 1);
  assert.equal(localProgress(-512, 2000, 800, 88), 0.5);
  assert.equal(
    localProgress(-512, 2000, 800, 88),
    localProgress(-512, 2000, 800, 88),
  );
});
test("all four acts stay finite and continuous in both layouts", () => {
  for (const compact of [false, true]) {
    const paths = createPaths(compact, -0.9);
    for (let strand = 0; strand < STRANDS; strand++) {
      for (let i = 0; i < SAMPLES; i += 7) {
        for (const p of [0.06, 0.2, 0.27, 0.53, 0.55, 0.65, 0.83, 0.99, 1]) {
          const a = strandPoint(paths, i, strand, p);
          const b = strandPoint(paths, i, strand, Math.min(1, p + 0.00001));
          for (const key of ["x", "y", "z"]) {
            assert.ok(Number.isFinite(a[key]));
            assert.ok(Math.abs(a[key] - b[key]) < 0.001);
          }
        }
      }
    }
  }
});
test("the knot has three separated depth crossings and a sideways camera", () => {
  const paths = createPaths(false, -0.9);
  const points = paths.knot.map((p) => project(p, 1440, 820, 0.73));
  let crossings = 0;
  for (let i = 0; i < points.length - 1; i++)
    for (let j = i + 9; j < points.length - 1; j++) {
      const a = points[i],
        b = points[i + 1],
        c = points[j],
        d = points[j + 1];
      const dx = b.x - a.x,
        dy = b.y - a.y,
        ex = d.x - c.x,
        ey = d.y - c.y;
      const denominator = dx * ey - dy * ex;
      if (Math.abs(denominator) < 0.001) continue;
      const t = ((c.x - a.x) * ey - (c.y - a.y) * ex) / denominator;
      const u = ((c.x - a.x) * dy - (c.y - a.y) * dx) / denominator;
      if (
        t > 0 &&
        t < 1 &&
        u > 0 &&
        u < 1 &&
        Math.abs(a.z + (b.z - a.z) * t - c.z - (d.z - c.z) * u) > 0.1
      )
        crossings++;
    }
  assert.ok(crossings >= 3, `Expected separated crossings, got ${crossings}`);
  const center = centerPoint(paths, 60, 0.7);
  const first = project(center, 1440, 820, 0.7),
    second = project(center, 1440, 820, 0.8);
  assert.ok(Math.hypot(first.x - second.x, first.y - second.y) > 2);
});
test("only a nearer crossing occludes a pulse at the same screen position", () => {
  const point = { x: 5, y: 5, z: 0.3 };
  assert.equal(
    occludes(point, { x: 0, y: 5, z: -0.3 }, { x: 10, y: 5, z: -0.3 }, 2),
    true,
  );
  assert.equal(
    occludes(point, { x: 0, y: 5, z: 0.5 }, { x: 10, y: 5, z: 0.5 }, 2),
    false,
  );
  assert.equal(
    occludes(point, { x: 0, y: 10, z: -0.3 }, { x: 10, y: 10, z: -0.3 }, 2),
    false,
  );
});
test("final cable endpoint follows the measured timeline rail on resize", () => {
  for (const width of [320, 360, 768, 1440, 1920]) {
    const rail =
      width <= 700
        ? 29
        : width <= 1200
          ? 63
          : Math.max(83, (width - 1328) / 2 + 27);
    const exit = (rail / width - 0.5) / 0.46;
    const paths = createPaths(width <= 700, exit);
    const p = project(paths.handoff[SAMPLES - 1], width, 820, 1);
    assert.ok(Math.abs(p.x - rail) < 0.01);
  }
});

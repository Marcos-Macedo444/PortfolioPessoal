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
test("project camera settles at the three HTML anchor heights", () => {
  const paths = createPaths(false, -0.9);
  paths.branches.forEach((branch, i) => {
    const a = project(branch[SAMPLES - 1], 1440, 820, 0.7);
    const b = project(branch[SAMPLES - 1], 1440, 820, 0.81);
    assert.equal(a.x, b.x);
    assert.equal(a.y, b.y);
    assert.ok(Math.abs(a.x / 1440 - 0.6426) < 1e-8);
    assert.ok(Math.abs(a.y / 820 - [0.3452, 0.5, 0.6548][i]) < 1e-8);
  });
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

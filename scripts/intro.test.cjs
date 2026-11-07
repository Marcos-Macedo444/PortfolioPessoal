const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(
  path.join(__dirname, "../public/preferences.js"),
  "utf8",
);

function boot(options = {}) {
  const dataset = {};
  const timers = new Map();
  const events = { document: new Map(), window: new Map() };
  const local = new Map(Object.entries(options.local || {}));
  const session = options.session || new Map();
  const storage = (values) => ({
    getItem(key) {
      if (options.blockStorage) throw new Error("Unavailable");
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      if (options.blockStorage) throw new Error("Unavailable");
      values.set(key, value);
    },
  });
  const surface = (name) => ({
    addEventListener(event, callback) {
      events[name].set(event, callback);
    },
    removeEventListener(event) {
      events[name].delete(event);
    },
  });
  class Element {
    constructor(selector) {
      this.selector = selector;
    }
    closest(selector) {
      return selector === this.selector ? this : null;
    }
  }
  const context = {
    document: { documentElement: { dataset }, ...surface("document") },
    window: surface("window"),
    localStorage: storage(local),
    sessionStorage: storage(session),
    matchMedia: () => ({ matches: Boolean(options.reduced) }),
    performance: {
      now: () => 100,
      getEntriesByType: () => [{ type: options.navigation || "navigate" }],
    },
    location: { hash: options.hash || "" },
    scrollY: options.scrollY || 0,
    setTimeout(callback, delay) {
      timers.set(1, { callback, delay });
      return 1;
    },
    clearTimeout(id) {
      timers.delete(id);
    },
    Element,
  };
  vm.runInNewContext(source, context);
  return { dataset, timers, events, session, Element };
}

test("first session prepares a brief opening with an independent 1.9s safety exit", () => {
  const state = boot();
  assert.equal(state.dataset.intro, "pending");
  assert.equal(state.dataset.motion, "on");
  assert.equal(state.timers.get(1).delay, 1900);
  state.timers.get(1).callback();
  assert.equal(state.dataset.intro, "done");
  assert.equal(state.events.document.size, 0);
  assert.equal(state.events.window.size, 0);
});

test("same session does not replay on reload", () => {
  const first = boot();
  assert.equal(boot({ session: first.session }).dataset.intro, "done");
});

test("direct anchors, restored scroll and history navigation do not show the opening", () => {
  for (const options of [
    { hash: "#jornada" },
    { scrollY: 450 },
    { navigation: "back_forward" },
  ]) {
    const state = boot(options);
    assert.equal(state.dataset.intro, "done");
    assert.equal(state.timers.size, 0);
  }
});

test("reduced motion and saved pause skip the introduction without changing the saved theme", () => {
  for (const options of [
    { reduced: true },
    { local: { "mm-motion": "paused", "mm-theme": "light" } },
  ]) {
    const state = boot(options);
    assert.equal(state.dataset.intro, "done");
    assert.equal(state.dataset.motion, "off");
    assert.equal(state.timers.size, 0);
  }
  assert.equal(
    boot({ local: { "mm-motion": "paused", "mm-theme": "light" } }).dataset
      .theme,
    "light",
  );
});

test("skip works before React hydration and removes its listeners", () => {
  const state = boot();
  state.events.document.get("click")({
    target: new state.Element("[data-skip-intro]"),
  });
  assert.equal(state.dataset.intro, "done");
  assert.equal(state.timers.size, 0);
  assert.equal(state.events.document.size, 0);
});

test("keyboard and native navigation can dismiss the opening immediately", () => {
  for (const key of ["Tab", "Escape"]) {
    const state = boot();
    state.events.document.get("keydown")({ key });
    assert.equal(state.dataset.intro, "done");
  }
  for (const event of ["pagehide", "hashchange", "wheel"]) {
    const state = boot();
    state.events.window.get(event)();
    assert.equal(state.dataset.intro, "done");
  }
});

test("blocked storage remains functional and still releases the entrance", () => {
  const state = boot({ blockStorage: true });
  assert.equal(state.dataset.theme, "dark");
  assert.equal(state.dataset.intro, "pending");
  state.timers.get(1).callback();
  assert.equal(state.dataset.intro, "done");
});

test("blue is the first-paint default for missing, invalid and legacy automatic preferences", () => {
  for (const saved of [undefined, "system", "auto", "invalid"]) {
    assert.equal(
      boot({ local: saved ? { "mm-theme": saved } : {} }).dataset.theme,
      "dark",
    );
  }
});

test("explicit legacy dark and light choices are preserved before hydration", () => {
  for (const saved of ["dark", "light"]) {
    assert.equal(boot({ local: { "mm-theme": saved } }).dataset.theme, saved);
  }
});

test("assembled opening reuses the official separate Ms and color points", () => {
  const ts = require("typescript");
  const brand = {};
  const source = fs.readFileSync(
    path.join(__dirname, "../src/components/ui/Monogram.tsx"),
    "utf8",
  );
  vm.runInNewContext(
    ts.transpileModule(source, {
      fileName: "Monogram.tsx",
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.CommonJS,
      },
    }).outputText,
    { exports: brand, require },
  );
  assert.equal(brand.monogramSegments.length, 8);
  const html = require("react-dom/server").renderToStaticMarkup(
    require("react").createElement(brand.Monogram, { assemble: true }),
  );
  assert.ok(html.includes('viewBox="0 0 112 56"'));
  assert.equal((html.match(/class="intro-piece"/g) || []).length, 8);
  assert.ok(html.includes('cx="6" cy="46" r="3"'));
  assert.ok(html.includes('cx="106" cy="10" r="3"'));
});

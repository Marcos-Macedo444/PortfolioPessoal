(function () {
  var root = document.documentElement;
  var theme = "dark";
  var paused = false;
  try {
    var saved = localStorage.getItem("mm-theme");
    if (saved === "dark" || saved === "light") theme = saved;
    paused = localStorage.getItem("mm-motion") === "paused";
  } catch {}
  root.dataset.theme = theme;
  var motion =
    !paused && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.dataset.motion = motion ? "on" : "off";
  var seen = false;
  try {
    seen = sessionStorage.getItem("mm-intro-seen") === "1";
  } catch {}
  var navigation = performance.getEntriesByType("navigation")[0];
  if (
    !motion ||
    seen ||
    location.hash ||
    scrollY > 0 ||
    (navigation && navigation.type === "back_forward")
  ) {
    root.dataset.intro = "done";
    return;
  }
  try {
    sessionStorage.setItem("mm-intro-seen", "1");
  } catch {}
  root.dataset.intro = "pending";
  root.dataset.introStarted = String(performance.now());
  var release = function () {
    root.dataset.intro = "done";
    clearTimeout(safety);
    document.removeEventListener("keydown", key);
    document.removeEventListener("focusin", focus);
    window.removeEventListener("hashchange", release);
    window.removeEventListener("pagehide", release);
    window.removeEventListener("wheel", release);
  };
  var key = function (event) {
    if (event.key === "Escape" || event.key === "Tab") release();
  };
  var focus = function (event) {
    if (
      event.target instanceof Element &&
      !event.target.closest(".brand-intro")
    )
      release();
  };
  var safety = setTimeout(release, 2400);
  document.addEventListener("keydown", key);
  document.addEventListener("focusin", focus);
  window.addEventListener("hashchange", release);
  window.addEventListener("pagehide", release);
  window.addEventListener("wheel", release, { passive: true });
})();

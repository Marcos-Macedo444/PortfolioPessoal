try {
  var theme = localStorage.getItem("mm-theme");
  document.documentElement.dataset.theme =
    theme === "dark" || theme === "light" ? theme : "system";
  document.documentElement.dataset.motion =
    localStorage.getItem("mm-motion") === "paused" ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "off"
      : "on";
} catch {}

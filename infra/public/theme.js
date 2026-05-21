// Shared day/night theme: applies the theme before first paint (no flash) and
// wires any #theme-toggle button on the page. Loaded as a render-blocking
// <script src="/theme.js"></script> in <head> so data-theme is set early.
//
// An explicit choice (localStorage "theme") wins; otherwise follow the OS
// preference, and keep following it until the user picks one.
(function () {
  var root = document.documentElement;
  function stored() { try { return localStorage.getItem("theme"); } catch (e) { return null; } }
  function system() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function effective() {
    var t = stored();
    return t === "light" || t === "dark" ? t : system();
  }
  function label(btn) {
    if (!btn) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", "Switch to " + next + " mode");
  }

  // Apply immediately, before the body paints.
  root.setAttribute("data-theme", effective());

  function wire() {
    var btn = document.getElementById("theme-toggle");
    label(btn);
    if (btn) {
      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
        label(btn);
      });
    }
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function (e) {
        if (stored()) return; // explicit choice overrides the OS
        root.setAttribute("data-theme", e.matches ? "light" : "dark");
        label(document.getElementById("theme-toggle"));
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire);
  else wire();
})();

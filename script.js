/* ============================================================
   FROM CRAMMING TO COMMANDING — interactions
   ============================================================ */

(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var nav = document.getElementById("siteNav");
  var navToggle = document.getElementById("navToggle");
  var mobileCta = document.getElementById("mobileCta");
  var copyStatus = document.getElementById("copyStatus");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- sticky header + mobile CTA ---------- */
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (mobileCta) mobileCta.classList.toggle("is-visible", y > 520);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  function closeMenu() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      closeMenu();
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.08 });

    revealItems.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- copy to clipboard ---------- */
  function legacyCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-9999px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }).catch(function () {
        return legacyCopy(text);
      });
    }
    return Promise.resolve(legacyCopy(text));
  }

  function announce(message) {
    if (!copyStatus) return;
    copyStatus.textContent = message;
    window.clearTimeout(announce.timer);
    announce.timer = window.setTimeout(function () {
      copyStatus.textContent = "";
    }, 2500);
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-copy-target]"), function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.getAttribute("data-copy-target"));
      if (!target) return;

      var text = (target.textContent || "").replace(/\s+/g, " ").trim();
      if (!text) return;

      copyText(text).then(function (ok) {
        if (!ok) {
          announce("Copy failed. Please select the text and copy it manually.");
          return;
        }

        button.classList.add("is-copied");
        announce("Copied: " + text);
        window.setTimeout(function () {
          button.classList.remove("is-copied");
        }, 1800);
      });
    });
  });

  /* ---------- payment reference builder ---------- */
  var childName = document.getElementById("childName");
  var childClass = document.getElementById("childClass");
  var refText = document.getElementById("refText");
  var SAMPLE_REFERENCE = "Musa Ayo – JSS2 – Book";

  function clean(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function updateReference() {
    if (!refText || !childName || !childClass) return;

    var name = clean(childName.value);
    var klass = clean(childClass.value);

    if (!name && !klass) {
      refText.textContent = SAMPLE_REFERENCE;
      return;
    }

    refText.textContent = (name || "Child's name") + " – " + (klass || "Class") + " – Book";
  }

  if (childName && childClass) {
    [childName, childClass].forEach(function (input) {
      input.addEventListener("input", updateReference);
    });
  }

  /* ---------- FAQ: one open at a time ---------- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq details"));
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();

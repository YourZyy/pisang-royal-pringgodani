import Lenis from "lenis";

/**
 * Smooth scroll (Lenis) + muncul-saat-discroll untuk judul bagian.
 * Keduanya dimatikan bila pengguna meminta gerak dikurangi.
 */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupReveal() {
  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (!items.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  items.forEach((el) => io.observe(el));
}

function setupSmoothScroll() {
  if (reduceMotion) return;

  const lenis = new Lenis({
    // Wajib: tanpa loop rAF Lenis memblokir scroll bawaan tapi tidak menggerakkan halaman.
    autoRaf: true,
    lerp: 0.09,
    wheelMultiplier: 0.95,
    smoothWheel: true,
    anchors: { offset: -80 },
  });
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

  // Panel (drawer, modal, menu seluler) mengunci scroll lewat body.style.overflow.
  // Saat terkunci, Lenis berhenti agar halaman di belakang tidak ikut bergeser.
  const syncLock = () => {
    if (document.body.style.overflow === "hidden") lenis.stop();
    else lenis.start();
  };
  new MutationObserver(syncLock).observe(document.body, {
    attributes: true,
    attributeFilter: ["style"],
  });
  syncLock();
}

setupSmoothScroll();
setupReveal();

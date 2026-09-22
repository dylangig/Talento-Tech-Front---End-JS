/* ============================================================
   Fade-in con movimiento sutil y efecto en cascada
   ------------------------------------------------------------
   Reglas de implementación:
   1. Uso estratégico, no excesivo: solo bloques estructurales
      grandes (secciones principales, contenedores de tarjetas,
      formulario de contacto). Nada de íconos ni líneas de texto.
   2. Accesibilidad: si el sistema tiene "reducir movimiento"
      (prefers-reduced-motion), NO se aplica ninguna animación.
   3. Progresivo: sin JS el contenido se ve normal (las clases
      de ocultamiento las agrega este script, no el CSS base).
   ============================================================ */
(function () {
  "use strict";

  // --- Regla 2: respetar prefers-reduced-motion ---
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReduced.matches) return; // nada de animaciones

  // --- Regla 1: solo bloques estructurales grandes ---
  const SELECTOR = [
    "main > section",        // secciones principales (hero, stack, productos, multimedia, reseñas, contacto)
    ".grid-habilidades",     // contenedor de tarjetas de stack
    ".projects-list",        // contenedor de tarjetas de proyectos
    ".reviews-grid",         // contenedor de tarjetas de reseñas
    ".video-wrapper",        // bloque de video
    ".contact-card"          // formulario de contacto
  ].join(", ");

  const blocks = document.querySelectorAll(SELECTOR);
  if (!blocks.length || !("IntersectionObserver" in window)) return;

  blocks.forEach((el) => el.classList.add("js-fade"));

  // --- Efecto en cascada: retardo progresivo entre bloques
  //     que aparecen juntos en pantalla ---
  const observer = new IntersectionObserver(
    (entries) => {
      // solo los que entraron en viewport en este ciclo
      const visible = entries.filter((e) => e.isIntersecting);

      visible.forEach((entry, i) => {
        const el = entry.target;
        // cascada: 0ms, 90ms, 180ms... tope 360ms (ágil, sin esperas largas)
        el.style.transitionDelay = Math.min(i * 90, 360) + "ms";
        el.classList.add("is-visible");
        observer.unobserve(el); // una vez visible, no se re-anima
      });
    },
    {
      threshold: 0.12,       // arranca cuando se ve ~12% del bloque
      rootMargin: "0px 0px -40px 0px" // un poco antes de llegar al borde inferior
    }
  );

  blocks.forEach((el) => observer.observe(el));

  // Si el usuario cambia la preferencia de movimiento mientras navega,
  // se desactiva todo de inmediato.
  prefersReduced.addEventListener("change", (e) => {
    if (!e.matches) return;
    blocks.forEach((el) => {
      el.classList.remove("js-fade", "is-visible");
      el.style.transitionDelay = "";
    });
    observer.disconnect();
  });
})();

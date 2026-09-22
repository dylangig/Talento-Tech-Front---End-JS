/* ============================================================
   Lightbox / Galería por proyecto
   Clic en la imagen de una card → modal con SOLO las imágenes
   de esa card (data-gallery). Navegación ← →, ESC, miniaturas.
   ============================================================ */
(function () {
  "use strict";

  // ---------- Construcción del modal ----------
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Cerrar galería">&times;</button>
      <button class="lightbox-prev" aria-label="Imagen anterior">&#10094;</button>
      <button class="lightbox-next" aria-label="Imagen siguiente">&#10095;</button>
      <figure class="lightbox-figure">
        <img class="lightbox-img" src="" alt="">
        <figcaption class="lightbox-caption">
          <span class="lightbox-title"></span>
          <span class="lightbox-counter"></span>
        </figcaption>
      </figure>
      <div class="lightbox-thumbs" role="tablist"></div>
    </div>`;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector(".lightbox-img");
  const counterEl = overlay.querySelector(".lightbox-counter");
  const titleEl = overlay.querySelector(".lightbox-title");
  const thumbsEl = overlay.querySelector(".lightbox-thumbs");
  const btnClose = overlay.querySelector(".lightbox-close");
  const btnPrev = overlay.querySelector(".lightbox-prev");
  const btnNext = overlay.querySelector(".lightbox-next");

  let images = [];   // array de rutas de la galería activa
  let index = 0;     // imagen actual
  let lastFocused = null;

  // ---------- Render ----------
  function render() {
    imgEl.src = images[index];
    counterEl.textContent = index + 1 + " / " + images.length;
    // activar miniatura actual
    thumbsEl.querySelectorAll("img").forEach((t, i) => {
      t.classList.toggle("is-active", i === index);
      t.setAttribute("aria-selected", i === index ? "true" : "false");
    });
    // precargar la siguiente para evitar parpadeo
    const next = new Image();
    next.src = images[(index + 1) % images.length];
  }

  function open(gallery, title, startIndex) {
    images = gallery;
    index = startIndex || 0;
    titleEl.textContent = title || "";

    // miniaturas
    thumbsEl.innerHTML = "";
    gallery.forEach((src, i) => {
      const th = document.createElement("img");
      th.src = src;
      th.alt = "Miniatura " + (i + 1);
      th.className = "lightbox-thumb";
      th.addEventListener("click", () => {
        index = i;
        render();
      });
      thumbsEl.appendChild(th);
    });

    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden"; // bloquear scroll de fondo
    lastFocused = document.activeElement;
    btnClose.focus();
    render();
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function next() {
    index = (index + 1) % images.length;
    render();
  }

  function prev() {
    index = (index - 1 + images.length) % images.length;
    render();
  }

  // ---------- Eventos de las cards ----------
  document.querySelectorAll(".project-card[data-gallery]").forEach((card) => {
    const media = card.querySelector(".project-media");
    if (!media) return;

    const gallery = card.dataset.gallery.split(",").map((s) => s.trim()).filter(Boolean);
    const title = card.dataset.galleryTitle || "";

    // Hint visual "Ver galería"
    const hint = document.createElement("span");
    hint.className = "gallery-hint";
    hint.innerHTML = "&#128270; Ver galería <small>(" + gallery.length + ")</small>";
    media.appendChild(hint);
    media.setAttribute("tabindex", "0");
    media.setAttribute("role", "button");
    media.setAttribute("aria-label", "Abrir galería de " + title);

    const openFrom = () => open(gallery, title, 0);
    media.addEventListener("click", openFrom);
    media.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFrom();
      }
    });
  });

  // ---------- Controles del modal ----------
  btnClose.addEventListener("click", close);
  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);

  // Clic en el fondo oscuro cierra
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  // Teclado
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  });

  // Swipe táctil (deslizar izquierda/derecha en mobile)
  let touchX = null;
  overlay.addEventListener("touchstart", (e) => {
    touchX = e.changedTouches[0].screenX;
  }, { passive: true });
  overlay.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].screenX - touchX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX = null;
  }, { passive: true });
})();

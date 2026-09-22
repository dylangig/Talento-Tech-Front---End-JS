# Portafolio — Dylan Gigena Díaz

Sitio web personal tipo portafolio presentado como **Pre-Entrega del Proyecto** de la Clase 8 ("Git y GitHub") de la Tecnicatura en Programación — Universidad Nacional Guillermo Brown (UNaB).

## Propósito

Mostrar mi perfil como desarrollador de software y frontend, mis proyectos reales y académicos, y ofrecer un canal directo de contacto mediante un formulario.

## Secciones

| Sección | Contenido | Técnica destacada |
|---|---|---|
| Header / Nav | Logo + lista desordenada de navegación interna | Flexbox |
| Inicio (hero) | Presentación y botones de acción | Flexbox |
| Stack Tecnológico | Tarjetas de habilidades | **CSS Grid** |
| Productos y Proyectos | Cards de proyectos | **Flexbox** responsivo (`flex-wrap`) |
| Reseñas | Testimonios | **CSS Grid** (`auto-fit / minmax`) |
| Multimedia | Video de YouTube integrado | `iframe` |
| Contacto | Formulario con Formspree | **Media Queries** (2 columnas en desktop, 1 en móvil) |
| Footer | Navegación + copyright | Degradado `background` |

## Requisitos cubiertos (Pre-Entrega)

- ✅ Estructura semántica de HTML: `header`, `nav`, `main`, `section`, `footer`.
- ✅ Formulario de contacto funcional con [Formspree](https://formspree.io) (nombre, correo, mensaje).
- ✅ Archivo CSS externo (`css/styles.css`) con estilos para header, footer y lista de navegación.
- ✅ Fuentes de Google Fonts (Plus Jakarta Sans).
- ✅ Propiedades `background` aplicadas (colores, degradados).
- ✅ Diseño responsivo con **Flexbox** (sección Productos) y **Grid** (sección Reseñas).
- ✅ Sección Contacto adaptable mediante **Media Queries**.
- ✅ Contenido multimedia: imágenes locales e `iframe` de YouTube.
- ✅ Lista de navegación desordenada con enlaces internos.
- ✅ Repositorio público en GitHub + sitio publicado en GitHub Pages.

## Estructura del proyecto

```
.
├── index.html          # Página principal (HTML semántico)
├── css/
│   └── styles.css      # Estilos externos
├── img/                # Imágenes de proyectos
└── README.md
```

## Cómo verlo en local

No requiere build. Abrí `index.html` directamente en el navegador, o serví la carpeta con un servidor estático:

```bash
npx serve .
```

## Tecnologías

- HTML5 semántico
- CSS3 (Flexbox, Grid, Media Queries, variables, degradados)
- Google Fonts
- Formspree (envío de formularios)
- Git / GitHub + GitHub Pages (hosting)

## Enlaces

- **Sitio publicado:** https://dylangig.github.io/Talento-Tech-Front---End-JS/
- **Repositorio:** https://github.com/dylangig/Talento-Tech-Front---End-JS

---

© 2026 Dylan Gigena Díaz.

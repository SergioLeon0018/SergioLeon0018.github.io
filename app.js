// ====== EDITA AQUÍ TUS DATOS ======
const DATA = {
  name: "Sergio León Expósito",
  role: "Desarrollador Web / Mobile",
  summary:
    "Desarrollador junior con foco en productos limpios, rápidos y bien estructurados. Me muevo entre frontend y backend.",
  location: "Madrid, España",
  email: "serleon0018@gmail.com",
  phone: "+34 601131295",
  github: "https://github.com/SergioLeon0018",
  resumeUrl: "curriculumSergioLeon.pdf",
  skills: [
    "JavaScript",
    "HTML5",
    "CSS3",
    "jQuery (básico)",
    "Flutter/Dart",
    "Node.js",
    "Express",
    "Firebase",
    "Git",
    "Testing básico",
    "SQL",
    "REST APIs",
  ],
  workflow: [
    "Planificación previa con objetivos claros y tareas desglosadas",
    "Commits atómicos, mensajes descriptivos y ramas limpias (git-flow)",
    "Pruebas básicas (unitarias y de integración) ",
    "Diseño responsivo, accesible y centrado en la experiencia de usuario",
    "Documentación breve pero completa (README, issues, PRs)",
    "Apertura a feedback y mejora continua como parte del proceso",
  ],
  highlights: [
    "2 proyectos publicados (y creciendo)",
    "Buenas prácticas: git-flow, issues y PRs",
    "Pruebas unitarias básicas + CI",
    "Enfoque UX y rendimiento",
  ],
  projects: [
    {
      title: "Proyecto 1 — Mapa de Recuerdos",
      description:
        "Web app para guardar recuerdos asociados a lugares. Registro, fotos y filtros.",
      stack: ["JS", "Flutter", "Firebase"],
      image:
        "https://images.unsplash.com/photo-1520975432078-3b1c9da3b3f0?q=80&w=1200&auto=format&fit=crop",
      repo: "https://github.com/tuusuario/mapa-recuerdos",
      demo: "#",
      highlights: [
        "Auth con Firebase y Google",
        "Subida/compresión de imágenes",
        "Mapa interactivo con clustering",
      ],
    },
    {
      title: "Proyecto 2 — Draft Coach Brawl Stars",
      description:
        "Simulador de draft competitivo con lógica de picks/bans y recomendaciones.",
      stack: ["JS", "Flutter", "Riverpod"],
      image:
        "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1200&auto=format&fit=crop",
      repo: "https://github.com/tuusuario/draft-coach",
      demo: "#",
      highlights: [
        "Lógica escalable de picks/bans",
        "Evaluación con inteligencia artificial del draft",
        "Uso de servidor para gestionar información",
      ],
    },
  ],
};
// ====== FIN DATOS ======

// Helpers
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const escape = (str = "") =>
  String(str).replace(
    /[&<>\"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '\\"': "&quot;",
        "'": "&#39;",
      }[m])
  );

// Theme + View Transitions (si hay soporte)
const themeBtn = $("#themeToggle");
function applyTheme(t) {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(t);
      localStorage.setItem("theme", t);
    });
  } else {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(t);
    localStorage.setItem("theme", t);
  }
}
themeBtn.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
});
applyTheme(
  localStorage.getItem("theme") ||
    (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
);

// Datos básicos
$("#devName").textContent = DATA.name;
$("#devSub").textContent = `${DATA.role} · ${DATA.location}`;
$("#heroTitle").textContent = DATA.name;
$("#role").textContent = DATA.role;
$("#summary").textContent = DATA.summary;
$("#ghLink").href = DATA.github;
$("#cvLink").setAttribute("href", DATA.resumeUrl);
$("#cvLink").setAttribute("target", "_blank");   // abre en pestaña nueva
$("#cvLink").setAttribute("download", "curriculumSergioLeon.pdf"); 
$("#emailLink").href = `https://mail.google.com/mail/?view=cm&fs=1&to=${DATA.email}`;
$("#contactEmail").href = `https://mail.google.com/mail/?view=cm&fs=1&to=${DATA.email}`;
$("#phoneLink").href = `tel:${DATA.phone}`;
$("#contactGit").href = DATA.github;
$("#initials").textContent = DATA.name
  .split(" ")
  .filter(Boolean)
  .slice(0, 2)
  .map((n) => n[0].toUpperCase())
  .join("");
$("#copyright").textContent = `© ${new Date().getFullYear()} ${
  DATA.name
}. Hecho con HTML + CSS + JS.`;

// Workflow
const wfUl = $("#workflow");
DATA.workflow.forEach((h) => {
  const li = document.createElement("li");
  li.textContent = h;
  wfUl.appendChild(li);
});

// Skills pills
const skills = $("#skills");
DATA.skills.forEach((s) => {
  const span = document.createElement("span");
  span.className = "chip";
  span.textContent = s;
  skills.appendChild(span);
});

// Projects
const grid = $("#projects");
const search = $("#search");
function matches(p, q) {
  const hay = `${p.title} ${p.description} ${(p.stack || []).join(
    " "
  )}`.toLowerCase();
  return hay.includes(q.toLowerCase());
}
function renderProjects() {
  const q = search.value.trim();
  const list = DATA.projects.filter((p) => !q || matches(p, q));
  if (document.startViewTransition) {
    document.startViewTransition(() => buildProjectGrid(list));
  } else {
    buildProjectGrid(list);
  }
}
function buildProjectGrid(list) {
  grid.innerHTML = "";
  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card project";
    card.innerHTML = `
      <div class="thumb">${
        p.image
          ? `<img alt="${escape(p.title)}" src="${escape(p.image)}"/>`
          : ""
      }</div>
      <div class="p">
        <h3>${escape(p.title)}</h3>
        <p class="muted" style="margin:6px 0">${escape(p.description)}</p>
        <div class="stack">${(p.stack || [])
          .map((s) => `<span class="chip">${escape(s)}</span>`)
          .join("")}</div>
        ${
          p.highlights?.length
            ? `<ul class="list project-highlights">${p.highlights
                .map((h) => `<li>${escape(h)}</li>`)
                .join("")}</ul>`
            : ""
        }
        <div class="actions">
          ${
            p.repo
              ? `<a class="btn" href="${escape(
                  p.repo
                )}" target="_blank" rel="noreferrer">Código</a>`
              : ""
          }
          ${
            p.demo
              ? `<a class="btn primary" href="${escape(
                  p.demo
                )}" target="_blank" rel="noreferrer">Demo</a>`
              : ""
          }
        </div>
      </div>`;
    grid.appendChild(card);
  });
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "p";
    empty.textContent = "No hay proyectos que coincidan con el filtro.";
    grid.appendChild(empty);
  }
  // Ocultar highlights de proyectos si está desactivado
  const hide = !toggleHighlights.checked;
  $$(".project-highlights").forEach(
    (ul) => (ul.style.display = hide ? "none" : "")
  );
}

// search (debounce)
let t;
search.addEventListener("input", () => {
  clearTimeout(t);
  t = setTimeout(renderProjects, 120);
});

// init
renderProjects();

// ===== Web Component: <spark-badge> (neón + chispas) =====
class SparkBadge extends HTMLElement {
  constructor() {
    super();
    const r = this.attachShadow({ mode: "open" });
    r.innerHTML = `<style>.wrap{display:inline-block} .spark{--g:linear-gradient(90deg,#8b5cf6,#22d3ee,#f59e0b);} .spark::before{--a:0deg}</style><span class="wrap"><span class="spark"><span class="spark__label"></span></span></span>`;
    this.$label = r.querySelector(".spark__label");
    this.$wrap = r.querySelector(".spark");
  }
  connectedCallback() {
    this.$label.textContent = this.getAttribute("label") || "Badge";
    this._move = (e) => {
      const rect = this.$wrap.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      this.$wrap.style.setProperty("--x", x + "%");
      this.$wrap.style.setProperty("--y", y + "%");
      this.$wrap.style.setProperty("--a", (x / 100) * 360 + "deg");
    };
    this.addEventListener("mousemove", this._move);
  }
  disconnectedCallback() {
    this.removeEventListener("mousemove", this._move);
  }
}
customElements.define("spark-badge", SparkBadge);

const topbar = document.getElementById("topbar");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const links = [...document.querySelectorAll(".nav a")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function onScroll() {
  topbar.classList.toggle("scrolled", window.scrollY > 12);

  const marker = window.scrollY + window.innerHeight * 0.32;
  let current = sections[0];

  for (const section of sections) {
    if (section.offsetTop <= marker) {
      current = section;
    }
  }

  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
}

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".section .reveal").forEach((el) => observer.observe(el));

const portrait = document.querySelector(".portrait-face");
const portraitFrame = document.querySelector(".portrait-frame");
if (portrait && portraitFrame) {
  portrait.addEventListener("error", () => {
    portraitFrame.replaceWith(Object.assign(document.createElement("div"), {
      className: "portrait portrait-fallback",
      textContent: "RS",
      role: "img",
      ariaLabel: "Iniciais de Ralf da Silva"
    }));
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

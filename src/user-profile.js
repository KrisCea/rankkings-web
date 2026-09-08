// Menú móvil
const menuBtn = document.getElementById("menu-btn");
const mobilePanel = document.getElementById("mobile-panel");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");

menuBtn.addEventListener("click", () => {
  const isOpen = !mobilePanel.classList.contains("hidden");
  mobilePanel.classList.toggle("hidden");
  iconOpen.classList.toggle("hidden");
  iconClose.classList.toggle("hidden");
  menuBtn.setAttribute("aria-expanded", String(!isOpen));

  // Resetea el acordeón de categorías al cerrar el panel
  if (isOpen) {
    categoriasSubmenuMobile.classList.add("hidden");
    categoriasChevronMobile.classList.remove("rotate-180");
  }

  closeMobileSearch(); // evita que quede abierta junto al panel
});

mobilePanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobilePanel.classList.add("hidden");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Menú de perfil
const profileBtn = document.getElementById("profile-btn");
const profileMenu = document.getElementById("profile-menu");
const profileChevron = document.getElementById("profile-chevron");

function closeProfileMenu() {
  profileMenu.classList.add("hidden");
  profileChevron.classList.remove("rotate-180");
  profileBtn.setAttribute("aria-expanded", "false");
}

profileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = !profileMenu.classList.contains("hidden");
  isOpen ? closeProfileMenu() : (
    profileMenu.classList.remove("hidden"),
    profileChevron.classList.add("rotate-180"),
    profileBtn.setAttribute("aria-expanded", "true")
  );
});

// Menú de categorías (escritorio)
const categoriasBtn = document.getElementById("categorias-btn");
const categoriasMenu = document.getElementById("categorias-menu");
const categoriasChevron = document.getElementById("categorias-chevron");

function closeCategoriasMenu() {
  categoriasMenu.classList.add("hidden");
  categoriasChevron.classList.remove("rotate-180");
  categoriasBtn.setAttribute("aria-expanded", "false");
}

categoriasBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = !categoriasMenu.classList.contains("hidden");
  isOpen
    ? closeCategoriasMenu()
    : (categoriasMenu.classList.remove("hidden"),
       categoriasChevron.classList.add("rotate-180"),
       categoriasBtn.setAttribute("aria-expanded", "true"));
});

// Submenú de categorías (móvil, se acordeona dentro del panel)
const categoriasBtnMobile = document.getElementById("categorias-btn-mobile");
const categoriasSubmenuMobile = document.getElementById("categorias-submenu-mobile");
const categoriasChevronMobile = document.getElementById("categorias-chevron-mobile");

categoriasBtnMobile.addEventListener("click", () => {
  categoriasSubmenuMobile.classList.toggle("hidden");
  categoriasChevronMobile.classList.toggle("rotate-180");
});

// Barra de búsqueda móvil
const searchBtnMobile = document.getElementById("search-btn-mobile");
const mobileSearchBar = document.getElementById("mobile-search-bar");
const mobileSearchInput = document.getElementById("mobile-search-input");
const closeSearchMobile = document.getElementById("close-search-mobile");

function openMobileSearch() {
  mobileSearchBar.classList.remove("hidden");
  searchBtnMobile.setAttribute("aria-expanded", "true");
  mobileSearchInput.focus();

  // Cierra el panel del menú hamburguesa si estaba abierto, para no mostrar los dos a la vez
  if (!mobilePanel.classList.contains("hidden")) {
    mobilePanel.classList.add("hidden");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
  }
}

function closeMobileSearch() {
  mobileSearchBar.classList.add("hidden");
  searchBtnMobile.setAttribute("aria-expanded", "false");
  mobileSearchInput.value = "";
}

searchBtnMobile.addEventListener("click", () => {
  const isOpen = !mobileSearchBar.classList.contains("hidden");
  isOpen ? closeMobileSearch() : openMobileSearch();
});

closeSearchMobile.addEventListener("click", closeMobileSearch);

// Un solo listener global para cerrar perfil y categorías al hacer click fuera
document.addEventListener("click", (e) => {
  if (!profileMenu.contains(e.target)) closeProfileMenu();
  if (!categoriasMenu.contains(e.target) && !categoriasBtn.contains(e.target)) {
    closeCategoriasMenu();
  }
});

// Un solo listener global para Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProfileMenu();
    closeCategoriasMenu();
    closeMobileSearch();
  }
});

// Biblioteca de publicaciones: cada objeto es una publicación.
const publicaciones = [
  { titulo: "Top 10 discos de 2025", imagen: "https://f4.bcbits.com/img/a2625942251_16.jpg", url: "publicacion.html?id=1" },
  { titulo: "Mejores libros del año", imagen: "https://i.scdn.co/image/ab67616d0000e1a36225f9b8bd5c9044281a2f17", url: "publicacion.html?id=2" },
  { titulo: "Películas imprescindibles", url: "publicacion.html?id=3" }, // sin imagen
  { titulo: "Ranking de series", imagen: "url-que-no-existe.jpg", url: "publicacion.html?id=4" }, // imagen rota
  { titulo: "Top 10 discos de 2025", imagen: "https://f4.bcbits.com/img/a2625942251_16.jpg", url: "publicacion.html?id=1" },
  { titulo: "Mejores libros del año", imagen: "https://i.scdn.co/image/ab67616d0000e1a36225f9b8bd5c9044281a2f17", url: "publicacion.html?id=2" },
  { titulo: "Películas imprescindibles", url: "publicacion.html?id=3" }, // sin imagen
  { titulo: "Ranking de series", imagen: "url-que-no-existe.jpg", url: "publicacion.html?id=4" }, // imagen rota
  { titulo: "Top 10 discos de 2025", imagen: "https://f4.bcbits.com/img/a2625942251_16.jpg", url: "publicacion.html?id=1" },
  { titulo: "Mejores libros del año", imagen: "https://i.scdn.co/image/ab67616d0000e1a36225f9b8bd5c9044281a2f17", url: "publicacion.html?id=2" },
];

function crearCuadroPublicacion(pub) {
  const link = document.createElement("a");
  link.href = pub.url;
  link.className =
    "relative flex aspect-square items-center justify-center overflow-hidden rounded-md border border-rk-light bg-rk-dark p-1 text-center";

  // Texto del título: siempre existe, así el cuadrado nunca queda vacío
  const label = document.createElement("span");
  label.textContent = pub.titulo;
  label.className = "relative z-10 text-xs font-medium text-rk-light";

  if (pub.imagen) {
    const img = document.createElement("img");
    img.src = pub.imagen;
    img.alt = pub.titulo;
    img.className = "absolute inset-0 h-full w-full object-cover";

    // Si la imagen no carga, se elimina y el texto queda centrado igual
    img.addEventListener("error", () => img.remove());

    link.appendChild(img);

    // Con imagen, el título va como etiqueta superpuesta abajo
    label.className =
      "absolute inset-x-0 bottom-0 z-10 bg-rk-dark/70 px-2 py-1.5 text-xs text-rk-light";
  }

  link.appendChild(label);
  return link;
}

function renderPublicaciones() {
  const grid = document.getElementById("publicaciones-grid");
  if (!grid) return; // esta página podría no tener la cuadrícula (p. ej. si se reutiliza el script en otra vista)
  publicaciones.forEach((pub) => {
    grid.appendChild(crearCuadroPublicacion(pub));
  });
}

renderPublicaciones();

// Pestañas del perfil (Publicaciones / Listas / Guardado)
const profileTabs = [
  { btn: "tab-btn-publicaciones", panel: "tab-panel-publicaciones" },
  { btn: "tab-btn-listas", panel: "tab-panel-listas" },
  { btn: "tab-btn-guardado", panel: "tab-panel-guardado" },
];

function activarPestana(idBotonActivo) {
  profileTabs.forEach(({ btn, panel }) => {
    const btnEl = document.getElementById(btn);
    const panelEl = document.getElementById(panel);
    if (!btnEl || !panelEl) return;

    const activo = btn === idBotonActivo;
    panelEl.classList.toggle("hidden", !activo);
    btnEl.setAttribute("aria-selected", String(activo));
    btnEl.classList.toggle("border-rk-accent", activo);
    btnEl.classList.toggle("text-rk-accent", activo);
    btnEl.classList.toggle("border-transparent", !activo);
    btnEl.classList.toggle("text-rk-light/70", !activo);
  });
}

profileTabs.forEach(({ btn }) => {
  const btnEl = document.getElementById(btn);
  if (btnEl) {
    btnEl.addEventListener("click", () => activarPestana(btn));
  }
});

// Botón "Editar perfil": placeholder, listo para enlazar a la vista de edición
const editProfileBtn = document.getElementById("edit-profile-btn");
if (editProfileBtn) {
  editProfileBtn.addEventListener("click", () => {
    window.location.href = "editar-perfil.html";
  });
}
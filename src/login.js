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
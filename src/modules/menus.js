// Centraliza los pares botón/menú para que añadir uno nuevo sea directo.
const MENU_CONFIG = [
  { buttonId: 'sectionMenuButton', menuId: 'sectionMenu' },
  { buttonId: 'filterButton', menuId: 'filterMenu' },
  { buttonId: 'createButton', menuId: 'createMenu' },
  { buttonId: 'profileButton', menuId: 'profileMenu' }
];

export const initMenus = () => {
  const menus = MENU_CONFIG.map(({ buttonId, menuId }) => ({
    button: document.getElementById(buttonId),
    menu: document.getElementById(menuId)
  }));

  const closeMenus = () => {
    menus.forEach(({ button, menu }) => {
      menu.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
    });
  };

  menus.forEach(({ button, menu }) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = !menu.classList.contains('hidden');
      closeMenus();

      if (!isOpen) {
        menu.classList.remove('hidden');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.querySelectorAll('.filter-option').forEach((option) => {
    option.addEventListener('click', () => {
      document.getElementById('searchInput').value = option.dataset.filter || '';
      closeMenus();
    });
  });

  document.addEventListener('click', closeMenus);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenus();
  });
};
import { initContentViews } from './modules/content-views.js';
import { initMenus } from './modules/menus.js';
import { initSlider } from './modules/slider.js';
import { initTheme } from './modules/theme.js';

// Punto único de arranque. Cada módulo controla una parte independiente de la UI.
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenus();
  initContentViews();
  initSlider();
});
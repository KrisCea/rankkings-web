// Tema visual: preferencia guardada, preferencia del sistema y botón de cambio.
const THEME_STORAGE_KEY = 'rankkings-theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === LIGHT_THEME || savedTheme === DARK_THEME) return savedTheme;

  return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT_THEME : DARK_THEME;
};

const updateToggleLabel = (button) => {
  const isLight = document.documentElement.dataset.theme === LIGHT_THEME;
  button.setAttribute('aria-label', isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
};

export const initTheme = () => {
  const themeToggle = document.getElementById('themeToggle');
  document.documentElement.dataset.theme = getInitialTheme();
  updateToggleLabel(themeToggle);

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    updateToggleLabel(themeToggle);
  });
};
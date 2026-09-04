// Vistas de contenido: Reels, Galería y Posteos comparten este controlador.
export const initContentViews = () => {
  const tabs = Array.from(document.querySelectorAll('.content-tab'));
  const views = Array.from(document.querySelectorAll('.content-view'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const selectedMode = tab.dataset.mode;

      tabs.forEach((item) => {
        const isSelected = item === tab;
        item.classList.toggle('is-active', isSelected);
        item.setAttribute('aria-selected', String(isSelected));
      });

      views.forEach((view) => {
        const isVisible = view.dataset.view === selectedMode;
        view.classList.toggle('hidden', !isVisible);

        // Galería necesita conservar la utilidad grid al hacerse visible.
        if (view.dataset.view === 'gallery') view.classList.toggle('grid', isVisible);
      });
    });
  });
};
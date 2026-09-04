// Slider principal: movimiento, indicadores, controles y autoplay.
const AUTOPLAY_DELAY = 5000;

export const initSlider = () => {
  const track = document.getElementById('slider-track');
  const slides = Array.from(track.children);
  const prevButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');
  const pagination = document.getElementById('pagination');
  let currentIndex = 0;
  let autoPlayInterval;

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    resetAutoPlay();
  };

  // Reinicia el intervalo después de cualquier interacción manual.
  const resetAutoPlay = () => {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
  };

  const updateSlider = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    Array.from(pagination.children).forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle('bg-white', isActive);
      dot.classList.toggle('bg-white/50', !isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const goToSlide = (index) => {
    currentIndex = index;
    updateSlider();
    resetAutoPlay();
  };

  const previousSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    resetAutoPlay();
  };

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `h-3 w-3 rounded-full transition-colors duration-300 focus:outline-none ${index === 0 ? 'bg-white' : 'bg-white/50'}`;
    dot.setAttribute('aria-label', `Ir a diapositiva ${index + 1}`);
    dot.setAttribute('aria-current', index === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goToSlide(index));
    pagination.appendChild(dot);
  });

  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', previousSlide);
  autoPlayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
};
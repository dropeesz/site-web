// Animações discretas ao entrar na tela, respeitando a preferência por movimento reduzido.
const animatedItems = document.querySelectorAll(
  '.section-label, .section-title, .section-sub, .sobre-grid, .tech-card, .project-card, .cert-card, .servicos-intro, .servico-card, .servicos-cta, .contact-btn'
);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  animatedItems.forEach((item, index) => {
    item.classList.add('reveal');
    if (item.matches('.tech-card, .project-card, .cert-card, .servico-card, .contact-btn')) {
      item.classList.add(`reveal-delay-${(index % 3) + 1}`);
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  animatedItems.forEach((item) => revealObserver.observe(item));
}

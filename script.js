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

const certGrid = document.querySelector('#certGrid');
const certFilters = document.querySelector('#certFilters');
const certMore = document.querySelector('#certMore');

if (certGrid && certFilters && certMore) {
  const certificates = [
    { title: 'Front-end', category: 'Front-end', institution: 'SENAI', detail: '3 meses · 2025' },
    { title: 'Back-end', category: 'Back-end', institution: 'SENAI', detail: '3 meses · 2025' },
    { title: 'Banco de Dados', category: 'Banco de dados', institution: 'SENAI', detail: '6 meses · 2025' },
    { title: 'Operador de Drone', category: 'Outros', institution: 'Espaço da Juventude', detail: '1 mês · 2026' },
    { title: 'Introdução à Robótica', category: 'Outros', institution: 'Espaço da Juventude', detail: '1 mês · 2025' },
    { title: 'Introdução à IA', category: 'Outros', institution: 'Espaço da Juventude', detail: '1 mês · 2025' },
    { title: 'Introdução à Informática', category: 'Outros', institution: 'Espaço da Juventude', detail: '1 mês · 2025' },
    { title: 'Introdução ao Design de Games', category: 'Design', institution: 'Espaço da Juventude', detail: '1 mês · 2025' },
    { title: 'Mídias Digitais', category: 'Marketing', institution: 'Espaço da Juventude', detail: 'Oficina · 2025' },
    { title: 'Informática', category: 'Outros', institution: 'Espaço da Juventude', detail: 'Oficina · 2025' },
    { title: 'Gestão Financeira', category: 'Outros', institution: 'Espaço da Juventude', detail: 'Oficina · 2025' },
    { title: 'Inteligência Artificial', category: 'Outros', institution: 'Espaço da Juventude', detail: 'Oficina · 2025' },
    { title: 'Engenharia de Prompt', category: 'Outros', institution: 'FIAP', detail: '2026' },
    { title: 'Inteligência Artificial para Pequenas e Médias Empresas', category: 'Outros', institution: 'Fundação Bradesco', detail: '2026' },
    { title: 'TikTok Ads', category: 'Marketing', institution: 'Danki Code', detail: '2025' },
    { title: 'Front-end Completo', category: 'Front-end', institution: 'Danki Code', detail: '2026' },
    { title: 'Introdução ao n8n', category: 'Back-end', institution: 'Danki Code', detail: '2026' },
    { title: 'Instagram para Negócios', category: 'Marketing', institution: 'Danki Code', detail: '2026' },
    { title: 'Tráfego para Freelancer', category: 'Marketing', institution: 'Danki Code', detail: '2026' },
    { title: 'Canva Avançado', category: 'Design', institution: 'Danki Code', detail: '' }
  ];
  const categories = ['Todos', 'Front-end', 'Outros', 'Back-end', 'Banco de dados', 'Design', 'Marketing'];
  const limit = 6;
  let selectedCategory = 'Todos';
  let expanded = false;

  const render = () => {
    const filtered = certificates.filter((cert) => selectedCategory === 'Todos' || cert.category === selectedCategory);
    const visible = expanded ? filtered : filtered.slice(0, limit);

    certFilters.innerHTML = categories.map((category) => {
      const active = category === selectedCategory;
      return `<button type="button" class="cert-pill${active ? ' active' : ''}" data-category="${category}" aria-pressed="${active}">${category}</button>`;
    }).join('');

    certGrid.innerHTML = visible.map((cert) => `
      <article class="cert-card">
        <div class="cert-top">
          <span class="cert-icon" aria-hidden="true"><span class="cert-check">✓</span></span>
          <span class="cert-cat cert-cat-${cert.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">${cert.category}</span>
        </div>
        <h3 class="cert-name">${cert.title}</h3>
        <p class="cert-meta">${cert.institution}${cert.detail ? ` · ${cert.detail}` : ''}</p>
      </article>`).join('');

    certMore.innerHTML = filtered.length > limit
      ? `<button type="button" id="certToggle" aria-expanded="${expanded}">${expanded ? 'Mostrar menos' : `Ver todos (${filtered.length})`}</button>`
      : '';
  };

  certFilters.addEventListener('click', (event) => {
    const button = event.target.closest('.cert-pill');
    if (!button) return;
    selectedCategory = button.dataset.category;
    expanded = false;
    render();
  });

  certMore.addEventListener('click', (event) => {
    if (!event.target.closest('#certToggle')) return;
    expanded = !expanded;
    render();
  });

  render();
}
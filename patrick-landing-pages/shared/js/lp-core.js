document.addEventListener('DOMContentLoaded', () => {

  // Scroll reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visivel'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const alvo = document.querySelector(link.getAttribute('href'));
      if (alvo) { e.preventDefault(); alvo.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Ano dinâmico
  document.querySelectorAll('[data-ano]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // Contador animado
  const animarNum = (el) => {
    const alvo = parseInt(el.dataset.alvo, 10);
    if (!alvo) return;
    let atual = 0;
    const inc = alvo / 60;
    const t = setInterval(() => {
      atual = Math.min(atual + inc, alvo);
      el.textContent = Math.floor(atual) + (el.dataset.sufixo || '');
      if (atual >= alvo) clearInterval(t);
    }, 16);
  };
  const obsNum = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animarNum(e.target); obsNum.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-alvo]').forEach(el => obsNum.observe(el));

  // Parallax hero leve
  const heroBg = document.querySelector('.lp-hero__bg img');
  if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) heroBg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    }, { passive: true });
  }

  // Formspree
  const form = document.querySelector('.lp-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const orig = btn.textContent;
      btn.textContent = 'Enviando…'; btn.disabled = true;
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
        if (res.ok) {
          form.innerHTML = `<div style="text-align:center;padding:2rem"><p class="overline" style="margin-bottom:.5rem">Mensagem recebida</p><h3 style="font-family:var(--fonte-titulo);margin-bottom:.75rem">Em breve entro em contato</h3><p style="color:var(--texto-secundario)">Responderei em até 24h.</p></div>`;
        } else throw new Error();
      } catch { btn.textContent = orig; btn.disabled = false; }
    });
  }

});

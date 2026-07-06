(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero title animation
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && !prefersReducedMotion) {
    const text = heroTitle.textContent || '';
    heroTitle.innerHTML = text
      .split('')
      .map((char, i) =>
        char === ' '
          ? `<span class="inline-block">&nbsp;</span>`
          : `<span class="inline-block opacity-0 translate-y-4" style="transition: opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s">${char}</span>`
      )
      .join('');

    requestAnimationFrame(() => {
      heroTitle.querySelectorAll('span').forEach((span) => {
        span.classList.remove('opacity-0', 'translate-y-4');
      });
    });
  }

  // Reveal sections on scroll
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el, index) => {
    const delay = parseFloat(el.getAttribute('data-delay') || '0') || index * 0.08;
    el.style.transitionDelay = `${delay}s`;
    observer.observe(el);
  });

  // Skill bars
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width = target.getAttribute('data-width') || '0%';
          target.style.width = width;
          skillObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    bar.style.width = '0%';
    bar.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
    skillObserver.observe(bar);
  });

  // Back to top
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

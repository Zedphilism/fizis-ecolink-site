(() => {
  const baseAttr = document.body.dataset.basePath || '';
  const basePath = baseAttr && !baseAttr.endsWith('/') ? `${baseAttr}/` : baseAttr;

  const headerTemplate = (base) => `
    <header class="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-charcoal/60 border-b border-black/5 dark:border-white/10">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="${base}index.html" class="flex items-center gap-2 font-semibold tracking-tight text-lg">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-mint"></span> FIZIS
        </a>
        <nav class="hidden md:flex items-center gap-6 text-sm">
          <a class="hover:text-mint" href="${base}index.html#proposal">Proposal</a>
          <a class="hover:text-mint" href="${base}blog/index.html">Blog</a>
          <a class="hover:text-mint" href="${base}projects/index.html">Projects</a>
          <a class="hover:text-mint" href="${base}index.html#gallery">Gallery</a>
          <a class="hover:text-mint" href="${base}index.html#team">Team</a>
          <a class="hover:text-mint" href="${base}index.html#contact">Contact</a>
        </nav>
        <button id="themeToggle" class="text-sm px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/20 hover:border-mint">
          Toggle theme
        </button>
      </div>
    </header>
  `;

  const footerTemplate = () => `
    <footer id="contact" class="border-t border-black/5 dark:border-white/10">
      <div class="max-w-6xl mx-auto px-4 py-10 text-sm text-slate flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          © <span id="year"></span> FIZIS - Ecolink HCI Team<br/>
          Managed by <strong>Mohamad Zaidi bin Abdullah</strong> - Progress Log
        </div>
        <div class="flex gap-4">
          <a href="mailto:zaidi3116@gmail.com" class="hover:text-mint">Email</a>
          <a href="https://github.com/Zedphilism" target="_blank" rel="noopener" class="hover:text-mint">GitHub</a>
          <a href="https://www.instagram.com/zedntgaf/?igsh=MWFnM3ZhcTRreWFzMQ%3D%3D#" target="_blank" rel="noopener" class="hover:text-mint">Instagram</a>
        </div>
      </div>
    </footer>
  `;

  const headerTarget = document.getElementById('site-header');
  if (headerTarget) {
    headerTarget.innerHTML = headerTemplate(basePath);
  }

  const footerTarget = document.getElementById('site-footer');
  if (footerTarget) {
    footerTarget.innerHTML = footerTemplate();
  }

  const root = document.documentElement;
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    root.classList.add('dark');
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      root.classList.toggle('dark');
      localStorage.theme = root.classList.contains('dark') ? 'dark' : 'light';
    });
  }
})();

(() => {
  const baseAttr = document.body.dataset.basePath || '';
  const basePath = baseAttr && !baseAttr.endsWith('/') ? `${baseAttr}/` : baseAttr;

  const root = document.documentElement;
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    root.classList.add('dark');
  }

  const includes = [
    { id: 'site-header', file: 'partials/header.html' },
    { id: 'site-footer', file: 'partials/footer.html' }
  ];

  const loads = includes.map(({ id, file }) => {
    const target = document.getElementById(id);
    if (!target) {
      return Promise.resolve();
    }

    return fetch(`${basePath}${file}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${file}: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        target.innerHTML = html.replace(/\{\{BASE_PATH\}\}/g, basePath);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  Promise.all(loads).then(() => {
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
  });
})();

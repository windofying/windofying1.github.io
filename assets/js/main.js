document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  toggle && toggle.addEventListener('click', () => header.classList.toggle('open'));

  // Simple gallery filter on projects page
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('#projectGallery .project');
  if (filters.length && items.length) {
    filters.forEach(btn => btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(it => {
        const show = f === 'all' || it.classList.contains(f);
        it.style.display = show ? '' : 'none';
      });
    }));
  }
});




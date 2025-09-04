document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  toggle && toggle.addEventListener('click', () => header.classList.toggle('open'));

  // Simple gallery filter on projects page
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('#projectGallery .project-card');
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

  // 许可证图片点击放大功能
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  const closeBtn = document.querySelector('.close');

  // 为所有许可证图片添加点击事件
  const licenseImages = document.querySelectorAll('.license-img');
  licenseImages.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'block';
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    });
  });

  // 为所有项目图片添加点击事件
  const projectImages = document.querySelectorAll('.project-img');
  projectImages.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'block';
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    });
  });

  // 为项目卡片添加点击事件
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('.project-img');
      if (img) {
        modal.style.display = 'block';
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
      }
    });
  });

  // 关闭模态框
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  // 点击模态框背景关闭
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // ESC键关闭模态框
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });
});




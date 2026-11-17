(() => {
  'use strict';
  const data = window.PORTFOLIO;
  if (!data) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $ = selector => document.querySelector(selector);
  const dialog = $('#detail-dialog');
  const dialogContent = $('#dialog-content');
  let activeFilter = 'all';
  let toastTimer;
  let returnFocus;

  $('#resume-stamps').innerHTML = data.stamps.map((s, i) => `<button class="stamp ${esc(s.color)}" style="--rotation:${[-3,2,-2,3,-2][i % 5]}deg" data-stamp="${esc(s.id)}" aria-haspopup="dialog"><span class="stamp-index">${String(i + 1).padStart(2,'0')}</span><span class="stamp-icon" aria-hidden="true">${esc(s.icon)}</span><h3>${esc(s.title)}</h3><span class="stamp-en">${esc(s.english)}</span><span class="stamp-sub">${esc(s.sub)}</span><span class="stamp-arrow" aria-hidden="true">↗</span></button>`).join('');
  $('#photo-wall').innerHTML = data.photos.map((p, i) => `<button class="polaroid" style="--angle:${p.angle}deg" data-photo="${i}" aria-label="放大照片：${esc(p.title)}" aria-haspopup="dialog"><img src="${esc(p.image)}" alt="${esc(p.title)}" width="220" height="230" loading="lazy"><h3>${esc(p.title)}</h3><p>${esc(p.note)}</p></button>`).join('');
  $('#project-shelf').innerHTML = data.projects.map((p, i) => `<button class="project-book ${esc(p.color)}" data-project="${esc(p.id)}" data-category="${esc(p.category)}" style="--lift:${[9,-5,3,-10,5][i]}px" aria-haspopup="dialog" aria-label="查看项目：${esc(p.title)}"><span class="book-number">${esc(p.no)}</span><div class="book-art"><img src="${esc(p.cover)}" alt="" width="200" height="175" loading="lazy"></div><div class="book-content"><p class="book-english">${esc(p.english)}</p><h3>${esc(p.title)}</h3><p class="book-subtitle">${esc(p.subtitle)}</p><div class="book-bottom"><span>看详情</span><span aria-hidden="true">↗</span></div></div></button>`).join('');
  $('#toolbox').innerHTML = data.tools.map(t => `<div class="tool-group"><h3>${esc(t.title)}</h3><p class="tool-note">${esc(t.note)}</p></div>`).join('');
  document.querySelectorAll('[data-filter]').forEach(button => {
    const count = data.projects.filter(p => button.dataset.filter === 'all' || p.category === button.dataset.filter).length;
    button.querySelector('span').textContent = String(count).padStart(2,'0');
  });

  function openDialog(label, html) {
    $('#dialog-label').textContent = label;
    dialogContent.innerHTML = html;
    if (!dialog.open) {
      returnFocus = document.activeElement;
      dialog.showModal();
      document.body.classList.add('modal-open');
    }
    dialog.scrollTop = 0;
    $('#close-dialog').focus({preventScroll: true});
  }

  function showProject(id) {
    const p = data.projects.find(v => v.id === id);
    if (!p) return;
    const filtered = data.projects.filter(v => activeFilter === 'all' || v.category === activeFilter);
    const index = filtered.findIndex(v => v.id === p.id);
    const next = filtered[(index + 1 + filtered.length) % filtered.length];
    openDialog(`项目 ${p.no}`, `<article class="detail-content" data-id="${esc(p.id)}"><p class="detail-eyebrow">${esc(p.english)}</p><h2 id="dialog-title">${esc(p.title)}</h2><p class="detail-summary">${esc(p.summary)}</p><div class="detail-meta"><span>${esc(p.role)}</span><span>${esc(p.date)}</span></div><img class="detail-cover" src="${esc(p.cover)}" alt="${esc(p.id === 'rural' ? '乡村品牌设计成果' : p.title + '项目示意封面')}" width="850" height="300"><div class="detail-metrics">${p.metrics.map(m => `<div><strong>${esc(m[0])}</strong><span>${esc(m[1])}</span></div>`).join('')}</div><div class="detail-flow" aria-label="项目流程">${p.flow.map((f,i) => `${i ? '<b aria-hidden="true">→</b>' : ''}<span>${esc(f)}</span>`).join('')}</div><div class="detail-sections">${p.sections.map(s => `<section><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></section>`).join('')}</div>${p.gallery?.length ? `<div class="detail-gallery">${p.gallery.map(src => `<img src="${esc(src)}" alt="${esc(p.galleryCaption)}" loading="lazy">`).join('')}</div><p class="media-note">${esc(p.galleryCaption)}</p>` : ''}${p.mediaNote ? `<p class="media-note">${esc(p.mediaNote)}</p>` : ''}<div class="detail-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div><div class="detail-bottom"><button data-close-detail>← 返回</button><button data-project="${esc(next.id)}">下一篇：${esc(next.title)} ↗</button></div></article>`);
  }

  function showStamp(id) {
    const s = data.stamps.find(v => v.id === id);
    if (!s) return;
    openDialog(`经历 / ${s.title}`, `<article class="detail-content"><p class="detail-eyebrow">${esc(s.icon)} ${esc(s.english)}</p><h2 id="dialog-title">${esc(s.title)}</h2><p class="detail-summary">${esc(s.intro)}</p><div class="timeline-items">${s.items.map(item => `<section class="timeline-item"><p class="timeline-date">${esc(item.date)}</p><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p>${item.project ? `<button data-project="${esc(item.project)}">看项目详情 ↗</button>` : ''}</section>`).join('')}</div></article>`);
  }

  function notify(message) {
    clearTimeout(toastTimer);
    $('.toast').textContent = message;
    $('.toast').classList.add('visible');
    toastTimer = setTimeout(() => $('.toast').classList.remove('visible'), 3200);
  }

  document.addEventListener('click', async event => {
    const project = event.target.closest('[data-project]');
    const stamp = event.target.closest('[data-stamp]');
    const photo = event.target.closest('[data-photo]');
    const filter = event.target.closest('[data-filter]');
    if (project) showProject(project.dataset.project);
    if (stamp) showStamp(stamp.dataset.stamp);
    if (photo) {
      const p = data.photos[Number(photo.dataset.photo)];
      if (p) openDialog('调研之外', `<div class="photo-detail"><img src="${esc(p.image)}" alt="${esc(p.title)}"><h2 id="dialog-title">${esc(p.title)}</h2><p>${esc(p.note)}</p></div>`);
    }
    if (filter) {
      activeFilter = filter.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(el => {el.classList.toggle('selected', el === filter);el.setAttribute('aria-pressed', String(el === filter));});
      document.querySelectorAll('.project-book').forEach(el => el.hidden = activeFilter !== 'all' && el.dataset.category !== activeFilter);
    }
    if (event.target.closest('#close-dialog, [data-close-detail]')) dialog.close();
    if (event.target.closest('[data-copy-email]')) {
      try {
        await navigator.clipboard.writeText(data.email);
        notify('邮箱已复制');
      } catch {
        const input = document.createElement('textarea');
        input.value = data.email;input.style.position = 'fixed';input.style.opacity = '0';document.body.append(input);input.select();
        const copied = document.execCommand('copy');input.remove();
        notify(copied ? '邮箱已复制' : `我的邮箱：${data.email}`);
      }
    }
    const hello = event.target.closest('.hello-sticker');
    if (hello) {
      hello.classList.remove('wiggle');void hello.offsetWidth;hello.classList.add('wiggle');
      notify('你好，欢迎看看我的项目。');
    }
  });

  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {document.body.classList.remove('modal-open');returnFocus?.focus({preventScroll:true});});

  let ticking = false;
  function updateReading() {
    const max = document.documentElement.scrollHeight - innerHeight;
    $('.reading-progress').style.width = `${max > 0 ? Math.min(scrollY / max, 1) * 100 : 0}%`;
    let current = 'about';
    ['about','works','contact'].forEach(id => {if (document.getElementById(id).getBoundingClientRect().top <= innerHeight * .4) current = id;});
    document.querySelectorAll('.nav-pill a').forEach(a => {
      const active = a.getAttribute('href') === `#${current}`;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
    });
    ticking = false;
  }
  addEventListener('scroll', () => {if (!ticking) {requestAnimationFrame(updateReading);ticking = true;}}, {passive:true});
  addEventListener('resize', updateReading, {passive:true});
  updateReading();
})();

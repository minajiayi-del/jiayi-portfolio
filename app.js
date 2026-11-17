(() => {
  'use strict';
  const data = window.PORTFOLIO;
  if (!data) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $ = selector => document.querySelector(selector);
  const dialog = $('#detail-dialog');
  const dialogContent = $('#dialog-content');
  const shelf = $('#project-shelf');
  const page = $('#project-page');
  const notebook = $('.notebook');
  const narrow = matchMedia('(max-width: 600px)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let activeFilter = 'all';
  let currentProject = null;
  let toastTimer;
  let returnFocus;

  // ---------- render ----------
  $('#resume-stamps').innerHTML = data.stamps.map((s, i) => `<div class="stamp ${esc(s.color)} reveal" style="--rotation:${[-3,2,-2,3,-2][i % 5]}deg" data-stamp-card="${esc(s.id)}">
    <button class="stamp-front" data-flip aria-expanded="false" aria-controls="stamp-back-${esc(s.id)}" aria-label="${esc(s.title)}：翻到背面看要点"><span class="stamp-index">${String(i + 1).padStart(2,'0')}</span><span class="stamp-icon" aria-hidden="true">${esc(s.icon)}</span><h3>${esc(s.title)}</h3><span class="stamp-en">${esc(s.english)}</span><span class="stamp-sub">${esc(s.sub)}</span><span class="stamp-arrow" aria-hidden="true">↻</span></button>
    <div class="stamp-back" id="stamp-back-${esc(s.id)}" hidden><p class="stamp-back-title">${esc(s.title)}</p><ul>${s.items.map(item => `<li>${esc(item.title)}</li>`).join('')}</ul><div class="stamp-back-actions"><button data-stamp="${esc(s.id)}" aria-haspopup="dialog">完整经历 ↗</button><button data-flip aria-label="翻回正面">↺</button></div></div>
  </div>`).join('');
  $('#photo-wall').innerHTML = data.photos.map((p, i) => `<button class="polaroid reveal" style="--angle:${p.angle}deg" data-photo="${i}" aria-label="放大照片：${esc(p.title)}" aria-haspopup="dialog"><img src="${esc(p.image)}" alt="${esc(p.title)}" width="220" height="230" loading="lazy"><h3>${esc(p.title)}</h3><p>${esc(p.note)}</p></button>`).join('');
  shelf.innerHTML = data.projects.map((p, i) => `<button class="project-book ${esc(p.color)} reveal" data-project="${esc(p.id)}" data-category="${esc(p.category)}" style="--lift:${[9,-5,3,-10,5][i]}px" aria-controls="project-page" aria-label="翻开项目：${esc(p.title)}"><span class="book-number">${esc(p.no)}</span><div class="book-art"><img src="${esc(p.cover)}" alt="" width="200" height="175" loading="lazy"></div><div class="book-content"><p class="book-english">${esc(p.english)}</p><h3>${esc(p.title)}</h3><p class="book-subtitle">${esc(p.subtitle)}</p><div class="book-bottom"><span>OPEN CHAPTER</span><span aria-hidden="true">↗</span></div></div></button>`).join('');
  $('#toolbox').innerHTML = data.tools.map(t => `<div class="tool-group reveal"><h3><span aria-hidden="true">${esc(t.icon)}</span>${esc(t.title)}</h3><div class="tool-tags">${t.tags.map(v => `<span>${esc(v)}</span>`).join('')}</div></div>`).join('');
  document.querySelectorAll('[data-filter]').forEach(button => {
    const count = data.projects.filter(p => button.dataset.filter === 'all' || p.category === button.dataset.filter).length;
    button.querySelector('span').textContent = String(count).padStart(2,'0');
  });

  // ---------- dialog (photos, full experience) ----------
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

  function showStamp(id) {
    const s = data.stamps.find(v => v.id === id);
    if (!s) return;
    openDialog(`MY LITTLE TIMELINE / ${s.english}`, `<article class="detail-content"><p class="detail-eyebrow">${esc(s.icon)} ${esc(s.english)}</p><h2 id="dialog-title">${esc(s.detailTitle)}</h2><p class="detail-summary">${esc(s.intro)}</p><div class="timeline-items">${s.items.map(item => `<section class="timeline-item"><p class="timeline-date">${esc(item.date)}</p><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p>${item.project ? `<button data-project="${esc(item.project)}">翻到项目详情 ↗</button>` : ''}</section>`).join('')}</div></article>`);
  }

  // ---------- stamps: flip in place ----------
  function flipStamp(card) {
    if (!card || card.classList.contains('flipping')) return;
    const front = card.querySelector('.stamp-front');
    const back = card.querySelector('.stamp-back');
    const toBack = back.hidden;
    const swap = () => {
      back.hidden = !toBack;
      front.hidden = toBack;
      card.classList.toggle('is-back', toBack);
      front.setAttribute('aria-expanded', String(toBack));
      (toBack ? back.querySelector('[data-stamp]') : front).focus({preventScroll: true});
    };
    card.classList.remove('zoomed');
    if (reduceMotion.matches) { swap(); return; }
    card.classList.add('flipping');
    setTimeout(() => {
      swap();
      card.classList.remove('flipping');
      card.classList.add('unflip');
      setTimeout(() => card.classList.remove('unflip'), 220);
    }, 160);
  }

  // ---------- projects: open inside the notebook ----------
  const visibleProjects = () => data.projects.filter(v => activeFilter === 'all' || v.category === activeFilter);

  function projectHtml(p) {
    const list = visibleProjects().some(v => v.id === p.id) ? visibleProjects() : data.projects;
    const index = list.findIndex(v => v.id === p.id);
    const prev = list[(index - 1 + list.length) % list.length];
    const next = list[(index + 1) % list.length];
    const extra = (p.gallery || []).filter(src => src !== p.cover);
    const figs = p.figures || [];
    const coverAlt = p.id === 'rural' ? '乡村品牌设计成果' : p.title + '项目示意封面';
    const figureHtml = figs.length
      ? `<figure class="spread-figure fig-viewer" data-index="0"><button class="fig-stage" data-fig-zoom aria-label="放大查看图片"><img src="${esc(figs[0].src)}" alt="${esc(figs[0].caption)}"><span class="fig-zoom-hint" aria-hidden="true">点击放大 ⤢</span></button><figcaption>${esc(figs[0].caption)}</figcaption></figure><div class="fig-tabs" role="tablist" aria-label="项目图片">${figs.map((fg, i) => `<button role="tab" data-fig="${i}" aria-selected="${i === 0}">${esc(fg.label)}</button>`).join('')}</div>`
      : `<figure class="spread-figure${extra.length ? ' has-thumbs' : ''}"><img src="${esc(p.cover)}" alt="${esc(coverAlt)}" width="850" height="300">${extra.map(src => `<img src="${esc(src)}" alt="${esc(p.galleryCaption)}" loading="lazy">`).join('')}</figure>`;
    const left = `<div class="spread-page spread-left"><div class="page-nav"><button data-back-shelf>← 返回目录</button><span>CHAPTER ${esc(p.no)} / ${String(data.projects.length).padStart(2,'0')}</span></div><p class="detail-eyebrow">${esc(p.english)}</p><h2 id="project-page-title" tabindex="-1">${esc(p.title)}</h2><p class="spread-summary">${esc(p.summary)}</p>${figureHtml}<div class="spread-metrics">${p.metrics.map(m => `<div><strong>${esc(m[0])}</strong><span>${esc(m[1])}</span></div>`).join('')}</div><div class="spread-flow" aria-label="项目流程">${p.flow.map((f,i) => `${i ? '<b aria-hidden="true">→</b>' : ''}<span>${esc(f)}</span>`).join('')}</div></div>`;
    const right = `<div class="spread-page spread-right"><div class="spread-meta"><span>${esc(p.role)}</span><span>${esc(p.date)}</span></div><div class="spread-scroll"><div class="spread-sections">${p.sections.map(s => `<section><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></section>`).join('')}</div>${p.gallery?.length ? `<p class="media-note">${esc(p.galleryCaption)}</p>` : ''}${p.mediaNote ? `<p class="media-note">${esc(p.mediaNote)}</p>` : ''}<div class="detail-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div></div><div class="spread-bottom"><button data-project="${esc(prev.id)}">← ${esc(prev.title)}</button><button data-project="${esc(next.id)}">${esc(next.title)} →</button></div></div>`;
    return `<article class="spread" data-id="${esc(p.id)}">${left}${right}</article>`;
  }

  function scrollToNotebook() {
    const top = notebook.getBoundingClientRect().top;
    if (top < 0 || top > innerHeight * .5) notebook.scrollIntoView({behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start'});
  }

  function openProject(id) {
    const p = data.projects.find(v => v.id === id);
    if (!p) return;
    const fromShelf = !page.hidden ? 'next' : 'open';
    currentProject = p.id;
    page.innerHTML = projectHtml(p);
    shelf.hidden = true;
    page.hidden = false;
    notebook.classList.add('reading');
    page.classList.remove('turn-open', 'turn-next');
    void page.offsetWidth;
    page.classList.add(fromShelf === 'open' ? 'turn-open' : 'turn-next');
    scrollToNotebook();
    $('#project-page-title').focus({preventScroll: true});
  }

  function closeProject() {
    if (page.hidden) return;
    page.hidden = true;
    page.innerHTML = '';
    shelf.hidden = false;
    notebook.classList.remove('reading');
    shelf.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
    const last = shelf.querySelector(`[data-project="${currentProject}"]`);
    scrollToNotebook();
    last?.focus({preventScroll: true});
  }

  // ---------- scroll reveal: cards get taped on one by one ----------
  const revealItems = [...document.querySelectorAll('.reveal')];
  revealItems.forEach(el => {
    const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    el.style.setProperty('--d', `${siblings.indexOf(el) * 90}ms`);
  });
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
      setTimeout(() => entry.target.style.setProperty('--d', '0ms'), 900);
    }), {threshold: .12, rootMargin: '0px 0px -6% 0px'});
    revealItems.forEach(el => io.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('is-in'));
  }

  // ---------- hero: roles linked to tagline keywords ----------
  const hero = document.querySelector('.hero');
  const roles = [...document.querySelectorAll('.role')];
  const keywords = [...document.querySelectorAll('.hero-intro .kw')];
  const order = ['people', 'tech', 'exp'];
  let roleIndex = 0;
  let roleTimer = null;
  let heroVisible = true;
  let hovering = false;
  function setRole(key, auto) {
    roles.forEach(r => { const on = r.dataset.role === key; r.classList.toggle('active', on); r.classList.toggle('auto', on && auto); });
    keywords.forEach(k => k.classList.toggle('active', k.dataset.kw === key));
    if (key) hero.dataset.role = key; else delete hero.dataset.role;
  }
  function stopRoles() { clearInterval(roleTimer); roleTimer = null; }
  function startRoles() {
    stopRoles();
    if (reduceMotion.matches || hovering || !heroVisible) return;
    setRole(order[roleIndex], true);
    roleTimer = setInterval(() => { roleIndex = (roleIndex + 1) % order.length; setRole(order[roleIndex], true); }, 2800);
  }
  const pick = key => { hovering = true; stopRoles(); roleIndex = order.indexOf(key); setRole(key, false); };
  const release = () => { hovering = false; if (reduceMotion.matches) setRole(null); else startRoles(); };
  [...roles.map(r => [r, r.dataset.role]), ...keywords.map(k => [k, k.dataset.kw])].forEach(([el, key]) => {
    el.addEventListener('mouseenter', () => pick(key));
    el.addEventListener('mouseleave', release);
    el.addEventListener('focus', () => pick(key));
    el.addEventListener('blur', release);
  });
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion.matches) {
    let frame = 0;
    hero.addEventListener('pointermove', e => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const box = hero.querySelector('.hero-bg').getBoundingClientRect();
        hero.style.setProperty('--mx', `${e.clientX - box.left}px`);
        hero.style.setProperty('--my', `${e.clientY - box.top}px`);
        hero.classList.add('pointer');
        frame = 0;
      });
    });
    hero.addEventListener('pointerleave', () => hero.classList.remove('pointer'));
  }
  if (roles.length) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; heroVisible ? startRoles() : stopRoles(); }, {threshold: .3}).observe(document.querySelector('.hero'));
    }
    setTimeout(startRoles, 700);
  }

  // ---------- misc ----------
  function notify(message) {
    clearTimeout(toastTimer);
    $('.toast').textContent = message;
    $('.toast').classList.add('visible');
    toastTimer = setTimeout(() => $('.toast').classList.remove('visible'), 3200);
  }

  document.addEventListener('click', async event => {
    const project = event.target.closest('[data-project]');
    const stamp = event.target.closest('[data-stamp]');
    const flip = event.target.closest('[data-flip]');
    const photo = event.target.closest('[data-photo]');
    const filter = event.target.closest('[data-filter]');
    if (project) {
      if (dialog.open) dialog.close();
      openProject(project.dataset.project);
    }
    if (stamp) showStamp(stamp.dataset.stamp);
    if (flip) {
      const card = flip.closest('.stamp');
      if (narrow.matches && flip.classList.contains('stamp-front')) showStamp(card.dataset.stampCard);
      else flipStamp(card);
    }
    if (photo) {
      const p = data.photos[Number(photo.dataset.photo)];
      if (p) openDialog('LITTLE MOMENTS / LIFE & INSPIRATION', `<div class="photo-detail"><img src="${esc(p.image)}" alt="${esc(p.title)}"><h2 id="dialog-title">${esc(p.title)}</h2><p>${esc(p.note)}</p></div>`);
    }
    if (filter) {
      activeFilter = filter.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(el => {el.classList.toggle('selected', el === filter);el.setAttribute('aria-pressed', String(el === filter));});
      document.querySelectorAll('.project-book').forEach(el => el.hidden = activeFilter !== 'all' && el.dataset.category !== activeFilter);
      closeProject();
    }
    if (event.target.closest('[data-back-shelf]')) closeProject();
    const figTab = event.target.closest('[data-fig]');
    if (figTab) {
      const p = data.projects.find(v => v.id === currentProject);
      const fg = p?.figures?.[Number(figTab.dataset.fig)];
      const viewer = page.querySelector('.fig-viewer');
      if (fg && viewer) {
        const img = viewer.querySelector('img');
        img.src = fg.src; img.alt = fg.caption;
        viewer.querySelector('figcaption').textContent = fg.caption;
        viewer.dataset.index = figTab.dataset.fig;
        page.querySelectorAll('[data-fig]').forEach(t => t.setAttribute('aria-selected', String(t === figTab)));
      }
    }
    if (event.target.closest('[data-fig-zoom]')) {
      const p = data.projects.find(v => v.id === currentProject);
      const fg = p?.figures?.[Number(page.querySelector('.fig-viewer')?.dataset.index || 0)];
      if (fg) openDialog(`${p.title} / ${fg.label}`, `<div class="photo-detail fig-detail"><img src="${esc(fg.src)}" alt="${esc(fg.caption)}"><h2 id="dialog-title">${esc(fg.label)}</h2><p>${esc(fg.caption)}</p></div>`);
    }
    const back = event.target.closest('.stamp-back');
    if (back && !event.target.closest('button')) {
      const card = back.closest('.stamp');
      const zoom = !card.classList.contains('zoomed');
      document.querySelectorAll('.stamp.zoomed').forEach(el => el.classList.remove('zoomed'));
      card.classList.toggle('zoomed', zoom);
    } else if (!event.target.closest('.stamp')) {
      document.querySelectorAll('.stamp.zoomed').forEach(el => el.classList.remove('zoomed'));
    }
    if (event.target.closest('#close-dialog, [data-close-detail]')) dialog.close();
    if (event.target.closest('[data-copy-email]')) {
      try {
        await navigator.clipboard.writeText(data.email);
        notify('邮箱已复制，期待你的来信 ✳');
      } catch {
        const input = document.createElement('textarea');
        input.value = data.email;input.style.position = 'fixed';input.style.opacity = '0';document.body.append(input);input.select();
        const copied = document.execCommand('copy');input.remove();
        notify(copied ? '邮箱已复制，期待你的来信 ✳' : `我的邮箱：${data.email}`);
      }
    }
    const hello = event.target.closest('.hello-sticker');
    if (hello) {
      hello.classList.remove('wiggle');void hello.offsetWidth;hello.classList.add('wiggle');
      notify('Hi！很高兴在这里遇见你，今天也保持好奇 ✳');
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !dialog.open && !page.hidden) closeProject();
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

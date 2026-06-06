// ── Hero Typing Animation ──
(function initTyping() {
  const target = document.getElementById('typing-portfolio');
  const cursor = document.getElementById('typing-cursor');
  if (!target || !cursor) return;

  const TEXT = 'Portfolio';
  const CHAR_SPEED = 110;
  const START_DELAY = 600;
  const END_PAUSE = 600;

  function typeInto(el, text) {
    return new Promise((resolve) => {
      let i = 0;
      const tick = setInterval(() => {
        el.textContent += text[i];
        i += 1;

        if (i >= text.length) {
          clearInterval(tick);
          resolve();
        }
      }, CHAR_SPEED);
    });
  }

  async function run() {
    await new Promise((r) => setTimeout(r, START_DELAY));
    await typeInto(target, TEXT);
    await new Promise((r) => setTimeout(r, END_PAUSE));

    cursor.style.transition = 'opacity 0.35s';
    cursor.style.opacity = '0';

    setTimeout(() => {
      cursor.remove();
    }, 400);
  }

  run();
})();

// ── Config ──
const TOTAL_PAGES = 76; // page-02 ~ page-77
const STORAGE_KEY = 'portfolio_slots';

// 영상 파일이 있는 페이지만 여기에 적기
const VIDEO_PAGES = new Set([
  5, 7, 12, 13, 14, 16, 19, 20, 22, 24,
  31, 32, 33, 36, 38, 42, 46, 48, 52, 54,
  59, 61, 65, 67, 70, 74, 77
]);


// ── Load saved slots from localStorage ──
function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveSaved(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


// ── Build portfolio section ──
const section = document.getElementById('portfolio');
const saved = loadSaved();

for (let i = 1; i <= TOTAL_PAGES; i++) {
  const pageNum = i + 1;
  const padded = String(pageNum).padStart(2, '0');

  const slot = document.createElement('div');
  slot.className = 'portfolio-slot';
  slot.dataset.index = i;

  if (i === 1) slot.id = 'page-02';

  const numBadge = document.createElement('span');
  numBadge.className = 'slot-num';
  numBadge.textContent = `${padded} / 78`;
  slot.appendChild(numBadge);

  const zone = document.createElement('div');
  zone.className = 'upload-zone';
  zone.innerHTML = `
    <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
      <path d="M12 16V8M8 12l4-4 4 4"/>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke-opacity=".4"/>
    </svg>
    <span class="upload-label">이미지 또는 영상을 드래그하거나 클릭하여 업로드</span>
    <input type="file" accept="image/*,video/*" />
  `;
  slot.appendChild(zone);

  const fileInput = zone.querySelector('input[type="file"]');

  // ── Auto-load from assets folder ──
  if (VIDEO_PAGES.has(pageNum)) {
    renderMedia(slot, zone, 'video', `assets/videos/page-${padded}.mp4`);
  } else {
    renderMedia(slot, zone, 'image', `assets/images/page-${padded}.png`);
  }

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleFile(slot, zone, file, i);
  });

  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('dragover');
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('dragover');
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (!file) return;
    handleFile(slot, zone, file, i);
  });

  section.appendChild(slot);
}


// ── Handle uploaded file ──
function handleFile(slot, zone, file, index) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const src = e.target.result;
    const type = file.type.startsWith('video') ? 'video' : 'image';

    renderMedia(slot, zone, type, src);

    try {
      const sv = loadSaved();
      sv[index] = { type, src };
      saveSaved(sv);
    } catch {
      // localStorage 용량 초과 방지
    }
  };

  reader.readAsDataURL(file);
}


// ── Render image or video inside slot ──
function renderMedia(slot, zone, type, src) {
  slot.querySelectorAll('img, video').forEach((el) => el.remove());
  zone.classList.add('hidden');

  if (type === 'video') {
    const vid = document.createElement('video');
    vid.src = src;
    vid.autoplay = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.muted = true;
    vid.controls = false;

    slot.appendChild(vid);
  } else {
    const img = document.createElement('img');

    img.alt = '';
    img.loading = Number(slot.dataset.index) <= 3 ? 'eager' : 'lazy';
    img.decoding = 'async';

    img.onload = () => {
      img.classList.add('loaded');
    };

    img.onerror = () => {
      console.warn('이미지 로딩 실패:', src);
    };

    img.src = src;

    if (img.complete) {
      img.classList.add('loaded');
    }

    slot.appendChild(img);
  }
}


// ── Custom Cursor + Magnifier ──
(function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let mx = 0, my = 0;
  let isDown = false;
  const ZOOM = 1.2;
  const MAG_SIZE = 200;

  const lens = document.createElement('div');
  lens.style.cssText = `
    position: absolute; top: 0; left: 0;
    width: ${MAG_SIZE}px; height: ${MAG_SIZE}px;
    border-radius: 50%; overflow: hidden;
    pointer-events: none; display: none;
  `;

  const inner = document.createElement('div');
  inner.style.cssText = `
    position: absolute;
    transform-origin: 0 0;
    pointer-events: none;
  `;

  lens.appendChild(inner);
  cursor.appendChild(lens);

  function updateLensPos() {
    const sx = window.scrollX || window.pageXOffset;
    const sy = window.scrollY || window.pageYOffset;
    const x = mx + sx;
    const y = my + sy;

    inner.style.transform = `scale(${ZOOM})`;
    inner.style.left = (-x * ZOOM + MAG_SIZE / 2) + 'px';
    inner.style.top = (-y * ZOOM + MAG_SIZE / 2) + 'px';
  }

  function buildSnapshot() {
    inner.innerHTML = '';

    const clone = document.body.cloneNode(true);
    const c = clone.querySelector('#custom-cursor');
    if (c) c.remove();

    clone.querySelectorAll('script').forEach((s) => s.remove());

    clone.style.cssText = `
      position: absolute; top: 0; left: 0;
      width: ${document.body.scrollWidth}px;
      margin: 0; padding: 0;
      pointer-events: none;
    `;

    inner.appendChild(clone);
    inner.style.width = document.body.scrollWidth + 'px';
    inner.style.height = document.body.scrollHeight + 'px';
  }

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';

    if (!cursor.classList.contains('visible')) {
      cursor.classList.add('visible');
    }

    if (isDown) updateLensPos();
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
  });

  document.addEventListener('mouseenter', () => {
    cursor.classList.add('visible');
  });

  document.addEventListener('mousedown', (e) => {
    if (e.target.closest('.nav, button, a, .upload-zone')) return;

    isDown = true;
    cursor.classList.add('magnify');
    lens.style.display = 'block';

    buildSnapshot();
    updateLensPos();
  });

  document.addEventListener('mouseup', () => {
    if (!isDown) return;

    isDown = false;
    cursor.classList.remove('magnify');
    lens.style.display = 'none';
    inner.innerHTML = '';
  });
})();


// ── Active nav highlight ──
const navLinks = document.querySelectorAll('.nav-links a');
const trackedSections = document.querySelectorAll('section[id], div[id]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove('active'));

        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.3 }
);

trackedSections.forEach((s) => navObserver.observe(s));

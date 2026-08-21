// ── Hero Typing Animation ──
(function initTyping() {
  const line1 = document.getElementById('typing-line-1');
  const line2 = document.getElementById('typing-line-2');
  if (!line1 || !line2) return;

  const TEXT_1     = 'PORTFOLIO';
  const TEXT_2     = '2026';
  const CHAR_SPEED = 80;   // ms per character
  const LINE_PAUSE = 220;  // ms pause between lines
  const END_PAUSE  = 900;  // ms before cursor disappears

  // Use inner text spans so cursor element never contaminates textContent
  const t1 = document.createElement('span');
  const t2 = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'hero-cursor';
  cursor.textContent = '|';

  line1.appendChild(t1);
  line1.appendChild(cursor); // cursor starts after line1

  function typeInto(el, text) {
    return new Promise((resolve) => {
      let i = 0;
      const tick = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) { clearInterval(tick); resolve(); }
      }, CHAR_SPEED);
    });
  }

  async function run() {
    await new Promise((r) => setTimeout(r, 400));

    await typeInto(t1, TEXT_1);
    await new Promise((r) => setTimeout(r, LINE_PAUSE));

    // move cursor to line2
    line2.appendChild(t2);
    line2.appendChild(cursor);

    await typeInto(t2, TEXT_2);
    await new Promise((r) => setTimeout(r, END_PAUSE));

    // fade out cursor and remove
    cursor.style.transition = 'opacity 0.5s';
    cursor.style.opacity    = '0';
    setTimeout(() => cursor.remove(), 600);
  }

  run();
})();

// ── Hide NAV on first page ──
(function initHeroNav() {
  const nav = document.querySelector('.nav');
  const hero = document.getElementById('home');

  if (!nav || !hero) return;

  function updateNav() {
    const heroBottom = hero.getBoundingClientRect().bottom;

    // 첫 페이지가 화면에서 완전히 지나가면 NAV 표시
    if (heroBottom <= 0) {
      nav.classList.add('show-nav');
    } else {
      nav.classList.remove('show-nav');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav);

  updateNav();
})();

// ── Config ──
const TOTAL_PAGES = 61; // pages 2–62 (page 63 = closing HTML)
const FINAL_PAGE_TOTAL = 63;
const STORAGE_KEY = 'portfolio_slots';

const VIDEO_PAGES = new Set([
  4, 9, 19, 24, 25, 29,
  32, 38, 40, 44, 48,
  52, 55, 56, 59,
  60, 61
]);

// ── Load saved slots from localStorage ──
function loadSaved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveSaved(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Build portfolio section ──
const section = document.getElementById('portfolio');
const saved   = loadSaved();

for (let i = 1; i <= TOTAL_PAGES; i++) {
  const pageNum = i + 1; // pages 2–56
  const slot    = document.createElement('div');
  slot.className   = 'portfolio-slot';
  slot.dataset.index = i;

  // 모든 페이지에 이동용 id 부여: page-02, page-03, page-21 ...
slot.id = `page-${String(pageNum).padStart(2, '0')}`;

  // page number badge
// page-02에서는 표시하지 않음
if (pageNum !== 2) {
  const numBadge = document.createElement('span');
  numBadge.className   = 'slot-num';
  numBadge.textContent = `${String(pageNum).padStart(2, '0')} / ${FINAL_PAGE_TOTAL}`;
  slot.appendChild(numBadge);
}
    // ── PAGE 02: Project Index ──
if (pageNum === 2) {
  slot.classList.add('project-index-page');

  addProjectIndex(slot);

  section.appendChild(slot);
  continue;
}

  // ── PAGE 17: YouTube Video ──
if (pageNum === 17) {
  slot.classList.add('youtube-page');

  const videoWrap = document.createElement('div');
  videoWrap.className = 'youtube-video-wrap';

  const iframe = document.createElement('iframe');

  iframe.src =
    'https://www.youtube-nocookie.com/embed/9JKTAvEiiZU?rel=0&playsinline=1';

  iframe.title = 'Portfolio YouTube Video';

  iframe.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

  iframe.allowFullscreen = true;

  videoWrap.appendChild(iframe);
  slot.appendChild(videoWrap);

  section.appendChild(slot);

  continue;
}
  
  // upload zone
  const zone = document.createElement('div');
  zone.className = 'upload-zone';
  zone.innerHTML = `
    <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
      <path d="M12 16V8M8 12l4-4 4 4"/>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke-opacity=".4"/>
    </svg>
    <span class="upload-label">로딩 중입니다. 잠시만 기다려주세요.</span>
    <input type="file" accept="image/*,video/*" />
  `;
  slot.appendChild(zone);

  const fileInput = zone.querySelector('input[type="file"]');

  // ── Auto-load from assets folder ──
  const padded2 = String(pageNum).padStart(2, '0');
  const padded3 = String(pageNum).padStart(3, '0');

  const candidates = VIDEO_PAGES.has(pageNum)
  ? [
      { type: 'video', src: `assets/videos/page-${padded2}.mp4` }
    ]
  : [
      { type: 'image', src: `assets/images/page-${padded2}.png` },
      { type: 'video', src: `assets/videos/page-${padded2}.mp4` }
    ];
  
  function tryCandidate(index = 0) {
    if (index >= candidates.length) {
      console.warn(`page-${padded2} 파일을 찾지 못했습니다.`);
      return;
    }

    const item = candidates[index];

    if (item.type === 'image') {
      const testImg = new Image();

      testImg.onload = () => {
        renderMedia(slot, zone, 'image', item.src);
      };

      testImg.onerror = () => {
        tryCandidate(index + 1);
      };

      testImg.src = item.src;
    }

    if (item.type === 'video') {
      const testVideo = document.createElement('video');

      testVideo.onloadedmetadata = () => {
        testVideo.remove();
        renderMedia(slot, zone, 'video', item.src);
      };

      testVideo.onerror = () => {
        testVideo.remove();
        tryCandidate(index + 1);
      };

      testVideo.preload = 'metadata';
      testVideo.src = item.src;
      testVideo.load();
    }
  }

  tryCandidate();

  // ── File input change ──
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleFile(slot, zone, file, i);
  });

  // ── Drag & drop ──
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
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
    const src  = e.target.result;
    const type = file.type.startsWith('video') ? 'video' : 'image';
    renderMedia(slot, zone, type, src);
    try {
      const sv = loadSaved();
      sv[index] = { type, src };
      saveSaved(sv);
    } catch { /* quota exceeded for large files */ 
    }
  };
  
  reader.readAsDataURL(file);
}

// ── Render image or video inside slot ──
function renderMedia(slot, zone, type, src) {
  slot.querySelectorAll('img, video').forEach((el) => el.remove());
  zone.classList.add('hidden');

  const pageNum = Number(slot.dataset.index) + 1;

  if (type === 'video') {
  const vid = document.createElement('video');

  vid.src = src;
  vid.preload = 'auto';
  vid.autoplay = true;
  vid.loop = true;
  vid.playsInline = true;
  vid.muted = true;
  vid.controls = false;
    
  slot.appendChild(vid);  
  } else {
  const img = document.createElement('img');

  img.alt = '';
  img.loading = 'lazy';
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

  // magnifier lens — a cloned <body> rendered at 120% inside the circle
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
    inner.style.top  = (-y * ZOOM + MAG_SIZE / 2) + 'px';
  }

  function buildSnapshot() {
    // clone entire body into lens
    inner.innerHTML = '';
    const clone = document.body.cloneNode(true);
    // remove cursor from clone
    const c = clone.querySelector('#custom-cursor');
    if (c) c.remove();
    // remove scripts
    clone.querySelectorAll('script').forEach((s) => s.remove());
    // set dimensions
    clone.style.cssText = `
      position: absolute; top: 0; left: 0;
      width: ${document.body.scrollWidth}px;
      margin: 0; padding: 0;
      pointer-events: none;
    `;
    inner.appendChild(clone);
    inner.style.width  = document.body.scrollWidth + 'px';
    inner.style.height = document.body.scrollHeight + 'px';
  }

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    if (!cursor.classList.contains('visible')) cursor.classList.add('visible');
    if (isDown) updateLensPos();
  });

  document.addEventListener('mouseleave', () => cursor.classList.remove('visible'));
  document.addEventListener('mouseenter', () => cursor.classList.add('visible'));

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
const navLinks       = document.querySelectorAll('.nav-links a');
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

function addProjectIndex(slot) {
  const projects = [
    {
      num: '(01)',
      title: 'WINKLE',
      desc: 'Beverage Branding',
      image: 'assets/images/project-01.png',
      target: '#page-03',

      imgX: 200,
      imgY: 401,
      imgW: 249,
      imgH: 263,

      numY: 366,

      titleY: 686,

      descY: 710
    },

    {
      num: '(02)',
      title: 'DAYMINE',
      desc: 'Health Care Branding',
      image: 'assets/images/project-02.png',
      target: '#page-19',

      imgX: 519,
      imgY: 401,
      imgW: 249,
      imgH: 405,

      numX: 626,
      numY: 366,

      titleX: 605,
      titleY: 828,

      descX: 569,
      descY: 852
    },

    {
      num: '(03)',
      title: '3.3',
      desc: 'Pop - Up Store / 실무',
      image: 'assets/images/project-03.png',
      target: '#page-34',

      imgX: 836,
      imgY: 401,
      imgW: 249,
      imgH: 263,

      numX: 944,
      numY: 366,

      titleX: 949,
      titleY: 686,

      descX: 911,
      descY: 710
    },

    {
      num: '(04)',
      title: 'BPT',
      desc: 'Rebranding / 실무',
      image: 'assets/images/project-04.png',
      target: '#page-43',

      imgX: 1155,
      imgY: 401,
      imgW: 249,
      imgH: 348,

      numX: 1262,
      numY: 366,

      titleX: 1251,
      titleY: 771,

      descX: 1208,
      descY: 795
    },

    {
      num: '(05)',
      title: 'ORION',
      desc: 'Promotion Contents / 실무',
      image: 'assets/images/project-05.png',
      target: '#page-49',

      imgX: 1472,
      imgY: 401,
      imgW: 249,
      imgH: 263,

      numX: 1579,
      numY: 366,

      titleX: 1552,
      titleY: 686,

      descX: 1546,
      descY: 710
    }
  ];


  const layer = document.createElement('div');
  layer.className = 'page02-project-layer';
  
  layer.innerHTML += `
    <!-- 좌상단 / 우상단 -->
    <div class="page02-kicker page02-kicker-left">INTRODUCE</div>
    <div class="page02-kicker page02-kicker-right">CONTENTS</div>

    <!-- 중앙 메인 문구 -->
    <div class="page02-headline">
      <span class="light">브랜드의 </span><span class="semibold">지금을 읽고,</span><br>
      <span class="semibold">다음을</span><span class="light"> 그리는 디자이너 전영현입니다.</span>
    </div>

    <!-- 연락처 -->
    <div class="page02-contact">010.4079.5374 / biging1212@gmail.com</div>
    <div class="page02-guide">
    *이미지 선택 시,<br>
    해당 프로젝트로 이동 가능합니다.
  </div>
  `;


  // 1920 × 1080 Figma 좌표 → 반응형 % 좌표
  const x = (value) => `${(value / 1920) * 100}%`;
  const y = (value) => `${(value / 1080) * 100}%`;


  projects.forEach((project) => {

    layer.innerHTML += `

      <!-- 프로젝트 번호 -->
      <span
        class="page02-text page02-num"
        style="
          left:${x(project.imgX)};
          top:${y(project.numY)};
          width:${x(project.imgW)};
        "
      >
        ${project.num}
      </span>


      <!-- 프로젝트 이미지 -->
      <a
        class="page02-thumb"
        href="${project.target}"
        style="
          left:${x(project.imgX)};
          top:${y(project.imgY)};
          width:${x(project.imgW)};
          height:${y(project.imgH)};
        "
      >
        <img src="${project.image}" alt="" />
      </a>


      <!-- 프로젝트명 -->
      <span
        class="page02-text page02-title"
        style="
          left:${x(project.imgX)};
          top:${y(project.titleY)};
          width:${x(project.imgW)};
        "
      >
        ${project.title}
      </span>


      <!-- 프로젝트 설명 -->
      <span
        class="page02-text page02-desc"
        style="
          left:${x(project.imgX)};
          top:${y(project.descY)};
          width:${x(project.imgW)};
        "
      >
        ${project.desc}
      </span>

    `;
  });


  slot.appendChild(layer);
}

// ── Hero name → NAV center scroll animation ──

(function initNameToNavAnimation() {

  const hero = document.getElementById('home');
  const source = document.querySelector('.hero-bottom-name');
  const target = document.querySelector('.nav-home-name');
  const flying = document.getElementById('flying-name');
  const nav = document.querySelector('.nav');

  if (!hero || !source || !target || !flying || !nav) return;


  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }


  function update() {

    const heroHeight = hero.offsetHeight;

    /*
      애니메이션 시작:
      Page 01의 약 45% 스크롤한 시점

      애니메이션 종료:
      Page 01이 거의 끝나는 시점
    */
    const startScroll = heroHeight * 0.45;
    const endScroll = heroHeight * 0.92;

    const scrollY = window.scrollY;

    const progress = clamp(
      (scrollY - startScroll) /
      (endScroll - startScroll),
      0,
      1
    );


    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();


    /*
      sourceRect는 스크롤하면서 움직이기 때문에
      문서상의 원래 위치로 보정
    */
    const sourceX =
      sourceRect.left +
      sourceRect.width / 2;

    const sourceY =
      sourceRect.top +
      sourceRect.height / 2;


    const targetX =
      targetRect.left +
      targetRect.width / 2;

    const targetY =
      targetRect.top +
      targetRect.height / 2;


    /*
      현재 위치를 source → target 사이에서 보간
    */
    const currentX =
      sourceX +
      (targetX - sourceX) * progress;

    const currentY =
      sourceY +
      (targetY - sourceY) * progress;


    /*
      90px → 약 14px
    */
    const startScale = 1;
    const endScale = 14 / 90;

    const scale =
      startScale +
      (endScale - startScale) * progress;


    flying.style.left = `${currentX}px`;
    flying.style.top = `${currentY}px`;

    flying.style.transform =
      `translate(-50%, -50%) scale(${scale})`;


    /*
      시작하기 전에는 원본 이름 표시
    */
    if (progress === 0) {

      source.style.opacity = '1';

      flying.style.opacity = '0';

      nav.classList.remove('show-nav');

      return;
    }


    /*
      이동 중
    */
    if (progress > 0 && progress < 1) {

      source.style.opacity = '0';

      flying.style.opacity = '1';

      nav.classList.remove('show-nav');

      return;
    }


    /*
      이동 완료 → flying name 숨기고
      NAV의 실제 이름 표시
    */
    source.style.opacity = '0';
    flying.style.opacity = '0';

    nav.classList.add('show-nav');

  }


  window.addEventListener(
    'scroll',
    update,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    update
  );

  window.addEventListener(
    'load',
    update
  );


  update();

})();

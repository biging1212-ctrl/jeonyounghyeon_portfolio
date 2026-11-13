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
const TOTAL_PAGES = 68; // pages 2–69 (page 70 = closing HTML)
const FINAL_PAGE_TOTAL = 70;
const STORAGE_KEY = 'portfolio_slots';

const VIDEO_PAGES = new Set([
  4, 18, 25, 45, 46, 47,
  51, 53, 61, 68, 69
]);

// ── Project Start Page Meta ──
const PROJECT_START_META = {

  3: {
    category: 'BRANDING PROJECT',
    title: 'WINKLE 윙클',
    period: '2023, 2025',
    scope: 'Personal Study, 100%',
    tool: 'Figma, Illustrator, Photoshop,<br>After Effects, Blender, Gpt,<br>Nanobanana',
    theme: 'light'
  },

  20: {
    category: 'CONTENT PROJECT',
    title: 'LOTTE CHILSUNG (크러시, 처음처럼)',
    period: '2024.08 - 2025.04',
    scope: 'Created at Bigpictureteam,<br>Personal Scope 100%',
    tool: 'Figma, Illustrator, Photoshop',
    theme: 'dark'
  },

  27: {
    category: 'BRAND RETAIL PROJECT',
    title: 'BIBIGO KIMCHI SAUCE',
    period: '2026.01',
    scope: 'Personal Study, 100%',
    tool: 'Figma, Illustrator, Photoshop,<br>C4D, Gpt, Midjourney',
    theme: 'light'
  },

  43: {
    category: 'CONTENT PROJECT',
    title: 'ORION 오리온',
    period: '2025.01 - 2025.08',
    scope: 'Created at Bigpictureteam,<br>Personal Scope 100%',
    tool: 'Figma, Illustrator,<br>Photoshop, After effects',
    theme: 'light'
  },

  49: {
    category: 'POP-UP PROJECT',
    title: '삼쩜삼',
    period: '2024.10 - 2024.12',
    scope: 'Created at Bigpictureteam,<br>Personal Scope 70%',
    tool: 'Figma, Illustrator, Photoshop,<br>After Effects',
    theme: 'dark'
  },  

  58: {
    category: 'REBRANDING PROJECT',
    title: 'BIGPICTURETEAM',
    period: '2024.11 - 2025.02',
    scope: 'Created at Bigpictureteam,<br>Personal Scope 60%',
    tool: 'Figma, Illustrator, Photoshop,<br>After Effects, Blender',
    theme: 'light'
  }

};

// ── Page Section Text Meta ──
const PAGE_SECTION_META = {
  28: {
    title: 'PROJECT BACKGROUND',
    body: '비비고의 해외 수출용 제품군에서 대용량 김치 소스가 업장용으로 유통되고 있다는 점에 주목했습니다. 김치의 풍미를 간편하게 구현할 수 있는 소스라면 외식업뿐 아니라 해외 가정의 일상적인 식탁에서도 충분히 활용될 수 있다고 판단해 프로젝트를 시작했습니다. 기존의 김치 요리 전용 소스를 넘어 볶고·뿌리고·찍어 먹으며 다양한 음식에 한국의 맛을 더하는 만능 K-소스로 용도와 소비 장면을 재정의했습니다.',
    theme: 'dark'
  },
  
  31: {
    title: 'LOGO TYPE',
    body: '',
    theme: 'dark'
  },

  32: {
    title: 'DESIGN SYSTEM',
    body: '',
    theme: 'dark'
  },

  34: {
    title: 'PACKAGE DESIGN',
    body: '',
    theme: 'dark'
  },
  
  37: {
    title: 'OFFLINE POP-UP',
    body: '브랜드 경험을 온라인에서 오프라인으로 확장하기 위한 팝업 다이닝 클럽을 기획했습니다. 나초, 피자, 누들 등 글로벌 소비자에게 친숙한 메뉴에 김치소스를 접목한 다이닝 경험을 제공하고, 이번 비비고 소스 제품의 블랙&레드 비주얼 아이덴티티를 공간 전체에 적용해 제품 세계관을 입체적으로 전달했습니다.',
    theme: 'dark'
  },
  
  4: {
    title: 'BRAND BACKGROUND',
    body: '제로 음료가 일상적인 선택으로 자리 잡았지만, 소비자에게는 여전히 몇 가지 망설임이 남아 있습니다. 감미료에 대한 불안과 채소를 활용한 음료는 맛이 없을 것이라는 편견을 갖기 쉽습니다. 여기에 건강과 체중 관리를 위해 끊임없이 선택을 통제해야 하는 피로감까지 더해지며, 제로 음료가 즐거움보다 관리의 수단으로 받아들여지기도 합니다. 이에 건강함을 강조하기보다 맛과 기분을 먼저 생각하며 편안하게 선택할 수 있는 새로운 음료 경험이 필요했습니다.',
    theme: 'light'
  },

  6: {
  title: 'BRAND ESSENCE',
  body: '',
  theme: 'light'
  },
  
  7: {
    title: 'BRAND CORE VALUE',
    body: '건강을 의식하는 선택이 절대 부담으로 느껴지지 않도록, 밝은 에너지와 가벼운 선택, 유쾌한 즐거움을 핵심 가치로 설정했습니다. 과일과 채소가 주는 산뜻한 이미지와 제로 음료의 부담 없는 특성을 바탕으로, 일상에서 편하게 고르고 기분 좋게 즐길 수 있는 브랜드 경험을 만들고자 했습니다.',
    theme: 'light'
  },

  8: {
    title: 'BRAND LOGO',
    body: '',
    theme: 'light'
  },  

  9: {
    title: 'COLOR SYSTEM',
    body: '',
    theme: 'light'
  },    

  10: {
    title: 'GRAPHIC MOTIF & TYPEFACE',
    body: 'Winkle의 그래픽 모티프는 브랜드명에서 착안한 별을 중심으로, 비눗방울과 폭죽처럼 즐거운 순간을 떠올리게 하는 요소를 결합했습니다. 이를 하프톤 스타일로 표현해 경쾌한 에너지와 유쾌한 브랜드 무드를 시각화했습니다.',
    theme: 'light'
  },

  11: {
  title: 'PRODUCT DESIGN',
  body: '컬러팝 오렌지와 강한 타이포그래피를 활용해 과채 음료를 밝고 자극적인 탄산 이미지로 전환했습니다. 로고와 플레이버명을 크게 배치해 진열 환경에서도 제품의 개성과 맛이 빠르게 인지되도록 했으며, 하단의 블랙 정보 바를 통해 제로 스파클링과 용량 등 핵심 정보를 명확하게 구분했습니다.',
  theme: 'light'
  },

  14: {
    title: 'BRAND CHARACTER IP',
    body: 'Winkle Crew는 걱정을 내려놓고 현재의 즐거움을 발견해가는 과정을 세 캐릭터의 관계로 풀어낸 브랜드 IP입니다. 서로 다른 감정과 성격을 지닌 세 캐릭터가 만나 고민을 공감하고 긍정적인 방향으로 나아가며, Winkle이 전하고자 하는 자유로움과 즐거움, 밝은 에너지를 하나의 이야기로 전달합니다. 개성 있는 캐릭터를 통해 제품의 메시지를 친근하게 전달하고, 패키지와 콘텐츠, 게임형 경험으로 확장할 수 있도록 기획했습니다.',
    theme: 'light'
  },
  
  17: {
    title: 'APPLICATION',
    body: '',
    theme: 'light'
  },    

  50: {
    title: 'PROJECT OVERVIEW',
    body: '‘모두의 연말정산’은 어렵고 딱딱하게 느껴질 수 있는 연말정산을 2030 세대가 자신의 한 해를 돌아보고 기록하는 경험으로 풀어낸 삼쩜삼의 팝업스토어입니다. 세금이라는 소재를 보다 친근하게 경험하며 브랜드의 공감과 친밀감을 느낄 수 있도록 기획되었습니다. 초기 아이데이션에 참여해 제안한 콘셉트 스토리가 프로젝트의 주 방향으로 채택되었으며, 이를 바탕으로 키비주얼부터 굿즈, 현장 그래픽을 담당했습니다.',
    theme: 'light'
  },  

  51: {
    title: 'KEY CONCEPT',
    body: '연말이라는 시점을 떠올렸을 때, 선물을 주고받았던 특별한 순간, 사진처럼 남아 있는 추억, 무심히 흘러갔지만 결국 하루하루 쌓인 일상, 그리고 그 안에서 더욱 선명해지는 소중한 기억들을 먼저 떠올렸습니다. 이러한 연말의 감정과 장면들을 바탕으로 특별함, 추억, 일상, 소중함의 키워드를 도출했고, 이를 직관적인 오브제로 시각화해 팝업의 전체 디자인 컨셉으로 정했습니다.',
    theme: 'light'
  },  
  
  54: {
    title: 'GOODS DESIGN',
    body: '한 해를 돌아보고 기록할 수 있도록, 다이어리 스티커·질문 미니북·포토부스 프레임·현장 참여물 등 기록 중심의 굿즈를 제작 했습니다. 키비주얼 그래픽과 컬러 무드를 활용하여 따뜻한 분위기와 참여 경험이 함께 전달되도록 디자인했습니다.',
    theme: 'light'
  },  
  
  55: {
  title: 'EVENT STILL',
  body: '',
  theme: 'light'
  },
  
  57: {
  title: 'DISPLAY ADVERTISING',
  body: '',
  theme: 'light'
  },
  
  44: {
    title: 'PROJECT OVERVIEW',
    body: '오리온 공식 SNS 콘텐츠 제작 프로젝트로, 신제품 출시와 브랜드 이벤트, 시즌 이슈를 소비자에게 쉽고 재미있게 전달하는 것을 목표로 했습니다. 제품의 맛과 특징이 한눈에 보이도록 강한 컬러감과 직관적인 제품 비주얼을 활용했으며, 오리온의 다양한 제품을 일상 속에서 즐기고 공유할 수 있는 친근한 브랜드 경험으로 확장했습니다.',
    theme: 'light',
    accent: '#E60012'
  },

  45: {
  title: 'TYPE 01',
  subtitle: '신상선발대 / 크루 모집',
  body: '',
  theme: 'light',
  accent: '#E60012'
  },

  46: {
  title: 'TYPE 02',
  subtitle: '소비자 참여를 만드는 반응형 콘텐츠',
  body: '',
  theme: 'light',
  accent: '#E60012'
  },

  47: {
  title: 'TYPE 03',
  subtitle: '시즌 이슈와 브랜드를 연결하는 콘텐츠',
  body: '',
  theme: 'light',
  accent: '#E60012'
  },
 
  48: {
  title: 'TYPE 04',
  subtitle: '신제품을 빠르게 전달하는 콘텐츠',
  body: '',
  theme: 'light',
  accent: '#E60012'
  },

  21: {
  title: 'CRUSH ON KRUSH',
  body: '새롭게 등장한 크러시가 경쟁이 치열한 맥주 시장에서 젊은 소비자에게 빠르게 인지되고, 차별화된 브랜드 이미지를 구축할 수 있도록 SNS 커뮤니케이션을 기획했습니다. 크러시의 강렬한 컬러와 젊은 이미지를 바탕으로 게임, 챌린지, 인터랙션 요소를 결합해 소비자의 반응과 참여를 유도하는 콘텐츠를 제작했습니다.',
  theme: 'light'
  },

  24: {
  title: 'AGAIN 처음처럼',
  body: '처음처럼의 축적된 브랜드 자산을 현재 소비자 감성에 맞게 재해석한 인스타그램 콘텐츠 작업입니다. ‘Again 처음처럼’ 컨셉을 바탕으로 친근함과 추억의 이미지를 일상 공감형 콘텐츠로 확장하고, 소비자와 다시 연결되는 브랜드 커뮤니케이션을 제안했습니다.',
  theme: 'dark'
  },

  59: {
    title: 'REBRANDING BACKGROUND',
    body: '빅픽처팀은 캐릭터 기반 콘텐츠 제작을 넘어 브랜드 아이덴티티, 디지털 콘텐츠, 공간 경험까지 업무 영역을 확장해왔습니다. 그러나 기존 아이덴티티는 친근하고 캐주얼한 인상이 강해, 확장된 업무 범위와 크리에이티브 에이전시로서의 전문성을 충분히 전달하기 어려웠습니다. 또한 긴 형태의 워드마크와 통합된 응용 기준의 부재로 인해 디지털 화면, 공간 사인, 인쇄물 등 다양한 환경에서 일관된 브랜드 인상을 구축하는 데 한계가 있었습니다.',
    theme: 'dark'
  },

  60: {
    title: 'DESIGN DIRECTION',
    body: '브랜드가 가진 창의적이고 대담한 태도는 유지하면서, 성장한 조직의 전문성과 신뢰감을 함께 전달하는 방향으로 리브랜딩을 진행했습니다. 긴 사명을 중심으로 한 기존 로고에서 벗어나 BPT 이니셜을 핵심 브랜드 자산으로 설정해 인지성과 활용성을 높였습니다. 또한 평면적인 표현에 한정되지 않고, 디지털 콘텐츠와 공간 환경까지 유연하게 확장할 수 있도록 입체감과 움직임을 새로운 시각 언어로 도입했습니다.',
    theme: 'dark'
  },

  63: {
    title: 'IDENTITY GRAPHIC',
    body: '브랜드 아이콘과 그래픽 에셋은 메시지를 직관적으로 전달하고, 일관된 브랜드 이미지를 형성하는 핵심 시각 언어입니다. 로고 심볼의 기본 조형(B, P, T)를 확장하여 다양한 카테고리를 상징하는 그래픽으로 표현했습니다. 카테고리의 표현뿐만 아니라 다양한 인터렉션 요소로 확장할 수 있습니다.',
    theme: 'light'
  },

  65: {
    title: 'ICONOGRAPHY',
    body: '',
    theme: 'light'
  },

  67: {
    title: '3D ASSET',
    body: '',
    theme: 'dark'
  }

};

// ── Page Section Text Overlay ──
function addPageSectionText(slot, pageNum) {

  const data = PAGE_SECTION_META[pageNum];

  if (!data) return;


  const overlay = document.createElement('div');

  overlay.className =
    `page-section-text page-section-text--${data.theme}`;


  if (data.top) {
  overlay.style.top = data.top;
}
  
  const titleStyle =
    data.accent
      ? `style="color:${data.accent}"`
      : '';


  overlay.innerHTML = `

    <div
      class="page-section-title"
      ${titleStyle}
    >
      ${data.title}
    </div>
    
      ${data.subtitle ? `
    <div class="page-section-subtitle">
       ${data.subtitle}
    </div>
  ` : ''}
  
      ${data.body ? `
    <div class="page-section-body">
       ${data.body}
    </div>
  ` : ''}

  `;


  slot.appendChild(overlay);
}

// ── Project Start Page Header ──
function addProjectStartHeader(slot, pageNum) {

  const data = PROJECT_START_META[pageNum];

  // 시작 페이지가 아니면 아무것도 만들지 않음
  if (!data) return;


  const header = document.createElement('div');

  header.className =
    `project-start-header project-start-header--${data.theme}`;


  header.innerHTML = `

    <div class="project-start-left">

      <div class="project-start-category">
        ${data.category}
      </div>

      <div class="project-start-title">
        ${data.title}
      </div>

    </div>


    <div class="project-start-meta">

      <div class="project-start-meta-item">

        <div class="project-start-meta-label">
          PERIOD
        </div>

        <div class="project-start-meta-value">
          ${data.period}
        </div>

      </div>


      <div class="project-start-meta-item">

        <div class="project-start-meta-label">
          SCOPE
        </div>

        <div class="project-start-meta-value">
          ${data.scope}
        </div>

      </div>


      <div class="project-start-meta-item project-start-meta-tool">

        <div class="project-start-meta-label">
          TOOL
        </div>

        <div class="project-start-meta-value">
          ${data.tool}
        </div>

      </div>

    </div>

  `;


  slot.appendChild(header);
}


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
  const pageNum = i + 1; // pages 2–70
  const slot    = document.createElement('div');
  slot.className   = 'portfolio-slot';
  slot.dataset.index = i;

  // 모든 페이지에 이동용 id 부여: page-02, page-03, page-20 ...
slot.id = `page-${String(pageNum).padStart(2, '0')}`;
addProjectStartHeader(slot, pageNum);
addPageSectionText(slot, pageNum);
  
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

  // ── PAGE 30: KIMCHI SAUCE LOGO MOTION ──
if (pageNum === 30) {

  slot.classList.add('page30-motion-page');

  const stack = document.createElement('div');
  stack.className = 'page30-stack';


  // 1. BACKGROUND
  const bg = document.createElement('img');

  bg.src = 'assets/images/page-30-bg.png';
  bg.alt = '';
  bg.className = 'page30-layer page30-bg';


  // 2. ANIMATED LOGO
  const logo = document.createElement('img');

  logo.src = 'assets/images/page-30-logo.png';
  logo.alt = '';
  logo.className = 'page30-layer page30-logo';


  // 3. FOREGROUND OBJECT
  const object = document.createElement('img');

  object.src = 'assets/images/page-30-object.png';
  object.alt = '';
  object.className = 'page30-layer page30-object';


  // 레이어 순서 중요
  stack.appendChild(bg);
  stack.appendChild(logo);
  stack.appendChild(object);

  slot.appendChild(stack);

  section.appendChild(slot);


  // 화면 진입 시 모션 실행
  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          slot.classList.remove('is-active');

          // 모션 재시작
          void slot.offsetWidth;

          slot.classList.add('is-active');

        } else {

          slot.classList.remove('is-active');

        }

      });

    },
    {
      threshold: 0.35
    }
  );


  observer.observe(slot);

  continue;
}

  // ── PAGE 34: 4 IMAGE INSTANT SWITCH ──
if (pageNum === 34) {

  slot.classList.add('page34-switch-page');

  const slideshow = document.createElement('div');
  slideshow.className = 'page34-switch';

  const slideImages = [
    'assets/images/page-34-01.png',
    'assets/images/page-34-02.png',
    'assets/images/page-34-03.png',
    'assets/images/page-34-04.png'
  ];

  const slides = [];


  slideImages.forEach((src, index) => {

    const img = document.createElement('img');

    img.src = src;
    img.alt = '';
    img.className = 'page34-slide';

    if (index === 0) {
      img.classList.add('is-active');
    }

    slideshow.appendChild(img);

    slides.push(img);
  });


  slot.appendChild(slideshow);
  section.appendChild(slot);


  // 4장의 이미지가 전부 로드된 후 전환 시작
  Promise.all(
    slides.map((img) => {

      if (img.complete) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });

    })
  ).then(() => {

    let currentSlide = 0;

    setInterval(() => {

      const nextSlide =
        (currentSlide + 1) % slides.length;


      slides[nextSlide].classList.add('is-active');
      slides[currentSlide].classList.remove('is-active');


      currentSlide = nextSlide;

    }, 2000);

  });

  continue;
}

  
// ── PAGE 38: RANDOM PHOTO COLLAGE ──
if (pageNum === 38) {

  slot.classList.add('page38-collage-page');

  const collage = document.createElement('div');
  collage.className = 'page38-collage';


  const photos = [

    {
      src: 'assets/images/page-38-01.png',
      className: 'photo-01'
    },

    {
      src: 'assets/images/page-38-02.png',
      className: 'photo-02'
    },

    {
      src: 'assets/images/page-38-03.png',
      className: 'photo-03'
    },

    {
      src: 'assets/images/page-38-04.png',
      className: 'photo-04'
    },

    {
      src: 'assets/images/page-38-05.png',
      className: 'photo-05'
    },

    {
      src: 'assets/images/page-38-06.png',
      className: 'photo-06'
    },

    {
      src: 'assets/images/page-38-07.png',
      className: 'photo-07'
    }

  ];


  const photoElements = [];


  photos.forEach((photo) => {

    const img = document.createElement('img');

    img.src = photo.src;

    img.alt = '';

    img.className =
      `page38-photo ${photo.className}`;

    collage.appendChild(img);

    photoElements.push(img);

  });


  slot.appendChild(collage);

  section.appendChild(slot);



  /* ─────────────────────────
     RANDOM APPEAR ANIMATION
  ───────────────────────── */


  function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

      const j =
        Math.floor(Math.random() * (i + 1));

      [copy[i], copy[j]] =
        [copy[j], copy[i]];

    }

    return copy;
  }



  function playCollage() {

    /* 모든 사진 초기화 */

    photoElements.forEach((photo) => {

      photo.classList.remove('is-visible');

    });



    /* 매번 등장 순서 랜덤 */

    const order =
      shuffle(photoElements);



    /*
      한 장씩 등장.

      기본 간격 350ms
      + 랜덤 간격 0~350ms
    */

    let accumulatedDelay = 100;


    order.forEach((photo) => {

      const randomGap =
        100 + Math.random() * 150;


      accumulatedDelay += randomGap;


      setTimeout(() => {

        photo.classList.add('is-visible');

      }, accumulatedDelay);

    });



    /*
      마지막 사진 등장 후 잠시 완성 상태 유지
      그 후 다시 시작
    */

    const totalDuration =
      Math.max(accumulatedDelay + 1000, 3200);


    setTimeout(() => {

      playCollage();

    }, totalDuration);

  }



  /* 이미지 모두 로드된 뒤 시작 */

  Promise.all(

    photoElements.map((img) => {

      if (img.complete) {

        return Promise.resolve();

      }

      return new Promise((resolve) => {

        img.onload = resolve;
        img.onerror = resolve;

      });

    })

  ).then(() => {

    playCollage();

  });


  continue;
}

  
  // ── PAGE 42: 4 IMAGE SLIDESHOW ──
if (pageNum === 42) {

  slot.classList.add('page42-slideshow-page');

  const slideshow = document.createElement('div');
  slideshow.className = 'page42-slideshow';

  const slideImages = [
    'assets/images/page-42-01.png',
    'assets/images/page-42-02.png',
    'assets/images/page-42-03.png',
    'assets/images/page-42-04.png'
  ];


  const slides = [];


  slideImages.forEach((src, index) => {

    const img = document.createElement('img');

    img.src = src;
    img.alt = '';
    img.className = 'page42-slide';

    /* 미리 로딩 */
    img.loading = 'eager';
    img.decoding = 'async';

    if (index === 0) {
      img.classList.add('is-active');
    }

    slideshow.appendChild(img);

    slides.push(img);
  });


  slot.appendChild(slideshow);
  section.appendChild(slot);


  /* ── 이미지 4장을 전부 미리 캐싱 ── */

  const preloadPromises = slideImages.map((src) => {

    return new Promise((resolve) => {

      const preload = new Image();

      preload.onload = resolve;
      preload.onerror = resolve;

      preload.src = src;

    });

  });


  Promise.all(preloadPromises).then(() => {

    let currentSlide = 0;

    const DISPLAY_TIME = 2000;
    const FADE_TIME = 400;


    setInterval(() => {

      const previousSlide = currentSlide;

      const nextSlide =
        (currentSlide + 1) % slides.length;


      /*
        핵심:
        기존 이미지를 먼저 없애지 않고
        다음 이미지를 그 위에 먼저 보여줌
      */

      slides[nextSlide].classList.add('is-active');


      /*
        다음 이미지가 완전히 올라온 뒤
        이전 이미지 제거
      */

      setTimeout(() => {

        slides[previousSlide].classList.remove('is-active');

      }, FADE_TIME);


      currentSlide = nextSlide;

    }, DISPLAY_TIME);

  });


  continue;
}

  // ── PAGE-36: 2 IMAGE SLIDESHOW ──
if (pageNum === 36) {

  slot.classList.add('page36-slideshow-page');

  const slideshow = document.createElement('div');
  slideshow.className = 'page36-slideshow';

  const slideImages = [
    'assets/images/page-36-01.png',
    'assets/images/page-36-02.png'
  ];

  slideImages.forEach((src, index) => {

    const img = document.createElement('img');

    img.src = src;
    img.alt = '';
    img.className = 'page36-slide';

    if (index === 0) {
      img.classList.add('is-active');
    }

    slideshow.appendChild(img);
  });

  slot.appendChild(slideshow);
  section.appendChild(slot);

  const slides = slideshow.querySelectorAll('.page36-slide');

  let currentSlide = 0;

  setInterval(() => {

    slides[currentSlide].classList.remove('is-active');

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add('is-active');

  }, 2000);

  continue;
}
  
  // ── PAGE 16: YouTube Video ──
if (pageNum === 16) {
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
      renderMedia(slot, zone, 'video', item.src);
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

  // PAGE 46: 마우스가 페이지 안에 있을 때만 소리 재생
if (pageNum === 46) {
  vid.volume = 0.5;
  vid.muted = true;

  slot.addEventListener('mouseenter', () => {
    vid.volume = 0.5;
    vid.muted = false;

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  });

  slot.addEventListener('mouseleave', () => {
    vid.muted = true;
  });
}
    
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

// ── Custom Cursor ──
(function initCursor() {

  const cursor =
    document.getElementById('custom-cursor');

  if (!cursor) return;


  document.addEventListener(
    'mousemove',
    (e) => {

      cursor.style.left =
        e.clientX + 'px';

      cursor.style.top =
        e.clientY + 'px';

      if (
        !cursor.classList.contains('visible')
      ) {
        cursor.classList.add('visible');
      }

    }
  );


  document.addEventListener(
    'mouseleave',
    () => {

      cursor.classList.remove('visible');

    }
  );


  document.addEventListener(
    'mouseenter',
    () => {

      cursor.classList.add('visible');

    }
  );

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
      title: 'WINKLE',
      desc: 'BRANDING / PERSONAL',
      range: '( 03 - 19 )',

      image: 'assets/images/page-02-winkle.png',
      target: '#page-03',

      barX: 145,
      barY: 396,

      previewX: 145,
      previewY: 441
    },


    {
      title: 'LOTTE CHILSUNG',
      desc: 'SNS CONTENT / 실무',
      range: '( 20 - 26 )',

      image: 'assets/images/page-02-lotte.png',
      target: '#page-20',

      barX: 395,
      barY: 468,

      previewX: 395,
      previewY: 513
    },


    {
      title: 'KIMCHI SAUCE',
      desc: 'BRAND RETAIL / PERSONAL',
      range: '( 27 - 42 )',

      image: 'assets/images/page-02-kimchi.png',
      target: '#page-27',

      barX: 645,
      barY: 540,

      previewX: 1326,
      previewY: 340,
    },


    {
      title: 'ORION',
      desc: 'SNS CONTENT / 실무',
      range: '( 43 - 48 )',

      image: 'assets/images/page-02-orion.png',
      target: '#page-43',

      barX: 895,
      barY: 612,

      previewX: 1576,
      previewY: 412
    },


    {
      title: '삼쩜삼',
      desc: 'POP - UP STORE / 실무',
      range: '( 49 - 57 )',

      image: 'assets/images/page-02-삼쩜삼.png',
      target: '#page-49',

      barX: 645,
      barY: 684,

      previewX: 1326,
      previewY: 729
    },


    {
      title: 'BPT',
      desc: 'REBRANDING / 실무',
      range: '( 58 - 69 )',

      image: 'assets/images/page-02-bpt.png',
      target: '#page-58',

      barX: 395,
      barY: 756,

      previewX: 1076,
      previewY: 837
    }

  ];


  const layer = document.createElement('div');
  layer.className = 'page02-project-layer';


  /* ─────────────────────────────
     PAGE 02 상단 텍스트
  ───────────────────────────── */

  layer.innerHTML = `

    <div class="page02-kicker page02-kicker-left">
      INTRODUCE
    </div>

    <div class="page02-kicker page02-kicker-right">
      CONTENTS
    </div>


    <div class="page02-headline">

      <span class="light">
        브랜드의
      </span>

      <span class="semibold">
        지금을 읽고,
      </span>

      <br>

      <span class="semibold">
        다음을 만드는
      </span>

      <span class="light">
        디자이너 전영현입니다.
      </span>

    </div>


    <div class="page02-contact">
      010.4079.5374 / biging1212@gmail.com
    </div>

  `;


  /* ─────────────────────────────
     FIGMA 1920 × 1080 → %
  ───────────────────────────── */

  const x = (value) =>
    `${(value / 1920) * 100}%`;

  const y = (value) =>
    `${(value / 1080) * 100}%`;


  /* ─────────────────────────────
     대표 이미지

     한 개만 만들고
     hover된 프로젝트에 따라
     이미지/위치만 변경
  ───────────────────────────── */

  const previews = [];


  /* ─────────────────────────────
     PROJECT BAR
  ───────────────────────────── */

  projects.forEach((project, index) => {

    // 각 프로젝트별 대표 이미지 생성
    const preview = document.createElement('img');

    preview.className = 'page02-project-preview';

    // 빙그레 이미지 전용 CSS 적용
    if (project.previewClass) {
      preview.classList.add(project.previewClass);
    }

    // 프로젝트별 이미지와 위치 연결
    preview.src = project.image;
    preview.alt = `${project.title} 대표 이미지`;

    preview.loading = 'eager';
    preview.decoding = 'async';

    preview.style.left = x(project.previewX);
    preview.style.top = y(project.previewY);

    layer.appendChild(preview);

    // 대표 이미지 배열에 저장
    previews.push(preview);

    const bar =
      document.createElement('a');


    bar.className =
      'page02-project-bar';


    bar.href =
      project.target;


    /* 정확한 Figma 좌표 */

    bar.style.left =
      x(project.barX);

    bar.style.top =
      y(project.barY);

    bar.style.width =
      x(881);

    bar.style.height =
      y(45);


    /* 막대 내부 */

    bar.innerHTML = `

      <div class="page02-bar-left">

        <span class="page02-bar-title">
          ${project.title}
        </span>


        <span class="page02-bar-divider">
        </span>


        <span class="page02-bar-desc">
          ${project.desc}
        </span>

      </div>


      <span class="page02-bar-range">
        ${project.range}
      </span>

    `;

/* ── HOVER IN ── */

const showPreview = () => {

  // 다른 프로젝트 이미지는 모두 숨기고
  // 현재 프로젝트 이미지만 표시
  previews.forEach((img, imageIndex) => {

    img.classList.toggle(
      'is-visible',
      imageIndex === index
    );

  });

  // 현재 막대 활성화
  bar.classList.add('is-active');

};
    
/* ── HOVER OUT ── */

const hidePreview = () => {

  // 현재 막대에 연결된 이미지만 숨김
  preview.classList.remove('is-visible');

  bar.classList.remove('is-active');

};


// 마우스 이벤트
bar.addEventListener('mouseenter', showPreview);
bar.addEventListener('mouseleave', hidePreview);

// 키보드 접근 지원
bar.addEventListener('focus', showPreview);
bar.addEventListener('blur', hidePreview);


    layer.appendChild(bar);

  });


  slot.appendChild(layer);

  }



// ── Page 01 Name → NAV Scroll Animation ──
(function initNameToNavAnimation() {

  const hero = document.getElementById('home');
  const source = document.querySelector('.hero-bottom-name');
  const nav = document.querySelector('.nav');
  const target = document.querySelector('.nav-home-name');

  if (!hero || !source || !nav || !target) return;


  // 실제로 움직일 이름 생성
  const flying = document.createElement('div');
  flying.className = 'flying-name';

  // Page 01 이름과 동일하게 시작
  flying.textContent = '( JEON YOUNG HYEON )';

  document.body.appendChild(flying);


  let sourceDocX = 0;
  let sourceDocY = 0;

  let sourceFontSize = 90;
  let targetFontSize = 14;


  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }


  function lerp(start, end, progress) {
    return start + (end - start) * progress;
  }


  function measure() {

    const sourceRect = source.getBoundingClientRect();

    // Page 01 이름의 문서상 중앙 위치
    sourceDocX =
      sourceRect.left +
      window.scrollX +
      sourceRect.width / 2;

    sourceDocY =
      sourceRect.top +
      window.scrollY +
      sourceRect.height / 2;


    sourceFontSize =
      parseFloat(
        window.getComputedStyle(source).fontSize
      );


    targetFontSize =
      parseFloat(
        window.getComputedStyle(target).fontSize
      );

  }


  function update() {

    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;


    /*
      애니메이션 시작:
      Page 01을 약 15% 스크롤했을 때
    */
    const startScroll = heroHeight * 0.15;


    /*
      애니메이션 종료:
      Page 01 끝에 거의 도착했을 때
    */
    const endScroll = heroHeight * 0.92;


    let progress =
      (scrollY - startScroll) /
      (endScroll - startScroll);


    progress = clamp(progress, 0, 1);


    /*
      부드러운 easing
    */
    const eased =
      progress * progress * (3 - 2 * progress);


    /*
      원래 Page 01 이름이
      현재 화면에서 있어야 하는 위치
    */
    const naturalSourceX =
      sourceDocX - window.scrollX;

    const naturalSourceY =
      sourceDocY - scrollY;


    /*
      NAV 중앙 목표 위치
    */
    const targetX =
      window.innerWidth / 2;

    const targetY =
      nav.offsetHeight / 2;


    /*
      위치 이동
    */
    const currentX =
      lerp(
        naturalSourceX,
        targetX,
        eased
      );


    const currentY =
      lerp(
        naturalSourceY,
        targetY,
        eased
      );


    /*
      ★ 핵심:
      90px → 14px를 직접 변화시킴
    */
    const currentFontSize =
      lerp(
        sourceFontSize,
        targetFontSize,
        eased
      );


    flying.style.left =
      `${currentX}px`;

    flying.style.top =
      `${currentY}px`;

    flying.style.fontSize =
      `${currentFontSize}px`;

    flying.style.transform =
      'translate(-50%, -50%)';


    /*
      아직 애니메이션 시작 전
    */
    if (progress <= 0) {

      source.style.opacity = '1';
      flying.style.opacity = '0';

      nav.classList.remove('show-nav');

      return;
    }


    /*
      애니메이션 진행 중
    */
    if (progress < 1) {

      source.style.opacity = '0';
      flying.style.opacity = '1';

      nav.classList.remove('show-nav');

      return;
    }


    /*
      NAV에 완전히 도착
    */
    source.style.opacity = '0';
    flying.style.opacity = '0';

    nav.classList.add('show-nav');

  }


  let ticking = false;


  function requestUpdate() {

    if (ticking) return;

    ticking = true;


    requestAnimationFrame(() => {

      update();

      ticking = false;

    });

  }


  window.addEventListener(
    'scroll',
    requestUpdate,
    { passive: true }
  );


  window.addEventListener(
    'resize',
    () => {

      measure();
      update();

    }
  );


  window.addEventListener(
    'load',
    () => {

      measure();
      update();

    }
  );


  measure();
  update();

})();


/* =====================================
   PAGE 01 - INTRO TYPING ANIMATION
===================================== */

(function initHeroIntroTyping() {

  const box = document.getElementById(
    'hero-intro-copy'
  );

  if (!box) return;

  // 움직임 줄이기 설정을 사용하면
  // 타이핑 없이 전체 문구 표시
  if (
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  ) {
    return;
  }

  // HTML에 작성된 4개 문단 가져오기
  const paragraphs = [
    ...box.querySelectorAll('p')
  ];

  // 원래 문구 저장
  const texts = paragraphs.map(
    p => p.textContent.trim()
  );

  // 타이핑 속도 설정
  const SPEED = 25;

  // 문단 사이 대기 시간
  const LINE_PAUSE = 260;

  // 최초 문구 숨기기
  paragraphs.forEach(p => {
    p.textContent = '';
  });

  // 시간 지연 함수
  function sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  // 타이핑 실행
  async function run() {

    // 페이지 진입 후 시작
    await sleep(450);

    // 첫 문단부터 마지막 문단까지
    for (
      let i = 0;
      i < paragraphs.length;
      i++
    ) {

      const paragraph = paragraphs[i];

      // 현재 문단에 커서 표시
      paragraph.classList.add('is-typing');

      // 글자 하나씩 입력
      for (const letter of texts[i]) {

        paragraph.textContent += letter;

        await sleep(SPEED);
      }

      // 문단 입력 완료 후 커서 제거
      paragraph.classList.remove('is-typing');

      // 다음 문단 입력 전 잠깐 정지
      if (i < paragraphs.length - 1) {
        await sleep(LINE_PAUSE);
      }
    }
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

  const layer = document.createElement('div');
  layer.className = 'page02-new-layout';

  
const projects = [
  {
    name: 'WINKLE',
    desc: 'Branding / Personal Work',
    image: 'assets/images/page02-winkle.png',
    x: 100,
    y: 304,
    target: '#page-03'
  },
  {
    name: 'OATERY',
    desc: 'Branding / Personal Work',
    image: 'assets/images/page02-oatery.png',
    x: 796,
    y: 304,
    target: null
  },
  {
    name: 'DAYMINE',
    desc: 'Branding / Personal Work',
    image: 'assets/images/page02-daymine.png',
    x: 1492,
    y: 304,
    target: null
  },
  {
    name: 'IM BANK',
    desc: 'IP & CONTENT / Agency Work',
    image: 'assets/images/page02-imbank.png',
    x: 448,
    y: 652,
    target: null
  },
  {
    name: '삼쩜삼',
    desc: 'IP & CONTENT / Agency Work',
    image: 'assets/images/page02-33.png',
    x: 1144,
    y: 652,
    target: '#page-49'
  },
  {
    name: "빙그레 '소원왕국'",
    desc: 'IP & CONTENT / Agency Work',
    image: 'assets/images/page02-binggrae.png',
    x: 1492,
    y: 652,
    target: null
  }
];


  layer.innerHTML = `
    <div class="page02-about-label">ABOUT</div>

    <div class="page02-profile">
      <div class="page02-name">전영현</div>
      <div class="page02-profile-contact">
        <div>010.4079.5374</div>
        <div>biging1212@gmail.com</div>
      </div>
    </div>

    <div class="page02-tool-label">TOOL</div>

    <div class="page02-tool-list">
      FIGMA<br>
      PHOTOSHOP<br>
      ILLUSTRATOR<br>
      AFTER EFFECTS<br>
      BLENDER<br>
      CINEMA 4D
    </div>

    <div class="page02-services-label">SERVICES</div>

    <div class="page02-services-list">
      BRANDING<br>
      DESIGN SYSTEMS<br>
      CONTENT<br>
      PACKAGE & GOODS<br>
      POP-UP DESIGN
    </div>
  `;

  const x = value => `${value / 1920 * 100}%`;
  const y = value => `${value / 1080 * 100}%`;

  projects.forEach(project => {

    const item = document.createElement(
      project.target ? 'a' : 'div'
    );

    item.className = 'page02-gallery-item';

    if (project.target) {
      item.href = project.target;
    }

    item.style.left = x(project.x);
    item.style.top = y(project.y);

    
const img = document.createElement('img');

img.src = project.image;
img.alt = project.name;
img.loading = 'eager';
img.decoding = 'async';

// 프로젝트 정보 영역 생성
const info = document.createElement('div');
info.className = 'page02-gallery-info';

// 프로젝트 이름
const title = document.createElement('div');
title.className = 'page02-gallery-title';
title.textContent = project.name;

// 프로젝트 설명
const desc = document.createElement('div');
desc.className = 'page02-gallery-desc';
desc.textContent = project.desc;

// 정보 영역에 이름과 설명 추가
info.appendChild(title);
info.appendChild(desc);

// 이미지 위에 정보 영역 겹치기
item.appendChild(img);
item.appendChild(info);

layer.appendChild(item);
  });

  slot.appendChild(layer);
}

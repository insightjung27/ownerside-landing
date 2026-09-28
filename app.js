/* app.js — 오너사이드 랜딩 인터랙션
   내비 토글 · 모달(뷰포트 고정·ESC·바깥클릭·스크롤락·포커스트랩) · 폼 안내 · 스크롤 리빌 */
(function () {
  'use strict';

  /* ── 모바일 내비 토글 ── */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', '메뉴 열기');
      }
    });
  }

  /* ── 모달 ── */
  var overlay = document.getElementById('modalOverlay');
  var modal = document.getElementById('modal');
  var modalBody = document.getElementById('modalBody');
  var modalTitle = document.getElementById('modalTitle');
  var modalEyebrow = document.getElementById('modalEyebrow');
  var modalClose = document.getElementById('modalClose');
  var store = document.getElementById('modalStore');
  var lastFocus = null;

  function templatesByKey(key) {
    return store ? store.querySelector('template[data-key="' + key + '"]') : null;
  }

  function openModal(key) {
    var tpl = templatesByKey(key);
    if (!tpl) return;
    modalEyebrow.textContent = tpl.getAttribute('data-eyebrow') || '';
    modalTitle.textContent = tpl.getAttribute('data-title') || '';
    modalBody.innerHTML = '';
    modalBody.appendChild(tpl.content.cloneNode(true));
    lastFocus = document.activeElement;
    overlay.classList.add('open');
    document.body.classList.add('modal-lock');
    modalBody.scrollTop = 0;
    modalClose.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.classList.remove('modal-lock');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  // [data-modal] 트리거 위임
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-modal]');
    if (trigger) {
      e.preventDefault();
      openModal(trigger.getAttribute('data-modal'));
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('mousedown', function (e) {
      if (e.target === overlay) closeModal(); // 바깥(오버레이) 클릭만
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      // 포커스 트랩
      var focusables = modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ── 문의 폼 (실제 전송 없음 · 안내로 대체) ── */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('[name="email"]');
      var consent = form.querySelector('[name="consent"]');
      if (email && !email.value.trim()) {
        showStatus('이메일 또는 연락처를 입력해 주세요.', false);
        email.focus();
        return;
      }
      if (consent && !consent.checked) {
        showStatus('개인정보 수집·이용 동의가 필요합니다.', false);
        consent.focus();
        return;
      }
      showStatus('감사합니다. 현재 접수 채널을 연결하는 중이라, 위 이메일(contact@ownerside.kr)로 견적서·계약서와 함께 보내주시면 48시간 안에 무료 사전점검 결과를 회신드립니다.', true);
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
  function showStatus(msg, ok) {
    if (!status) return;
    status.textContent = msg;
    status.classList.add('show');
    status.style.background = ok ? '#F0F5FB' : '#FCEDED';
    status.style.color = ok ? '#0F2A4A' : '#C62828';
    status.style.borderColor = ok ? '#E3E8EF' : '#F3C9C9';
  }

  /* ── 스크롤 리빌 ── */
  var reveals = document.querySelectorAll('.sec-head, .pain-item, .why-point, .compare__col, .solve-item, .weapon, .step, .flagship, .track, .trust-item, .contact-grid');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ── 활성 내비 하이라이트 ── */
  var sections = ['problem', 'why', 'process', 'pricing', 'trust', 'contact']
    .map(function (id) { return document.getElementById(id); }).filter(Boolean);
  var navLinks = {};
  document.querySelectorAll('.nav a').forEach(function (a) {
    var id = a.getAttribute('href').replace('#', '');
    navLinks[id] = a;
  });
  if ('IntersectionObserver' in window && sections.length) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = navLinks[en.target.id];
        if (link && en.isIntersecting) {
          Object.keys(navLinks).forEach(function (k) { navLinks[k].style.color = ''; navLinks[k].style.opacity = ''; });
          link.style.color = 'var(--navy)';
          link.style.opacity = '1';
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navIo.observe(s); });
  }
})();

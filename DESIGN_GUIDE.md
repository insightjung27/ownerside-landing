# 디자인 가이드 — 오너사이드

> `generate_tokens.py` 자동생성. **수기 폰트크기·색상 하드코딩 금지** — 아래 역할 클래스(`.t-*`)와 CSS 변수만 사용한다. 씨앗색만 바꿔 재생성.

- 폰트: **Pretendard Variable** (CDN 1개 고정)
- 씨앗색: `#0F2A4A` → 팔레트 자동 파생 · 강조색 `#E23B3B` · 배경 `#FFFFFF`
- 타입 스케일: base 16px · 비율 1.25(모듈러)

## 타이포 위계 — '언제 무엇을'
| 역할 | 클래스 | 크기 | 굵기 | 자간 | 색 | 용도 |
|---|---|---|---|---|---|---|
| display | `.t-display` | 61.0px(반응형) | 800 | -0.02em | ink | 히어로 메인타이틀(페이지당 1회) |
| h1 | `.t-h1` | 48.8px | 700 | -0.015em | ink | 페이지 대제목 |
| h2 | `.t-h2` | 31.2px | 700 | -0.01em | ink | 섹션 제목 |
| h3 | `.t-h3` | 25.0px | 600 | -0.005em | ink | 카드·소제목 |
| eyebrow | `.t-eyebrow` | 12.8px | 600 | 0.18em | accent | 서브타이틀/키커(섹션 상단 소제목) — 예: INCHEON SEO-GU · BORN IN 1974 |
| lead | `.t-lead` | 20.0px | 400 | 0 | muted | 히어로·섹션 리드문(본문보다 크고 옅게) |
| body | `.t-body` | 16.0px | 400 | 0 | body | 본문 단락 |
| caption | `.t-caption` | 12.8px | 400 | 0.01em | muted | 주석·캡션·메타정보 |
| button | `.t-button` | 16.0px | 600 | 0.01em | onAccent | 버튼 라벨(중앙정렬 강제) |

## 색 · WCAG 대비 리포트
| 용도 | 색 | 배경 | 대비 | 기준 | 판정 |
|---|---|---|---|---|---|
| 본문(body) | `#123359` | `#FFFFFF` | 12.78 | ≥4.5 | ✅ |
| 주석/리드(muted) | `#20599D` | `#FFFFFF` | 7.05 | ≥4.5 | ✅ |
| 제목(ink) | `#1A1D23` | `#FFFFFF` | 16.88 | ≥4.5 | ✅ |
| 서브타이틀(accent·대형) | `#E23B3B` | `#FFFFFF` | 4.27 | ≥3.0 | ✅ |
| 버튼 라벨 | `#FFFFFF` | `#DF2929` | 4.68 | ≥4.5 | ✅ |

## 불변 규칙(완료 전 게이트)
- [ ] font_pinned(Pretendard CDN 1개)
- [ ] type_ramp_applied(.t-* 유틸만 사용·인라인 폰트크기 금지)
- [ ] single_seed_palette(씨앗색1개 파생)
- [ ] wcag_aa_contrast(본문4.5·대형3.0)
- [ ] hero_real_image(실사·플레이스홀더 금지)
- [ ] mobile_pc_parity
- [ ] button_label_centered
- [ ] no_card_stacking
- [ ] modal_viewport_safe(전체화면 모달/위저드=상단정렬(center 금지)·하단 액션바 항상 뷰포트 내·100dvh 오버플로로 버튼 잘림 금지)

## 금지(AI 냄새 차단)
- 라운드 박스(카드) 2개 연달아 스택 금지 → 에디토리얼 도형화
- 플레이스홀더 이미지·가짜 지도·행복한 더미데이터 금지 → 실사·실지도·엣지값
- 버튼 라벨 좌측정렬 금지 → 항상 중앙정렬(`.btn`)
- 인라인 `font-size`/`color` 하드코딩 금지 → `.t-*`·변수만

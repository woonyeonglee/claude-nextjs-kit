# Claude Code 기능 소개 웹페이지 개발 로드맵

Claude Code의 주요 기능 8가지를 카드 형태로 소개하고, 각 기능의 상세 내용을 개별 페이지에서 확인할 수 있는 정적 웹페이지를 구축한다.

## 개요

이 프로젝트는 Claude Code에 관심 있는 개발자 및 잠재 사용자를 위한 기능 소개 웹페이지로 다음 기능을 제공합니다:

- **기능 카드 그리드**: 8개 Claude Code 핵심 기능을 카드 형태로 메인 페이지에 나열
- **기능 상세 페이지**: 각 기능의 세부 설명, 주요 특징, 사용 예시를 개별 페이지에서 제공
- **페이지 간 네비게이션**: 카드 클릭으로 상세 페이지 이동, 홈으로 돌아가기 버튼 제공
- **다크모드 지원**: next-themes 기반 라이트/다크 테마 전환

## 개발 워크플로우

1. **작업 계획**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-type-definition.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조

3. **작업 구현**

   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

   - 로드맵에서 완료된 작업을 체크 표시로 갱신

## 개발 단계

### Phase 1: 기반 구축

- [ ] **Task 001: 타입 정의 및 기능 데이터 상수 생성** - 우선순위
  - `lib/types.ts`에 `FeatureDetail` 인터페이스 추가 (slug, 상세 설명, 주요 특징 목록, 사용 예시 필드 포함)
  - `lib/features-data.ts` 파일 생성 (8개 기능 데이터 상수 정의)
  - 8개 기능: ai-code-editing, terminal-commands, file-system, multi-agent, memory-system, mcp-integration, code-review, slash-commands
  - 각 기능별 아이콘(lucide-react), 기능명, 한줄 설명, 상세 설명(2~3단락), 주요 특징 목록, 사용 예시 포함
  - slug 기반 데이터 조회 유틸리티 함수 작성 (`getFeatureBySlug`, `getAllFeatures`)

### Phase 2: UI 구현

- [ ] **Task 002: 메인 페이지 UI 구현** - 우선순위
  - `components/sections/hero.tsx` 수정: Claude Code 소개 타이틀과 설명으로 변경
  - `components/sections/features-grid.tsx` 신규 생성: 8개 기능 카드를 그리드 레이아웃으로 배치
  - 각 카드에 아이콘, 기능명, 한줄 설명 표시 (shadcn/ui Card 컴포넌트 활용)
  - 카드 클릭 시 `/features/[slug]` 경로로 이동하도록 Link 연결
  - `app/(landing)/page.tsx`에서 Hero + FeaturesGrid 조합으로 메인 페이지 구성

- [ ] **Task 003: 기능 상세 페이지 UI 구현**
  - `app/(landing)/features/[slug]/page.tsx` 생성
  - slug 파라미터로 기능 데이터 조회, 존재하지 않는 slug일 경우 `notFound()` 호출하여 404 처리
  - 페이지 상단: 아이콘 + 기능명 헤더, "홈으로 돌아가기" 버튼
  - 페이지 본문: 상세 설명(2~3단락), 주요 특징 목록, 사용 예시/시나리오
  - 페이지 하단: "홈으로 돌아가기" 버튼 (상단과 동일 동작)
  - shadcn/ui Button 컴포넌트 및 lucide-react 아이콘 활용

### Phase 3: 마무리

- [ ] **Task 004: SSG 및 메타데이터 최적화**
  - `app/(landing)/features/[slug]/page.tsx`에 `generateStaticParams` 함수 추가 (8개 slug 정적 생성)
  - 메인 페이지 메타데이터 설정 (title, description, Open Graph)
  - 각 기능 상세 페이지별 동적 메타데이터 생성 (`generateMetadata` 함수)
  - `next.config` SSG 관련 설정 확인 및 빌드 검증

- [ ] **Task 005: 반응형/다크모드 검증 및 E2E 테스트**
  - Playwright MCP를 활용한 E2E 테스트 수행
  - 테스트 시나리오:
    - 메인 페이지에 8개 기능 카드가 정상 표시되는지 검증
    - 각 카드 클릭 시 올바른 상세 페이지로 이동하는지 검증
    - 상세 페이지의 "홈으로 돌아가기" 버튼 동작 검증 (상단/하단 모두)
    - 존재하지 않는 slug 접근 시 404 페이지 표시 검증
    - 모바일(375px), 태블릿(768px), 데스크톱(1280px) 반응형 레이아웃 검증
    - 다크모드 토글 동작 및 스타일 적용 검증
  - 정상 흐름(Happy Path) + 에러 흐름(Error Flow) + 엣지 케이스(Edge Case) 모두 통과 필수
  - 테스트 미통과 시 구현 수정 후 재테스트 반복

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 App Router |
| 언어 | TypeScript (strict) |
| 스타일링 | Tailwind CSS v4 |
| UI 컴포넌트 | shadcn/ui (Card, Button) |
| 아이콘 | lucide-react |
| 테마 | next-themes |
| 데이터 | 정적 TypeScript 상수 파일 (DB 불필요) |
| 렌더링 | SSG (정적 사이트 생성) |
| 테스트 | Playwright MCP (E2E) |

## 관련 파일 구조

```
app/
└── (landing)/
    ├── layout.tsx              # 기존 랜딩 레이아웃 (수정 불필요)
    ├── page.tsx                # 메인 페이지 (Task 002에서 수정)
    └── features/
        └── [slug]/
            └── page.tsx        # 기능 상세 페이지 (Task 003에서 생성)

lib/
├── types.ts                    # FeatureDetail 타입 추가 (Task 001)
└── features-data.ts            # 기능 데이터 상수 (Task 001에서 생성)

components/
└── sections/
    ├── hero.tsx                # 히어로 섹션 수정 (Task 002)
    └── features-grid.tsx       # 기능 카드 그리드 신규 생성 (Task 002)
```

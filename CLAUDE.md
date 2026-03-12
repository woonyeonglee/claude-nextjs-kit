# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## 아키텍처 개요

Next.js 15 App Router 기반의 어드민 대시보드 스타터킷.

### 라우트 구조

- `app/(landing)/` — 랜딩 페이지 (레이아웃 분리됨)
- `app/dashboard/` — 대시보드 (사이드바 + 헤더 레이아웃)
  - `users/` — TanStack Table 기반 사용자 관리
  - `settings/` — React Hook Form + Zod 설정 폼

### 핵심 레이어

**`lib/`**
- `api.ts` — 타입 안전 fetch 래퍼 (`api.get<T>()`, `api.post<T>()` 등)
- `types.ts` — 공유 TypeScript 타입
- `validations.ts` — Zod 스키마 (재사용 가능한 `emailSchema`, `passwordSchema` 등)
- `constants.ts` — 사이트 설정, 사이드바 링크, 대시보드 통계 데이터

**`providers/`**
- `index.tsx` — ThemeProvider(next-themes), QueryProvider, TooltipProvider, Toaster를 하나로 묶음
- `query-provider.tsx` — React Query 설정 (staleTime: 60s, retry: 1)

**`components/`**
- `ui/` — shadcn 컴포넌트 (수정 최소화)
- `common/` — 재사용 컴포넌트: `DataTable`, `PageHeader`, `ConfirmDialog`, `SearchInput`, `EmptyState`
- `layout/` — `Sidebar`(데스크톱, 접힘 상태 localStorage 저장), `DashboardHeader`(모바일 Sheet 네비)
- `sections/` — 랜딩 페이지용 `Hero`, `Features`

**`hooks/`**
- `use-debounce.ts`, `use-local-storage.ts`, `use-copy-to-clipboard.ts`, `use-media-query.ts`

### 주요 패턴

- **폼**: React Hook Form + Zod (`lib/validations.ts`의 스키마 재사용)
- **테이블**: `components/common/data-table.tsx` 래퍼 사용 (정렬, 필터, 페이지네이션 내장)
- **경로 별칭**: `@/` → 프로젝트 루트
- **다크모드**: `next-themes` + OKLch CSS 변수 (`app/globals.css`)
- **'use client' 마크**: 훅 또는 브라우저 API 사용 컴포넌트에만 적용

## 기술 스택

- Next.js 15, React 19, TypeScript (strict)
- Tailwind CSS v4, shadcn/ui (radix-nova 스타일)
- TanStack React Table v8, React Query v5
- React Hook Form + Zod, next-themes, sonner, lucide-react

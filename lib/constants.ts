import type { SiteConfig, StatCardData, FeatureItem, SidebarLink } from './types';

export const siteConfig: SiteConfig = {
  name: 'NextKit',
  description: 'Next.js 모던 스타터킷으로 빠르게 웹 개발을 시작하세요.',
  url: 'https://nextkit.vercel.app',
  navLinks: [
    { label: '홈', href: '/' },
    { label: '기능', href: '/#features' },
    { label: '대시보드', href: '/dashboard' },
  ],
};

export const DASHBOARD_STATS: StatCardData[] = [
  {
    title: '총 사용자',
    value: '12,345',
    description: '이번 달 기준',
    trend: 'up',
    trendValue: '+12.5%',
    icon: 'Users',
  },
  {
    title: '월간 수익',
    value: '₩8,432,000',
    description: '전월 대비',
    trend: 'up',
    trendValue: '+8.2%',
    icon: 'TrendingUp',
  },
  {
    title: '활성 세션',
    value: '1,892',
    description: '현재 접속 중',
    trend: 'down',
    trendValue: '-3.1%',
    icon: 'Activity',
  },
  {
    title: '전환율',
    value: '3.24%',
    description: '지난 7일 평균',
    trend: 'neutral',
    trendValue: '±0.0%',
    icon: 'BarChart3',
  },
];

export const FEATURES: FeatureItem[] = [
  {
    title: 'Next.js 15 App Router',
    description: '최신 App Router와 React Server Components로 빠르고 효율적인 렌더링을 경험하세요.',
    icon: 'Zap',
  },
  {
    title: 'TypeScript 완전 지원',
    description: '엄격한 타입 안전성으로 버그를 사전에 방지하고 개발 생산성을 높이세요.',
    icon: 'Shield',
  },
  {
    title: 'TailwindCSS v4',
    description: '최신 Tailwind CSS v4와 CSS 변수 기반 테마 시스템으로 자유롭게 스타일링하세요.',
    icon: 'Palette',
  },
  {
    title: '다크모드 지원',
    description: '시스템 설정을 따르거나 직접 선택하는 다크/라이트 테마 전환을 제공합니다.',
    icon: 'Moon',
  },
  {
    title: 'ShadcnUI 컴포넌트',
    description: '접근성을 고려한 Radix UI 기반의 아름다운 컴포넌트 라이브러리입니다.',
    icon: 'Layers',
  },
  {
    title: '반응형 레이아웃',
    description: '모바일부터 데스크탑까지 완벽하게 대응하는 반응형 레이아웃을 제공합니다.',
    icon: 'Monitor',
  },
];

export const SIDEBAR_LINKS: SidebarLink[] = [
  { label: '대시보드', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: '분석', href: '/dashboard/analytics', icon: 'BarChart3' },
  { label: '사용자', href: '/dashboard/users', icon: 'Users' },
  { label: '설정', href: '/dashboard/settings', icon: 'Settings' },
];

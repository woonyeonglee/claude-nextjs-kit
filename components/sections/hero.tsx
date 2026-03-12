import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-32 text-center md:py-48">
      {/* 배경 그라디언트 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-primary) 0%, transparent 70%)',
        }}
      />

      <Badge variant="secondary" className="mb-6 gap-1.5">
        <Sparkles className="h-3 w-3" />
        Next.js 15 스타터킷
      </Badge>

      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
        더 빠르게 시작하는
        <br />
        <span className="text-muted-foreground">모던 웹 개발</span>
      </h1>

      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        {siteConfig.description}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/dashboard">
            대시보드 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Button>
      </div>

      {/* 기술 뱃지 */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
        {['Next.js 15', 'TypeScript', 'Tailwind v4', 'ShadcnUI', 'Radix UI'].map((tech) => (
          <Badge key={tech} variant="outline" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </section>
  );
}

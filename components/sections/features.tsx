import { Zap, Shield, Palette, Moon, Layers, Monitor, type LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FEATURES } from '@/lib/constants';

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Shield,
  Palette,
  Moon,
  Layers,
  Monitor,
};

export function Features() {
  return (
    <section id="features" className="bg-muted/30 px-4 py-24">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            모든 것이 준비되어 있습니다
          </h2>
          <p className="mt-3 text-muted-foreground">
            개발에 필요한 핵심 기능을 모두 갖춘 스타터킷
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = ICON_MAP[feature.icon] ?? Zap;
            return (
              <Card key={feature.title} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

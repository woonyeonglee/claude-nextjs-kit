import {
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Activity,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { StatCardData } from '@/lib/types';

const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  TrendingUp,
  Activity,
  BarChart3,
};

const TREND_CONFIG = {
  up: { icon: TrendingUp, className: 'text-green-600 dark:text-green-400' },
  down: { icon: TrendingDown, className: 'text-red-600 dark:text-red-400' },
  neutral: { icon: Minus, className: 'text-muted-foreground' },
};

interface StatCardProps {
  data: StatCardData;
}

export function StatCard({ data }: StatCardProps) {
  const Icon = ICON_MAP[data.icon] ?? BarChart3;
  const TrendIcon = TREND_CONFIG[data.trend].icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{data.title}</CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.value}</div>
        <div className="mt-1 flex items-center gap-1.5">
          <Badge
            variant="secondary"
            className={cn('gap-1 px-1.5 py-0.5 text-xs', TREND_CONFIG[data.trend].className)}
          >
            <TrendIcon className="h-3 w-3" />
            {data.trendValue}
          </Badge>
          <span className="text-xs text-muted-foreground">{data.description}</span>
        </div>
      </CardContent>
    </Card>
  );
}

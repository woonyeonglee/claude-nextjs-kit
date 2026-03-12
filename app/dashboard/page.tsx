import { StatCard } from '@/components/dashboard/stat-card';
import { DASHBOARD_STATS } from '@/lib/constants';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground">서비스 현황을 한눈에 확인하세요.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.title} data={stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <h2 className="mb-4 font-semibold">최근 활동</h2>
          <div className="space-y-3">
            {['새 사용자 가입', '결제 완료', '리포트 생성', '설정 변경', '로그인'].map(
              (activity, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{activity}</span>
                  <span className="text-xs text-muted-foreground">{i + 1}분 전</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="mb-4 font-semibold">빠른 시작</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✦ <code className="text-foreground">lib/constants.ts</code>에서 데이터 수정</p>
            <p>✦ <code className="text-foreground">lib/types.ts</code>에서 타입 확장</p>
            <p>✦ <code className="text-foreground">components/</code>에 컴포넌트 추가</p>
            <p>✦ <code className="text-foreground">app/</code>에 새 페이지 생성</p>
            <p>✦ <code className="text-foreground">providers/</code>에 전역 상태 추가</p>
          </div>
        </div>
      </div>
    </div>
  );
}

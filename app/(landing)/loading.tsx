import { Skeleton } from '@/components/ui/skeleton';

export default function LandingLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero 스켈레톤 */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24">
        <Skeleton className="h-12 w-3/4 max-w-lg" />
        <Skeleton className="h-6 w-2/3 max-w-md" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      {/* Features 스켈레톤 */}
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

import { Skeleton } from "../../components/ui/skeleton";

export default function PromotionDetailsSkeleton() {
  return (
    <div className="w-full pb-10 space-y-10">
      {/* Header */}
      <div className="bg-background-1 h-fit">
        <div className="app-container font-medium py-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="app-container py-6">
        <div className="bg-background-1 rounded-lg p-6 max-w-242 w-full mx-auto space-y-6">
          {/* Image */}
          <Skeleton className="aspect-video lg:aspect-92/25 w-full rounded-lg" />

          {/* Title + Subtitle */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>

          {/* Sections (repeat for each block) */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="flex md:hidden fixed inset-x-0 bottom-20 z-50 px-6 py-3.5 bg-background-2">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      {/* Related */}
      <div className="app-container">
        <Skeleton className="h-7 w-48 mb-4" />
        <div className="flex gap-3 overflow-x-auto pb-1">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-48 h-32 rounded-lg shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}

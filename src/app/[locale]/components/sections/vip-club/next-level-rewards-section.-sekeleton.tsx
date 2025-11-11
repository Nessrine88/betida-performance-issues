export default function NextLevelRewardsSkeleton() {
  return (
    <div className="app-container py-12 md:py-16 space-y-8">
      <div className="h-8 w-48 bg-background-2 animate-pulse rounded-md mx-auto" />
      <div className="space-y-6">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="bg-background-2 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center gap-4 animate-pulse"
          >
            <div className="w-12 h-12 bg-background-3 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 bg-background-3 rounded" />
              <div className="h-4 w-56 bg-background-3 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-background-3 rounded-md" />
              <div className="h-9 w-20 bg-background-3 rounded-md" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-10 w-36 bg-background-2 animate-pulse rounded-md mx-auto" />
    </div>
  );
}

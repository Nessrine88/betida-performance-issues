export default function RGBrandContentSkeleton() {
  return (
    <div className="flex flex-col gap-7 animate-pulse">
      {/* Title placeholder */}
      <div className="h-8 w-56 bg-gray-200 rounded" />

      {/* Two rich-text blocks */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-11/12 bg-gray-200 rounded" />
          <div className="h-4 w-10/12 bg-gray-200 rounded" />
        </div>
      ))}

      {/* Tips grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, j) => (
          <div
            key={j}
            className="bg-gray-100 p-4 rounded-lg flex items-start gap-3 h-28"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-11/12 bg-gray-200 rounded" />
              <div className="h-3 w-9/12 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

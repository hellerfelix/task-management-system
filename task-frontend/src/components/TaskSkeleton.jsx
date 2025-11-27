export default function TaskSkeleton() {
  return (
    <div className="animate-pulse bg-white p-5 rounded-xl shadow-md border">
      
      {/* Title Placeholder */}
      <div className="h-5 bg-gray-300 rounded w-2/3 mb-4"></div>

      {/* Description Placeholder */}
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>

      {/* Status + Priority Placeholder */}
      <div className="flex gap-3 mt-4">
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
      </div>

    </div>
  );
}
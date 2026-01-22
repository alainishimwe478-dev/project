export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
    </div>
  );
}
function SkeletonCard() {
  return (
    <div className="bg-dark-700 border border-dark-500 rounded-2xl p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-dark-500" />
        <div className="w-6 h-6 rounded-lg bg-dark-500" />
      </div>
      <div className="h-4 bg-dark-500 rounded w-3/4 mb-2" />
      <div className="h-3 bg-dark-500 rounded w-1/2 mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="h-5 bg-dark-500 rounded-full w-16" />
        <div className="h-5 bg-dark-500 rounded-full w-16" />
      </div>
      <div className="flex gap-1.5 mb-4">
        <div className="h-5 bg-dark-500 rounded-full w-14" />
        <div className="h-5 bg-dark-500 rounded-full w-14" />
        <div className="h-5 bg-dark-500 rounded-full w-14" />
      </div>
      <div className="border-t border-dark-500 pt-3">
        <div className="h-3 bg-dark-500 rounded w-1/4" />
      </div>
    </div>
  );
}

export default SkeletonCard;

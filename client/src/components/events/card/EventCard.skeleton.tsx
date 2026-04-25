const EventCardSkeleton = () => {
  return (
    <div className="w-full overflow-hidden rounded-xl border-2 border-border bg-card shadow-sm">
      <div className="aspect-video w-full animate-pulse bg-gray-200" />
      <div className="flex flex-col p-5">
        <div className="mb-3 flex justify-between">
          <div className="h-3.5 w-14 animate-pulse rounded bg-gray-200" />
          <div className="h-3.5 w-24 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mb-1 h-5 w-full animate-pulse rounded bg-gray-200" />
        <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 h-4 w-20 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default EventCardSkeleton;

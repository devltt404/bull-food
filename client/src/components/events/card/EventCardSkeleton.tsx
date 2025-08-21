const EventCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-tl-2xl rounded-br-2xl border-2 bg-white">
      <div className="relative">
        {/* Skeleton for the image */}
        <div className="h-40 w-full animate-pulse bg-gray-200" />
      </div>
      <div className="px-4 pt-4 pb-5">
        {/* Skeleton for the title */}
        <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-gray-200" />

        {/* Skeleton for the list items */}
        <ul className="flex flex-col gap-2">
          <li className="flex items-center text-muted-foreground">
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          </li>
          <li className="flex items-center text-muted-foreground">
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
          </li>
          <li className="flex items-center text-muted-foreground">
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EventCardSkeleton;

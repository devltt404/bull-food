import EventCardsGridSkeleton from "../../grid/skeleton";

const EventsGroupsItemSkeleton = () => {
  return (
    <div className="events-groups-item-wrapper">
      <div className="my-7 h-9 w-60 animate-pulse rounded-sm bg-gray-200"></div>
      <EventCardsGridSkeleton />
    </div>
  );
};

export default EventsGroupsItemSkeleton;

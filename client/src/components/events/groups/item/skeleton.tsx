import EventCardsGridSkeleton from "../../grid/skeleton";

const EventsGroupsItemSkeleton = () => {
  return (
    <div className="events-groups-item-wrapper">
      <div className="my-7 h-[2.25rem] w-[15rem] animate-pulse rounded-sm bg-gray-200"></div>
      <EventCardsGridSkeleton />
    </div>
  );
};

export default EventsGroupsItemSkeleton;

import NoFoodIcon from "@/components/svg/NoFoodIcon";

const EmptyEvents = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <NoFoodIcon className="h-32 w-32 fill-red-700" />
      <p className="mt-4 text-center text-xl font-medium">
        No food events found at this time.
      </p>
    </div>
  );
};

export default EmptyEvents;

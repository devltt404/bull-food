import NoFoodIcon from "@/components/svg/NoFoodIcon";
import { cn } from "@/utils/cn";

interface EmptyEventsProps {
  className?: string;
}

const EmptyEvents = ({ className }: EmptyEventsProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1",
        className,
      )}
    >
      <NoFoodIcon className="h-32 w-32 fill-red-700" />
      <p className="mt-4 text-center text-xl font-medium">
        No food events found at this time.
      </p>
    </div>
  );
};

export default EmptyEvents;

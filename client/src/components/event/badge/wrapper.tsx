import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EventBadgeWrapperComponent } from "./types";

const EventBadgeWrapper: EventBadgeWrapperComponent = ({
  children,
  className,
}) => {
  return (
    <Badge
      variant="custom"
      className={cn(
        "absolute right-2 top-2 flex items-center gap-1 border-2 py-1 text-sm",
        className,
      )}
    >
      {children}
    </Badge>
  );
};

export default EventBadgeWrapper;

import { EventBadgeType } from "@/constants/event.constant";
import { classifyEventBadgeType } from "@/utils/helper";
import { useMemo } from "react";
import HotEventBadge from "./hot";
import PopularEventBadge from "./popular";
import { EventBadgeComponent } from "./types";

const EventBadge: EventBadgeComponent = ({ going }) => {
  const eventBadgeType = useMemo(() => classifyEventBadgeType(going), [going]);

  if (eventBadgeType === EventBadgeType.hot) return <HotEventBadge />;
  if (eventBadgeType === EventBadgeType.popular) return <PopularEventBadge />;

  return null;
};

export default EventBadge;

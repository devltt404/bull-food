import EventsCarousel from "@/components/event/EventsCarousel";
import { Button } from "@/components/ui/button";

import { ChevronRight } from "lucide-react";

const IndexPage = () => {
  return (
    <div>
      <div className="mb-12 flex h-[20rem] items-center">
        <div className="container mx-auto max-w-2xl">
          <h1 className="mb-8 text-center text-6xl font-semibold leading-tight">
            Hungry on Campus?
          </h1>
          <p className="mb-8 text-center text-2xl text-muted-foreground">
            BullFood helps you find free food events near you!
          </p>
          <div className="text-center">
            <Button className="px-8 py-6 text-lg">
              Discover Now
              <ChevronRight strokeWidth={2} size={24} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="mb-6 text-2xl font-medium">Featured Today</h2>
        <EventsCarousel />
      </div>
    </div>
  );
};

export default IndexPage;

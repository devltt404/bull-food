import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Clock, Heart, MapPin, Users } from "lucide-react";

const EventsCarouselItem = () => {
  return (
    <CarouselItem className="basis-1/4 pl-2 md:pl-4">
      <div className="overflow-hidden rounded-lg border">
        <div className="relative">
          <img
            className="h-40 w-full object-cover"
            src="https://static7.campusgroups.com/upload/usf/2024/r2_image_upload_4217441_Your_paragraph_text_73184024.png"
          />

          <button className="absolute right-2 top-2 flex h-9 w-9 text-secondary items-center justify-center rounded-full bg-muted">
            <Heart size={20} />
          </button>
        </div>
        <div className="px-4 pb-5 pt-3">
          <h3 className="mb-2 text-xl font-medium">Vietnamese Culture Night</h3>
          <ul className="space-y-1">
            <li className="flex items-center text-muted-foreground">
              <Clock size={16} className="mr-2 inline-block" />
              <span className="text-sm">5:30 PM - 9 PM</span>
            </li>
            <li className="flex items-center text-muted-foreground">
              <MapPin size={16} className="mr-2 inline-block" />
              <span className="text-sm">Bill & Selma Sappenfield's home</span>
            </li>
            <li className="flex items-center text-muted-foreground">
              <Users size={16} className="mr-2 inline-block" />
              <span className="text-sm">11 ongoing</span>
            </li>
          </ul>
        </div>
      </div>
    </CarouselItem>
  );
};

const EventsCarousel = () => {
  return (
    <Carousel>
      <CarouselContent className="-ml-2 gap-4 md:-ml-4">
        <EventsCarouselItem />
        <EventsCarouselItem />
        <EventsCarouselItem />
      </CarouselContent>
    </Carousel>
  );
};

export default EventsCarousel;

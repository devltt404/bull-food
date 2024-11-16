import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import NumDateLabel from "./num-date-label";
import { QuickEventsFilterComponent } from "./types";
import WordDateLabel from "./word-date-label";

const QuickEventsFilter: QuickEventsFilterComponent = ({
  daysOffset,
  setdaysOffset,
}) => {
  const filterOptions = useMemo(() => {
    const res = [
      { label: <WordDateLabel word="All" />, value: null },
      { label: <WordDateLabel word="Today" />, value: 0 },
      { label: <WordDateLabel word="Tomorrow" />, value: 1 },
    ];

    for (let i = 2; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      res.push({
        label: <NumDateLabel date={date} />,
        value: i,
      });
    }

    return res;
  }, []);

  return (
    <Carousel className="px-2 pb-6 pt-4">
      <CarouselContent className="items-stretch md:-ml-6">
        {filterOptions.map((option, idx) => (
          <CarouselItem
            className="max-xl:max-w-40 md:pl-6 xl:basis-[12.5%]"
            key={idx}
          >
            <button
              key={idx}
              onClick={() => setdaysOffset(option.value)}
              className={cn(
                `flex h-full w-full flex-col items-center justify-center rounded-md bg-white py-8 text-muted-foreground transition`,
                daysOffset === option.value
                  ? "bg-custom-gradient text-white"
                  : "border hover:border-primary hover:bg-green-50 hover:text-black",
              )}
            >
              {option.label}
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default QuickEventsFilter;

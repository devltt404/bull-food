import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import React, { memo, useMemo } from "react";

const DayLabel = memo(({ day }: { day: Date }) => (
  <>
    <div className="font-medium">
      {day.toLocaleDateString("en-US", { weekday: "short" })}
    </div>
    <div className="text-2xl font-medium">{day.getDate()}</div>
  </>
));

const WordLabel = memo(({ word }: { word: string }) => (
  <div className="text-lg font-medium">{word}</div>
));

const QuickFilter = ({
  daysOffset,
  setdaysOffset,
}: {
  daysOffset: number | null;
  setdaysOffset: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const filterOptions = useMemo(() => {
    const res = [
      { label: <WordLabel word="All" />, value: null },
      { label: <WordLabel word="Today" />, value: 0 },
      { label: <WordLabel word="Tomorrow" />, value: 1 },
    ];

    for (let i = 2; i < 7; i++) {
      const day = new Date();
      day.setDate(day.getDate() + i);
      res.push({
        label: <DayLabel day={day} />,
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
            className="basis-1/2 sm:basis-1/4 md:basis-1/4 md:pl-6 lg:basis-1/5 xl:basis-[12.5%]"
            key={idx}
          >
            <button
              key={idx}
              onClick={() => setdaysOffset(option.value)}
              className={cn(
                `flex h-full w-full flex-col items-center justify-center rounded-md bg-white py-8 text-muted-foreground transition`,
                daysOffset === option.value
                  ? "bg-primary text-white"
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

export default QuickFilter;

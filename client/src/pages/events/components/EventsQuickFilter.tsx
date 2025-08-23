import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/helper";
import { useEffect, useMemo, useState } from "react";
import { useEvents } from "./EventsContext";

interface NumberDateLabelProps {
  date: Date;
}
const NumberDateLabel = ({ date }: NumberDateLabelProps) => {
  return (
    <>
      <div className="font-medium">
        {date.toLocaleDateString("en-US", { weekday: "short" })}
      </div>
      <div className="text-2xl font-medium">{date.getDate()}</div>
    </>
  );
};

interface WordDateLabelProps {
  word: string;
}
const WordDateLabel = ({ word }: WordDateLabelProps) => {
  return <div className="text-xl font-medium">{word}</div>;
};

export default function EventsQuickFilter() {
  const { setFetchEventsParams } = useEvents();
  const [daysOffset, setDaysOffset] = useState<number | null>(null);

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
        label: <NumberDateLabel date={date} />,
        value: i,
      });
    }

    return res;
  }, []);

  useEffect(() => {
    if (daysOffset !== null) {
      const date = formatDate({ daysOffset });
      setFetchEventsParams((prev) => ({
        ...prev,
        fromDate: date,
        toDate: date,
      }));
    } else {
      setFetchEventsParams({});
    }
  }, [daysOffset, setFetchEventsParams]);

  return (
    <Carousel>
      <CarouselContent className="items-stretch md:-ml-6">
        {filterOptions.map((option, idx) => (
          <CarouselItem
            className="max-xl:max-w-40 md:pl-6 xl:basis-[12.5%]"
            key={idx}
          >
            <button
              key={idx}
              onClick={() => setDaysOffset(option.value)}
              className={cn(
                `flex h-full w-full flex-col items-center justify-center rounded-md bg-white py-8 text-muted-foreground transition`,
                daysOffset === option.value
                  ? "bg-primary text-primary-foreground"
                  : "border hover:border-primary hover:bg-green-100 hover:text-primary-foreground",
              )}
            >
              {option.label}
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

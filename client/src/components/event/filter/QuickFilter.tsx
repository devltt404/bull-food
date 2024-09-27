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
  dateOffset,
  setDateOffset,
}: {
  dateOffset: number | null;
  setDateOffset: React.Dispatch<React.SetStateAction<number | null>>;
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
    <div className="grid grid-cols-8 gap-8 px-2 pb-6 pt-4">
      {filterOptions.map((option, idx) => (
        <button
          key={idx}
          onClick={() => setDateOffset(option.value)}
          className={cn(
            `group relative flex flex-col items-center justify-center rounded-md bg-white py-8 text-muted-foreground transition`,
            dateOffset === option.value
              ? "bg-primary text-white"
              : "border hover:border-primary hover:bg-green-50 hover:text-black",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default QuickFilter;

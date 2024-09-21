const QuickFilter = () => {
  return (
    <div className="grid grid-cols-8 overflow-hidden rounded-lg">
      {["All", "Today", "Tomorrow", 1, 2, 3, 4, 5].map((item, i) => {
        const day = new Date();
        day.setDate(day.getDate() + i);

        return (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-white py-8 text-muted-foreground [&:not(:last-child)]:border-r"
          >
            {typeof item === "string" ? (
              <div className="text-lg font-medium">{item}</div>
            ) : (
              <>
                <div className="font-medium">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="text-xl font-semibold">{day.getDate()}</div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuickFilter;

import { NumDateLabelComponent } from "./types";

const NumDateLabel: NumDateLabelComponent = ({ date }) => {
  return (
    <>
      <div className="font-medium">
        {date.toLocaleDateString("en-US", { weekday: "short" })}
      </div>
      <div className="text-2xl font-medium">{date.getDate()}</div>
    </>
  );
};

export default NumDateLabel;

import { WordDateLabelComponent } from "./types";

const DateWordLabel: WordDateLabelComponent = ({ word }) => {
  return <div className="text-lg font-medium">{word}</div>;
};

export default DateWordLabel;

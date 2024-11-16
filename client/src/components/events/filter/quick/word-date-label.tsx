import { WordDateLabelComponent } from "./types";

const WordDateLabel: WordDateLabelComponent = ({ word }) => {
  return <div className="text-lg font-medium">{word}</div>;
};

export default WordDateLabel;

import React, { useMemo } from "react";
import { suggestColor } from "../utils";

function WordLine({
  word,
  selectedWord,
  isConfirmed,
  setCorrectWordGuessed,
  setButtonColor,
  buttonColor,
}) {
  const colorArray = useMemo(() => {
    let colorArr = ["", "", "", "", ""];
    let tempSelectedArray = [...selectedWord];
    let tempWordArray = [...word];
    let newButtonColor = { ...buttonColor };
    if (isConfirmed) {
      word.forEach((item, index) => {
        if (item === selectedWord[index]) {
          colorArr[index] = "green";
          newButtonColor[item] = "green";
          tempSelectedArray.splice(index, 1, "");
          tempWordArray.splice(index, 1, "");
        } else if (!selectedWord.includes(item)) {
          colorArr[index] = "grey";
          newButtonColor[item] = suggestColor(newButtonColor[item], "grey");
        }
      });
      [...colorArr].forEach((item, index) => {
        if (!item) {
          let occuranceInTempWord = tempWordArray.filter(
            (item) => item === word[index]
          ).length;
          let occuranceInTempSelectedWord = tempSelectedArray.filter(
            (item) => item === word[index]
          ).length;
          if (occuranceInTempWord <= occuranceInTempSelectedWord) {
            colorArr[index] = "yellow";
          } else {
            let length = word
              .slice(0, index)
              .filter((item) => item === word[index]).length;
            colorArr[index] =
              length < occuranceInTempSelectedWord ? "yellow" : "grey";
          }
          newButtonColor[word[index]] = suggestColor(
            newButtonColor[word[index]],
            "yellow"
          );
        }
      });
      if (!colorArr.includes("yellow") && !colorArr.includes("grey")) {
        setCorrectWordGuessed(true);
      }
      setButtonColor(newButtonColor);
    }
    return colorArr;
  }, [isConfirmed]);

  return (
    <div className="wordLineContainer">
      {word.map((alphabet, index) => (
        <div className={`alphabetBox ${colorArray[index]}`}>{alphabet}</div>
      ))}
    </div>
  );
}

export default WordLine;

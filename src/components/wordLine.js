import React from "react";

function WordLine({ word, selectedWord, isConfirmed }) {
  const colorArray = () => {
    let colorArr = ["", "", "", "", ""];
    let tempSelectedArray = [...selectedWord];
    let tempWordArray = [...word];
    if (isConfirmed) {
      word.forEach((item, index) => {
        if (item === selectedWord[index]) {
          colorArr[index] = "green";
          tempSelectedArray.splice(index, 1, "");
          tempWordArray.splice(index, 1, "");
        } else if (!selectedWord.includes(item)) {
          colorArr[index] = "grey";
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
          if (occuranceInTempWord <= occuranceInTempSelectedWord)
            colorArr[index] = "yellow";
          else {
            let length = word
              .slice(0, index)
              .filter((item) => item === word[index]).length;
            colorArr[index] =
              length < occuranceInTempSelectedWord ? "yellow" : "grey";
          }
        }
      });
    }
    return colorArr;
  };

  return (
    <div className="wordLineContainer">
      {word.map((alphabet, index) => (
        <div className={`alphabetBox ${colorArray()[index]}`}>{alphabet}</div>
      ))}
    </div>
  );
}

export default WordLine;

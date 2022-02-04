import React from "react";

function WordLine({ word, selectedWord, isConfirmed }) {
  const colorPresent = (alphabet, index) => {
    if (isConfirmed) {
      if (selectedWord[index] === alphabet) return "green";
      else if (!selectedWord.includes(alphabet)) return "grey";
      else {
        if (index > 0) {
          let occuranceInSelected = selectedWord.filter(
            (item) => item === alphabet
          ).length;
          let occuranceInWord = word
            .slice(0, index)
            .filter((item) => item === alphabet).length;
          if (occuranceInSelected > occuranceInWord) return "yellow";
          else return "grey";
        } else return "yellow";
      }
    } else return "";
  };
  return (
    <div className="wordLineContainer">
      {word.map((alphabet, index) => (
        <div className={`alphabetBox ${colorPresent(alphabet, index)}`}>
          {alphabet}
        </div>
      ))}
    </div>
  );
}

export default WordLine;

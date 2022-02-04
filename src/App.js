import { useState } from "react";
import WordLine from "./components/wordLine";
import { dictionaryWords, keyBoard, initialState, randomWord } from "./utils";
import "./App.css";

function App() {
  const [state, setState] = useState(initialState);

  const [selectedWord, setSelectedWord] = useState(["p", "l", "e", "a", "d"]);

  const handleKeyboardClick = (alphabet, isAlphabet) => {
    let newState = { ...state };
    const currentLineIndex = Object.keys(state).findIndex(
      (item) => !state[item].isConfirmed
    );
    const currentLine = `line${currentLineIndex + 1}`;
    let currentAlphabetIndex;
    if (isAlphabet) {
      currentAlphabetIndex = state[currentLine].word.findIndex((item) => !item);
    } else {
      currentAlphabetIndex =
        state[currentLine].word.indexOf("") !== -1
          ? state[currentLine].word.indexOf("") - 1
          : state[currentLine].word.length - 1;
    }
    let newWordArray = [...state[currentLine].word];
    if (currentAlphabetIndex !== -1) {
      newWordArray[currentAlphabetIndex] = alphabet;
      newState = {
        ...newState,
        [currentLine]: {
          word: newWordArray,
          isConfirmed: false,
        },
      };
      setState(newState);
    }
  };

  const handleEnterClick = () => {
    let newState = { ...state };
    const currentLineIndex = Object.keys(state).findIndex(
      (item) => !state[item].isConfirmed
    );
    const currentLine = `line${currentLineIndex + 1}`;

    const wordArray = state[currentLine].word;
    if (
      !wordArray.includes("") &&
      dictionaryWords.includes(wordArray.join(""))
    ) {
      newState = {
        ...newState,
        [currentLine]: {
          word: wordArray,
          isConfirmed: true,
        },
      };
      setState(newState);
    }
  };

  console.log("dictionaryWords", selectedWord, state);
  return (
    <div className="App">
      <h1>WordBee!</h1>
      <div className="wordContainer">
        {Object.keys(state).map((line) => (
          <WordLine
            word={state[line].word}
            isConfirmed={state[line].isConfirmed}
            selectedWord={selectedWord}
          />
        ))}
      </div>
      <div className="Keyboard">
        <div className="wordButton">
          {keyBoard.map((item) => (
            <button
              className="button"
              onClick={() => handleKeyboardClick(item, true)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="actionButton">
          <button className="button" onClick={handleEnterClick}>
            Enter
          </button>
          <button
            className="button"
            onClick={() => handleKeyboardClick("", false)}
          >
            BackSpace
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

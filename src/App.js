import { useState } from "react";
import WordLine from "./components/wordLine";
import {
  dictionaryWords,
  keyBoard,
  initialState,
  randomWord,
  initialColorState,
} from "./utils";
import "./App.css";

function App() {
  const [state, setState] = useState(initialState);
  const [correctWordGuessed, setCorrectWordGuessed] = useState(false);
  const [selectedWord, setSelectedWord] = useState(randomWord);
  const [buttonColor, setButtonColor] = useState(initialColorState);

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

  const refreshHandler = () => {
    setState(initialState);
    setCorrectWordGuessed(false);
    setSelectedWord(randomWord());
  };

  return (
    <div className="App">
      <h1>WordBee!</h1>
      <div className="wordContainer">
        {Object.keys(state).map((line) => (
          <WordLine
            word={state[line].word}
            isConfirmed={state[line].isConfirmed}
            selectedWord={selectedWord}
            setCorrectWordGuessed={setCorrectWordGuessed}
            setButtonColor={setButtonColor}
            buttonColor={buttonColor}
          />
        ))}
      </div>
      {correctWordGuessed && (
        <div className="congratulation">
          Congratulation! You have guessed the correct word.
          <br />
          <u>
            <span>{selectedWord.join("")}</span>
          </u>
          <br />
          <button onClick={refreshHandler}>Refresh</button>
        </div>
      )}
      <div className="Keyboard">
        <div className="wordButton">
          {keyBoard.map((item) => (
            <button
              className={`button ${buttonColor[item]}`}
              onClick={() => handleKeyboardClick(item, true)}
              disabled={correctWordGuessed}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="actionButton">
          <button
            className="button"
            onClick={handleEnterClick}
            disabled={correctWordGuessed}
          >
            Enter
          </button>
          <button
            className="button"
            disabled={correctWordGuessed}
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

import data from "../data.json";

const dictionaryWords = Object.keys(data).filter((word) => word.length === 5);

const keyBoard = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

const initialState = {
  line1: {
    word: ["", "", "", "", ""],
    isConfirmed: false,
  },
  line2: {
    word: ["", "", "", "", ""],
    isConfirmed: false,
  },
  line3: {
    word: ["", "", "", "", ""],
    isConfirmed: false,
  },
  line4: {
    word: ["", "", "", "", ""],
    isConfirmed: false,
  },
  line5: {
    word: ["", "", "", "", ""],
    isConfirmed: false,
  },
  line6: {
    word: ["", "", "", "", ""],
    isConfirmed: false,
  },
};

const randomWord = () => {
  let index = Math.floor(Math.random() * dictionaryWords.length);
  return dictionaryWords[index].split("");
};
export { dictionaryWords, keyBoard, initialState, randomWord };

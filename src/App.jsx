import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import { wordsList } from "./data/words";
import "./App.css";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const [difficulty, setDifficulty] = useState("easy");

  // Função para normalizar letras (remove acentos)
  const normalizeLetter = (letter) => {
    return letter
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Escolhe palavra e categoria
  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  };

  // Inicia o jogo
  const startGame = () => {
    const initialGuesses = difficulty === "hard" ? 2 : 5;
    setGuesses(initialGuesses);

    const { word, category } = pickWordAndCategory();

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(word.split("").map((l) => normalizeLetter(l)));

    setGuessedLetters([]);
    setWrongLetters([]);

    setGameStage(stages[1].name);
  };

  // Verifica a letra jogada
  const verifyLetter = (letter) => {
    const normalizedLetter = normalizeLetter(letter);

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actual) => [...actual, normalizedLetter]);
    } else {
      setWrongLetters((actual) => [...actual, normalizedLetter]);
      setGuesses((actual) => actual - 1);
    }
  };

  // Condição de derrota
  useEffect(() => {
    if (guesses <= 0) {
      const currentHighScore = parseInt(localStorage.getItem("highscore")) || 0;
      if (score > currentHighScore) localStorage.setItem("highscore", score);
      setGameStage(stages[2].name); // GameOver só na derrota
    }
  }, [guesses, score]);

  // Condição de vitória - inicia nova rodada
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    const allGuessed = uniqueLetters.every((l) =>
      guessedLetters.includes(l)
    );

    if (letters.length > 0 && allGuessed) {
      const newScore = score + 100;
      setScore(newScore);

      // salva highscore se ultrapassou
      const currentHighScore = parseInt(localStorage.getItem("highscore")) || 0;
      if (newScore > currentHighScore) localStorage.setItem("highscore", newScore);

      // inicia nova rodada automaticamente
      startGame();
    }
  }, [guessedLetters, letters, score]);

  // Reinicia o jogo
  const retry = () => {
    setScore(0);
    setGuesses(difficulty === "hard" ? 2 : 5);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && (
        <StartScreen startGame={startGame} setDifficulty={setDifficulty} />
      )}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;

import { useState, useRef } from "react";
import "./Game.css";
import Keyboard from "./Keyboard";

const Game = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!letter) return;
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação:</span> {score}
      </p>

      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>

      <p>Você ainda tem {guesses} tentativa(s).</p>

      <div className="wordContainer">
        {letters.map((l, i) =>
          guessedLetters.includes(l) ? (
            <span className="letter" key={i}>
              {l}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
            inputMode="text"
            autoComplete="off"
            aria-label="Campo para digitar letra"
            style={{ textTransform: "lowercase" }}
          />
          <button type="submit">Jogar!</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((l, i) => (
          <span key={i}>
            {l}
            {i < wrongLetters.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>

      <Keyboard
        verifyLetter={verifyLetter}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
      />
    </div>
  );
};

export default Game;

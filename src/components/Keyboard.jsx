import "./Keyboard.css";

const Keyboard = ({ verifyLetter, guessedLetters = [], wrongLetters = [] }) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const isDisabled = (letter) =>
    guessedLetters.includes(letter) || wrongLetters.includes(letter);

  return (
    <div className="keyboard">
      {alphabet.map((l) => (
        <button
          key={l}
          className="key"
          onClick={() => verifyLetter(l)}
          disabled={isDisabled(l)}
          aria-label={`Tecla ${l.toUpperCase()}`}
          type="button"
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;

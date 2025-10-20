import "./StartScreen.css";

const StartScreen = ({ startGame, setDifficulty }) => {
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <div className="choice">
            <label>
                Nível de dificuldade:
                <select onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Fácil (5 vidas)</option>
                <option value="hard">Difícil (2 vidas)</option>
                </select>
            </label>

            <button onClick={startGame}>Começar o jogo</button>
        </div>
    </div>
  );
};

export default StartScreen;

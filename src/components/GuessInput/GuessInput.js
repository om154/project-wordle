import React from 'react';

function GuessInput({ saveGuess, won, lost }) {
  const [guess, setGuess] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    saveGuess(guess)
    setGuess('');
  }

  return (
    <form onSubmit={handleSubmit} className="guess-input-wrapper">
      <label htmlFor='guess-text'>Enter guess:</label>
      <input
        type="text"
        id="guess-text"
        value={guess}
        onChange={e => setGuess(e.target.value.toUpperCase())}
        pattern="^[a-zA-Z]{5}$" // must be 5 alphabetical letters
        aria-invalid={guess.length !== 5}
        maxLength={5}
        minLength={5}
        required
        disabled={won || lost}
      />
      {won !== null && <div class="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong>{won.guessCount} guesses</strong>.
        </p>
      </div>}
      {lost !== null && <div class="sad banner">
        <p>Sorry, the correct answer is <strong>{lost.answer}</strong>.</p>
      </div>}
    </form>
  );
}

export default GuessInput;

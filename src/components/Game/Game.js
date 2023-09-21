import React from 'react';

import { range, sample } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput/GuessInput';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);

  const handleSaveGuess = (guess) => {
    if (guesses.length >= NUM_OF_GUESSES_ALLOWED) return;
    setGuesses([...guesses, {
      value: guess,
      id: crypto.randomUUID()
    }]);
  }

  const nBlankRows = NUM_OF_GUESSES_ALLOWED - guesses.length
  const blankRows = range(nBlankRows).map(() => ({ id: crypto.randomUUID() }))

  const correctGuesses = guesses.filter(({ value }) => value === answer);

  console.log('guesses', guesses)
  return (
    <>
      <div className="guess-results">
        {guesses.map(({ value, id }) => (
          <p className="guess" key={id}>
            {checkGuess(value, answer).map(({ status, letter }) => (
              <span
                className={`cell ${status}`}
              // key={`${id}-${letter}`}
              >
                {letter}
              </span>
            ))}
          </p>
        ))}
        {blankRows.map((row) => (
          <p className='guess' key={row.id}>
            <span className='cell' />
            <span className='cell' />
            <span className='cell' />
            <span className='cell' />
            <span className='cell' />
          </p>
        ))}
      </div>
      <GuessInput
        saveGuess={handleSaveGuess}
        won={correctGuesses.length > 0 ? { guessCount: guesses.length } : null}
        lost={guesses.length === NUM_OF_GUESSES_ALLOWED && correctGuesses.length === 0 ? { answer } : null}
      />
    </>
  );
}

export default Game;

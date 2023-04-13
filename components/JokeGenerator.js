import React, { useState } from 'react';
import getJoke from '../api/jokeData';

const JokeGenerator = () => {
  const [setup, setSetup] = useState('');
  const [punchline, setPunchline] = useState('');
  const [buttonText, setButtonText] = useState('Get a Joke');
  const [showPunchline, setShowPunchline] = useState(false);

  const fetchJoke = () => {
    setButtonText('Loading...');
    getJoke().then((jokeData) => {
      setSetup(jokeData.setup);
      setPunchline(jokeData.delivery);
      setShowPunchline(false);
      setButtonText('Get Punchline');
    }).catch((error) => {
      console.error(error);
    });
  };

  const handlePunchlineClick = () => {
    setShowPunchline(true);
    setButtonText('Get Another Joke');
  };

  const handleResetClick = () => {
    setSetup('');
    setPunchline('');
    setShowPunchline(false);
    setButtonText('Get a Joke');
  };

  return (
    <div>
      <h1>Joke Generator</h1>
      {setup && <p>{setup}</p>}
      {showPunchline && punchline && <p>{punchline}</p>}
      {!setup && !punchline && (
        <button type="button" onClick={fetchJoke}>{buttonText}</button>
      )}
      {setup && !showPunchline && (
        <button type="button" onClick={handlePunchlineClick}>{buttonText}</button>
      )}
      {setup && showPunchline && (
        <button type="button" onClick={handleResetClick}>Get Another Joke</button>
      )}
    </div>
  );
};

export default JokeGenerator;

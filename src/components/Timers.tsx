import React, { useState, useEffect } from 'react';

interface TimersProps {
  turn: 'white' | 'black';
  paused: boolean;
}

const Timers: React.FC<TimersProps> = ({ turn, paused }) => {
  const [whiteTime, setWhiteTime] = useState<number>(300); 
  const [blackTime, setBlackTime] = useState<number>(300); 

  useEffect(() => {
    if (turn === 'white') {
      setWhiteTime(300);
    } else {
      setBlackTime(300);
    }
  }, [turn]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!paused) {
      timer = setInterval(() => {
        if (turn === 'white') {
          setWhiteTime(prev => Math.max(prev - 1, 0));
        } else {
          setBlackTime(prev => Math.max(prev - 1, 0));
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [turn, paused]);

  return (
    <div>
      <h3>
        White Time: {Math.floor(whiteTime / 60)}:
        {whiteTime % 60 < 10 ? `0${whiteTime % 60}` : whiteTime % 60}
      </h3>
      <h3>
        Black Time: {Math.floor(blackTime / 60)}:
        {blackTime % 60 < 10 ? `0${blackTime % 60}` : blackTime % 60}
      </h3>
    </div>
  );
};

export default Timers;

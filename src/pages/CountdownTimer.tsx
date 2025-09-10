import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const targetDate = new Date('2025-09-21T23:59:59').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    return difference > 0 ? Math.floor(difference / 1000) : 0; // seconds
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(() => {
        const newTime = calculateTimeLeft();
        if (newTime === 0) {
          clearInterval(timerInterval);
          console.log('Countdown complete!');
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const days = Math.floor(timeRemaining / 86400);
  const hours = Math.floor((timeRemaining % 86400) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="countdown-container">
      <h2 className="countdown-title">Coming Soon</h2>
      <div className="timer">
        <div className="time-segment">
          <span className="number">{days}</span>
          <span className="label">Days</span>
        </div>
        <div className="time-segment">
          <span className="number">{hours}</span>
          <span className="label">Hrs</span>
        </div>
        <div className="time-segment">
          <span className="number">{minutes}</span>
          <span className="label">Mins</span>
        </div>
        <div className="time-segment">
          <span className="number">{seconds}</span>
          <span className="label">Sec</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

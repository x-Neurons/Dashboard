import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateExpirationTime = () => {
      const tokenExpiresAt = parseInt(localStorage.getItem('expiresAt'), 10);
      const now = Math.floor(new Date().getTime() / 1000);
      const remainingTime = tokenExpiresAt - now;
      setTimeLeft(remainingTime > 0 ? remainingTime : 0);
    };

    const updateTimer = () => {
      updateExpirationTime(); // Calculate time left
    };

    // Update the timer immediately when the component mounts
    updateTimer();

    // Check the timer every second
    const timerInterval = setInterval(updateTimer, 1000);

    // Listen for token refresh events and update the timer when the token is refreshed
    const handleTokenRefresh = () => {
      updateExpirationTime(); // Update timer when token refresh event is detected
    };

    window.addEventListener('tokenRefreshed', handleTokenRefresh);

    return () => {
      clearInterval(timerInterval);
      window.removeEventListener('tokenRefreshed', handleTokenRefresh); // Clean up the event listener on unmount
    };
  }, []);

  return (
    <div className="text-center">
      {timeLeft > 0 ? (
        <div>
          <h3>Token Expires In:</h3>
          <p>{Math.floor(timeLeft / 60)} minutes {timeLeft % 60} seconds</p>
        </div>
      ) : (
        <div>
          <h3>Token Expired</h3>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;

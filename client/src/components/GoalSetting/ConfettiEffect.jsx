import React, { useEffect } from 'react';
import Confetti from 'react-confetti';

const ConfettiEffect = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="confetti-popup">
      <Confetti />
      <h2>{message}</h2>
    </div>
  );
};

export default ConfettiEffect;

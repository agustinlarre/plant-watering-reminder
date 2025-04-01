import React, { useState, useEffect } from 'react';
import happyPlant from '../assets/images/Anton.jpeg';
import './CongratulationsPopup.css';

function CongratulationsPopup({ plantName, onClose }) {
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
      // Create confetti
      const newConfetti = Array(30).fill().map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        delay: Math.random() * 2
      }));
      setConfetti(newConfetti);
  
      return () => setConfetti([]);
    }, []);

    return (
        <div className="congratulations-overlay">
            {confetti.map(c => (
                <div 
                key={c.id}
                className="confetti" 
                style={{
                    left: `${c.left}%`,
                    backgroundColor: c.color,
                    animationDelay: `${c.delay}s`
                }}
                />
            ))}
        <div className="congratulations-popup">
            <h2>Buen trabajo! 🌱</h2>
            <img 
            src={happyPlant} 
            alt="Happy plant" 
            className="congrats-image"
            />
            <p>Acabas de regar <strong>{plantName}</strong>!</p>
            <p>Antón te lo agradece, seguí así!</p>
            <button onClick={onClose}>Cerrar</button>
        </div>
        </div>
    );
}

export default CongratulationsPopup;
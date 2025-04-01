import React, { useState, useEffect } from 'react';
import sadPlant from '../assets/images/SadAnton.jpeg';
import './DeleteConfirmation.css';

function DeleteConfirmation({ plantName, onConfirm, onCancel }) {
    const [raindrops, setRaindrops] = useState([]);

    useEffect(() => {
        const initialDrops = Array(20).fill().map((_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 0.5 + Math.random() * 1.5
        }));
        setRaindrops(initialDrops);
    
        const interval = setInterval(() => {
          setRaindrops(prev => [
            ...prev.slice(-30),
            {
              id: Date.now(),
              left: Math.random() * 100,
              delay: 0,
              duration: 0.5 + Math.random() * 1.5
            }
          ]);
        }, 300);
    
        return () => clearInterval(interval);
      }, []);

  return (
    <div className="delete-confirmation-overlay">
      <div className="rain-container">
        {raindrops.map(drop => (
          <div 
            key={drop.id}
            className="raindrop"
            style={{
              left: `${drop.left}%`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`
            }}
          />
        ))}
      </div>
      <div className="delete-confirmation-modal">
        <h3>Borrar {plantName}?</h3>
        <div className="plant-image-preview">
          <img 
            src={sadPlant} 
            alt="Sad plant" 
            className="sad-plant-image"
          />
        </div>
        <p>Estás seguro de que quieres borrar esta planta? Antón se pondrá triste.</p>
        <div className="confirmation-buttons">
          <button className="cancel-button" onClick={onCancel}>Cancelar</button>
          <button className="confirm-button" onClick={onConfirm}>Borrar</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
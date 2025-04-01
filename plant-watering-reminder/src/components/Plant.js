import React from 'react';

function Plant({ name, lastWatered, wateringFrequency, onDelete, onWater }) {
  const daysSinceWatered = Math.floor((new Date() - new Date(lastWatered)) / (1000 * 60 * 60 * 24));
  const needsWater = daysSinceWatered >= wateringFrequency;
  
  return (
    <div className={`plant ${needsWater ? 'needs-water' : ''}`}>
      <h3>{name}</h3>
      <p>Última regada: {new Date(lastWatered).toLocaleDateString()}</p>
      <p>Regar cada {wateringFrequency} día/s</p>
      {needsWater && <div className="alert">Necesita ser regada!</div>}
      <div className="plant-actions">
        <button onClick={onWater}>Regar</button>
        <button className="delete-button" onClick={onDelete}>Borrar</button>
      </div>
    </div>
  );
}

export default Plant;
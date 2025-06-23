import React from "react";
import "./SensorCard.css";

const SensorCard = ({ title, value, unit, icon, color }) => {
  return (
    <div className="card" style={{ borderLeft: `8px solid ${color}` }}>
      <h3>{icon} {title}</h3>
      <p>{value} {unit}</p>
    </div>
  );
};

export default SensorCard;

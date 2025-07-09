// components/NormaAlert.jsx
import React from "react";
import "./NormaAlert.css";

export default function NormaAlert({ tipo, mensaje, nivel, color }) {
  return (
    <div className="norma-alert" style={{ borderLeftColor: color }}>
      <strong>{tipo}</strong>
      <p>{mensaje}</p>
      {nivel !== null && <span className="nivel">Nivel: {nivel}</span>}
    </div>
  );
}

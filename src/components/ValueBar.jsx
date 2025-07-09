import React from "react";
import "./ValueBar.css";

export default function ValueBar({ label, value, color }) {
  const percentage = Math.min(100, Math.max(0, value * 100));

  return (
    <div className="value-bar">
      <label>{label}</label>
      <div className="bar-container">
        <div className="bar-fill" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
      </div>
      <div className="bar-value">{value}</div>
    </div>
  );
}

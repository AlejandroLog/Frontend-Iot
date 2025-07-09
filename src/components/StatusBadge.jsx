import React from "react";
import "./StatusBadge.css";

export default function StatusBadge({ label, value, icon, color }) {
  return (
    <div className="status-badge" style={{ borderColor: color }}>
      <div className="status-icon" style={{ color }}>{icon}</div>
      <div className="status-info">
        <p className="status-title">{label}</p>
        <p className="status-value">{value}</p>
      </div>
    </div>
  );
}

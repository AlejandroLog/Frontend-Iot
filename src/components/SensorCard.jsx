// components/SensorCard.jsx
export default function SensorCard({ title, value, unit, icon, color }) {
  return (
    <div className="sensor-card">
      <div className="sensor-icon" style={{ color }}>{icon}</div>
      <div className="sensor-title">{title}</div>
      <div className="sensor-value">
        {value} <span style={{ fontSize: "1rem", color: "#cbd5e1" }}>{unit}</span>
      </div>
    </div>
  );
}

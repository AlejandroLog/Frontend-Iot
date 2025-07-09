// components/Gauge.jsx
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Gauge = ({ value, max, label, color }) => {
  return (
    <div className="gauge-wrapper">
      <div className="gauge-chart">
        <CircularProgressbar
          value={value}
          maxValue={max}
          text={`${value}${label}`}
          styles={buildStyles({
            textColor: "#ffffff",
            pathColor: color,
            trailColor: "#334155"
          })}
        />
      </div>
      <div className="gauge-label">
        {label === "°C" ? "Temperatura" : label === "%" ? "Humedad" : ""}
      </div>
    </div>
  );
};

export default Gauge;

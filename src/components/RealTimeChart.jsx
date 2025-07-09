// components/RealTimeChart.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function RealTimeChart({ data, label, color }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <h3>{label}</h3>
      <LineChart width={400} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </div>
  );
}

export default RealTimeChart;

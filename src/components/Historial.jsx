// components/Historial.jsx
import React, { useEffect, useState } from "react";

export default function Historial() {
  const [filas, setFilas]     = useState([]);
  const [desde, setDesde]     = useState("");
  const [hasta, setHasta]     = useState("");

  const fetchHistorial = () => {
    const qs = new URLSearchParams();
    if (desde) qs.set("desde", desde);
    if (hasta) qs.set("hasta", hasta);

    fetch(`http://localhost:8000/historial?${qs}`)
      .then((res) => res.json())
      .then(setFilas)
      .catch(console.error);
  };

  useEffect(fetchHistorial, []);

  return (
    <div className="historial-panel">
      <h2>📜 Historial de Lecturas</h2>
      <div className="filtros">
        <label>
          Desde:{" "}
          <input type="date" value={desde} onChange={e => setDesde(e.target.value)} />
        </label>
        <label style={{ marginLeft: 20 }}>
          Hasta:{" "}
          <input type="date" value={hasta} onChange={e => setHasta(e.target.value)} />
        </label>
        <button onClick={fetchHistorial} className="btn">
          Filtrar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Fecha / Hora</th>
            <th>Temp (°C)</th>
            <th>Humedad (%)</th>
            <th>Ruido</th>
            <th>Gas</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.id}>
              <td>{new Date(f.timestamp).toLocaleString()}</td>
              <td>{f.temperatura}</td>
              <td>{f.humedad}</td>
              <td>
                {f.nivel_sonido} ({f.estado_sonido})
              </td>
              <td>
                {f.nivel_gas} ({f.estado_gas})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

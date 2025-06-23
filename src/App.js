import React, { useEffect, useState } from "react";
import SensorCard from "./components/SensorCard";
import "./styles.css";

function App() {
  const [datos, setDatos] = useState({
    temperatura: null,
    humedad: null,
    sonido: "",
    nivel_ruido: 0
  });

  useEffect(() => {
    const fetchDatos = () => {
      fetch("http://192.168.131.81:8000/sensores")
        .then(res => res.json())
        .then(data => setDatos(data))
        .catch(err => console.error("❌ Error conectando con la API", err));
    };

    fetchDatos();
    const interval = setInterval(fetchDatos, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>🌡️ Monitoreo Ambiental IoT</h1>
      <div className="container">
        <SensorCard
          title="Temperatura"
          value={datos.temperatura ?? "N/A"}
          unit="°C"
          icon="🌡️"
          color="#f97316"
        />
        <SensorCard
          title="Humedad"
          value={datos.humedad ?? "N/A"}
          unit="%"
          icon="💧"
          color="#3b82f6"
        />
        <SensorCard
          title="Nivel de ruido"
          value={datos.nivel_ruido ?? 0}
          unit="eventos/s"
          icon="🔊"
          color="#16a34a"
        />
        <SensorCard
          title="Estado sonido"
          value={datos.sonido}
          unit=""
          icon={datos.sonido === "detectado" ? "💥" : "😴"}
          color={datos.sonido === "detectado" ? "#dc2626" : "#9ca3af"}
        />
      </div>
    </div>
  );
}

export default App;

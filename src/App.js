import React, { useEffect, useState } from "react";
import SensorCard from "./components/SensorCard";
import RealTimeChart from "./components/RealTimeChart";
import Gauge from "./components/Gauge";
import StatusBadge from "./components/StatusBadge";
import ValueBar from "./components/ValueBar";
import NormaAlert from "./components/NormaAlert";
import NormasPanel from "./components/NormasPanel";

import "./styles.css";
import "./components/StatusBadge.css";
import "./components/ValueBar.css";
import "./components/NormaAlert.css";
import "./components/NormasPanel.css";

function App() {
  const [datos, setDatos] = useState({
    temperatura: null,
    humedad: null,
    sonido: "",
    valor_sonido: null,
    gas: "",
    valor_gas: null,
  });

  const [historicoTemp, setHistoricoTemp] = useState([]);
  const [historicoHumedad, setHistoricoHumedad] = useState([]);

  useEffect(() => {
    const fetchDatos = () => {
      fetch("http://192.168.1.7:8000/sensores")
        .then((res) => res.json())
        .then((data) => {
          const timestamp = new Date().toLocaleTimeString();
          setDatos(data);

          if (data.temperatura != null) {
            setHistoricoTemp((prev) => [
              ...prev.slice(-19),
              { time: timestamp, value: data.temperatura },
            ]);
          }
          if (data.humedad != null) {
            setHistoricoHumedad((prev) => [
              ...prev.slice(-19),
              { time: timestamp, value: data.humedad },
            ]);
          }
        })
        .catch((err) => console.error("❌ Error conectando con la API", err));
    };

    fetchDatos();
    const interval = setInterval(fetchDatos, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Presentación inicial */}
      <section className="hero">
        <div className="hero-content">
          <h1>🌍 Sistema de Monitoreo Ambiental IoT</h1>
          <p>
            <strong>
              Diseño de Prototipo de Monitoreo Ambiental en Plantas Industriales
            </strong>{" "}
            a través de un dispositivo IoT, con base en las{" "}
            <strong>NOM 081, 025 y 022</strong>, integrando un sistema web para
            la visualización en tiempo real.
          </p>
        </div>
      </section>

      {/* Sección Explicativa de Normas */}
<section className="normas-section">
  <h2>📚 ¿Qué son las NOM 081, 025 y 022?</h2>
  <p>
    Las normas oficiales mexicanas (<strong>NOM</strong>) establecen los límites máximos y condiciones que deben cumplirse
    para proteger la salud de los trabajadores y el medio ambiente.
  </p>

  <ul>
    <li><strong>✅ NOM-081-SEMARNAT:</strong> Regula los niveles máximos de ruido permitidos en el medio ambiente. Nuestro sistema detecta si se superan esos niveles y activa alertas.</li>
    <li><strong>✅ NOM-025-STPS:</strong> Establece condiciones de seguridad e iluminación en el entorno laboral, incluyendo control de ruido para proteger la salud auditiva del personal.</li>
    <li><strong>✅ NOM-022-STPS:</strong> Señala medidas de prevención para la exposición a atmósferas explosivas o con gases. Nuestro sensor de gas ayuda a detectar condiciones peligrosas antes de que se conviertan en emergencias.</li>
  </ul>

  <p>
    💡 <strong>Beneficio para la empresa:</strong> este sistema IoT permite el cumplimiento normativo, reduce riesgos laborales,
    evita sanciones y mejora la cultura de prevención en la planta industrial.
  </p>
</section>


      {/* Indicadores circulares */}
      <div className="dashboard-row">
        <div style={{ textAlign: "center" }}>
          <Gauge
            value={datos.temperatura ?? 0}
            max={50}
            label="°C"
            color="#f97316"
          />
          <p style={{ marginTop: "10px", color: "#fff" }}>Temperatura</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <Gauge
            value={datos.humedad ?? 0}
            max={100}
            label="%"
            color="#3b82f6"
          />
          <p style={{ marginTop: "10px", color: "#fff" }}>Humedad</p>
        </div>
      </div>

      {/* Alertas normativas */}
      <div className="dashboard-row">
        {datos.valor_sonido > 0.6 && (
          <NormaAlert
            tipo="⚠️ Ruido excesivo"
            mensaje="Se ha superado el nivel recomendado de ruido (NOM-081 y NOM-025)."
            nivel={datos.valor_sonido}
            color="#facc15"
          />
        )}
        {datos.valor_gas === 1 && (
          <NormaAlert
            tipo="🔥 Gas detectado"
            mensaje="Presencia de gas detectada. Verifica ventilación y protocolos de seguridad (NOM-022)."
            nivel={datos.valor_gas}
            color="#ef4444"
          />
        )}
      </div>

      {/* Estados de sensores */}
      <div className="dashboard-row">
        <StatusBadge
          label="Estado del sonido"
          value={datos.sonido}
          icon={datos.sonido === "Ruido" ? "💥" : "😴"}
          color={datos.sonido === "Ruido" ? "#dc2626" : "#22c55e"}
        />
        <StatusBadge
          label="Estado del gas"
          value={datos.gas}
          icon={datos.valor_gas === 1 ? "🔥" : "✅"}
          color={datos.valor_gas === 1 ? "#f87171" : "#34d399"}
        />
      </div>

      {/* Barras de valores digitales */}
      <div className="dashboard-row">
        <ValueBar
          label="Nivel digital de sonido"
          value={datos.valor_sonido ?? 0}
          color="#a78bfa"
        />
        <ValueBar
          label="Nivel digital de gas"
          value={datos.valor_gas ?? 0}
          color="#60a5fa"
        />
      </div>

      {/* Tarjetas informativas */}
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
          title="Estado del sonido"
          value={datos.sonido}
          unit=""
          icon={datos.sonido === "Ruido" ? "💥" : "😴"}
          color={datos.sonido === "Ruido" ? "#dc2626" : "#9ca3af"}
        />
        <SensorCard
          title="Valor digital sonido"
          value={datos.valor_sonido}
          unit=""
          icon="📶"
          color="#a78bfa"
        />
        <SensorCard
          title="Estado del gas"
          value={datos.gas}
          unit=""
          icon={datos.valor_gas === 1 ? "🔥" : "✅"}
          color={datos.valor_gas === 1 ? "#f87171" : "#34d399"}
        />
        <SensorCard
          title="Valor digital gas"
          value={datos.valor_gas}
          unit=""
          icon="📊"
          color="#60a5fa"
        />
      </div>

      {/* Panel de cumplimiento normativo */}
      <NormasPanel datos={datos} />

      {/* Gráficas en tiempo real */}
      <div className="dashboard-row">
        <RealTimeChart
          data={historicoTemp}
          label="Temperatura (°C)"
          color="#f97316"
        />
        <RealTimeChart
          data={historicoHumedad}
          label="Humedad (%)"
          color="#3b82f6"
        />
      </div>

      {/* Pie de página */}
      <footer>
        © 2025 Sistema IoT | Desarrollado por Samuel Alejandro y Jaime Zermeño
      </footer>
    </div>
  );
}

export default App;

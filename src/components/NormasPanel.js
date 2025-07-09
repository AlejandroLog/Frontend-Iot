import React from "react";
import "./NormasPanel.css";

const NormasPanel = ({ datos }) => {
  const now = new Date().toLocaleTimeString();

  const cumpleRuido = datos.valor_sonido <= 0.6;
  const cumpleGas = datos.valor_gas !== 1;
  const cumpleTempHum = datos.temperatura < 40 && datos.humedad < 80;

  return (
    <div className="normas-panel">
      <h2>📋 Cumplimiento Normativo</h2>
      <table>
        <thead>
          <tr>
            <th>Norma</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Última actualización</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NOM-081</td>
            <td>Ruido ambiental máximo permitido</td>
            <td className={cumpleRuido ? "ok" : "alerta"}>
              {cumpleRuido ? "✅ Cumple" : "❌ Ruido excesivo"}
            </td>
            <td>{now}</td>
          </tr>
          <tr>
            <td>NOM-025</td>
            <td>Condiciones de entorno laboral</td>
            <td className={cumpleTempHum ? "ok" : "alerta"}>
              {cumpleTempHum ? "✅ Cumple" : "❌ Fuera de rango"}
            </td>
            <td>{now}</td>
          </tr>
          <tr>
            <td>NOM-022</td>
            <td>Prevención de atmósferas explosivas</td>
            <td className={cumpleGas ? "ok" : "alerta"}>
              {cumpleGas ? "✅ Sin gas" : "❌ Gas detectado"}
            </td>
            <td>{now}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NormasPanel;

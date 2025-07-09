// archivo: backend/index.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "TU_USUARIO",
    password: "TU_CONTRASEÑA",
    database: "iot_db"
  });
}

app.post("/api/guardar-lectura", async (req, res) => {
  const { temperatura, humedad, sonido, valor_sonido, gas, valor_gas } = req.body;

  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO lecturas_iot
       (timestamp, temperatura, humedad, sonido, valor_sonido, gas, valor_gas)
       VALUES (NOW(), ?, ?, ?, ?, ?, ?)`,
      [temperatura, humedad, sonido, valor_sonido, gas, valor_gas]
    );
    await conn.end();
    res.json({ status: "ok" });
  } catch (error) {
    console.error("❌ Error guardando:", error);
    res.status(500).json({ error: "Error guardando en la base de datos" });
  }
});

app.listen(5000, () => console.log("Servidor backend corriendo en puerto 5000"));

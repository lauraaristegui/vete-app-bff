require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("✅ Conexión a PostgreSQL exitosa");
    console.log("Fecha desde Neon:", result.rows[0].now);
  } catch (error) {
    console.error("❌ Error conectando a PostgreSQL:", error);
  } finally {
    await pool.end();
  }
}

testConnection();
require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        dni TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        address TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS pets (
        id SERIAL PRIMARY KEY,
        client_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        species TEXT NOT NULL,
        breed TEXT,
        age TEXT,
        CONSTRAINT fk_pets_client
          FOREIGN KEY (client_id)
          REFERENCES clients(id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        pet_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        veterinarian TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        CONSTRAINT fk_appointments_pet
          FOREIGN KEY (pet_id)
          REFERENCES pets(id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id SERIAL PRIMARY KEY,
        pet_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        reason TEXT NOT NULL,
        diagnosis TEXT NOT NULL,
        treatment TEXT,
        observations TEXT,
        CONSTRAINT fk_consultations_pet
          FOREIGN KEY (pet_id)
          REFERENCES pets(id)
      );
    `);

    console.log("✅ Tablas de PostgreSQL creadas correctamente");
  } catch (error) {
    console.error("❌ Error creando las tablas:", error);
  } finally {
    await pool.end();
  }
}

initializeDatabase();
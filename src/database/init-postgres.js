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
      CREATE TABLE IF NOT EXISTS veterinarians (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        active BOOLEAN NOT NULL DEFAULT TRUE
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

    // Agregamos la nueva columna veterinarian_id
    await pool.query(`
      ALTER TABLE appointments
      ADD COLUMN IF NOT EXISTS veterinarian_id INTEGER;
    `);

    // Relacionamos appointments con veterinarians
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'fk_appointments_veterinarian'
        ) THEN
          ALTER TABLE appointments
          ADD CONSTRAINT fk_appointments_veterinarian
            FOREIGN KEY (veterinarian_id)
            REFERENCES veterinarians(id);
        END IF;
      END $$;
    `);

    // Migramos los turnos existentes.
    // Busca el veterinario por nombre y guarda su id.
    await pool.query(`
      UPDATE appointments
      SET veterinarian_id = veterinarians.id
      FROM veterinarians
      WHERE appointments.veterinarian = veterinarians.name
        AND appointments.veterinarian_id IS NULL;
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
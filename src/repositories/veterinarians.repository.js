const { pool } = require("../database/postgres");

async function getVeterinarians() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      active
    FROM veterinarians
    ORDER BY name
  `);

  return result.rows.map((veterinarian) => ({
    id: String(veterinarian.id),
    name: veterinarian.name,
    active: veterinarian.active,
  }));
}

async function createVeterinarian(veterinarianData) {
  const result = await pool.query(
    `
      INSERT INTO veterinarians (
        name,
        active
      )
      VALUES ($1, $2)
      RETURNING
        id,
        name,
        active
    `,
    [
      veterinarianData.name,
      veterinarianData.active ?? true,
    ],
  );

  const veterinarian = result.rows[0];

  return {
    id: String(veterinarian.id),
    name: veterinarian.name,
    active: veterinarian.active,
  };
}

module.exports = {
  getVeterinarians,
  createVeterinarian,
};
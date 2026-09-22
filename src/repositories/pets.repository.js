const { pool } = require("../database/postgres");

async function getPetById(petId) {
  const result = await pool.query(
    `
      SELECT
        id,
        client_id,
        name,
        species,
        breed,
        age
      FROM pets
      WHERE id = $1
    `,
    [petId],
  );

  const pet = result.rows[0];

  if (!pet) {
    return undefined;
  }

  return {
    id: String(pet.id),
    clientId: String(pet.client_id),
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age: pet.age,
  };
}

async function updatePet(petId, petData) {
  const currentPetResult = await pool.query(
    `
      SELECT *
      FROM pets
      WHERE id = $1
    `,
    [petId],
  );

  const currentPet = currentPetResult.rows[0];

  if (!currentPet) {
    return undefined;
  }

  const updatedPet = {
    ...currentPet,
    ...petData,
  };

  await pool.query(
    `
      UPDATE pets
      SET
        name = $1,
        species = $2,
        breed = $3,
        age = $4
      WHERE id = $5
    `,
    [
      updatedPet.name,
      updatedPet.species,
      updatedPet.breed,
      updatedPet.age,
      petId,
    ],
  );

  return await getPetById(petId);
}

module.exports = {
  getPetById,
  updatePet,
};
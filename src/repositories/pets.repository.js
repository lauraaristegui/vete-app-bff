
const { database } = require("../database/database");
function getPetById(petId) {
  const pet = database
    .prepare(`
      SELECT
        id,
        client_id,
        name,
        species,
        breed,
        age
      FROM pets
      WHERE id = ?
    `)
    .get(petId);

  if (!pet) {
    return undefined;
  }

  return {
    ...pet,
    id: String(pet.id),
    clientId: String(pet.client_id),
  };
}

function updatePet(petId, petData) {
  const currentPet = database
    .prepare(`
      SELECT * FROM pets
      WHERE id = ?
    `)
    .get(petId);

  if (!currentPet) {
    return undefined;
  }

  const updatedPet = {
    ...currentPet,
    ...petData,
  };

  database
    .prepare(`
      UPDATE pets
      SET
        name = ?,
        species = ?,
        breed = ?,
        age = ?
      WHERE id = ?
    `)
    .run(
      updatedPet.name,
      updatedPet.species,
      updatedPet.breed,
      updatedPet.age,
      petId,
    );

  return getPetById(petId);
}
module.exports = {
  getPetById,
  updatePet,
};
const petsRepository = require("../repositories/pets.repository");

async function getPetById(petId) {
  return await petsRepository.getPetById(petId);
}

async function updatePet(petId, petData) {
  return await petsRepository.updatePet(petId, petData);
}

module.exports = {
  getPetById,
  updatePet,
};
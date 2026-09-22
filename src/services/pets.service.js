const petsRepository = require("../repositories/pets.repository");

function getPetById(petId) {
  return petsRepository.getPetById(petId);
}

function updatePet(petId, petData) {
  return petsRepository.updatePet(petId, petData);
}

module.exports = {
  getPetById,
  updatePet,
};
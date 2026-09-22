

const petsService = require("../services/pets.service");

function getPetById(request, response) {
  const { petId } = request.params;

  const pet = petsService.getPetById(petId);

  if (!pet) {
    return response.status(404).json({
      message: "Mascota no encontrada",
    });
  }

  response.status(200).json(pet);
}

function updatePet(request, response) {
  const { petId } = request.params;
  const petData = request.body;

  const updatedPet = petsService.updatePet(petId, petData);

  if (!updatedPet) {
    return response.status(404).json({
      message: "No se puede actualizar. Mascota no encontrada",
    });
  }

  response.status(200).json(updatedPet);
}

module.exports = {
  getPetById,
  updatePet,
};
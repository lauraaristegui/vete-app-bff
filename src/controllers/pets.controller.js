const petsService = require("../services/pets.service");

async function getPetById(request, response) {
  try {
    const { petId } = request.params;

    const pet = await petsService.getPetById(petId);

    if (!pet) {
      return response.status(404).json({
        message: "Mascota no encontrada",
      });
    }

    response.status(200).json(pet);
  } catch (error) {
    console.error("Error obteniendo mascota:", error);

    response.status(500).json({
      message: "Error al obtener la mascota",
    });
  }
}

async function updatePet(request, response) {
  try {
    const { petId } = request.params;
    const petData = request.body;

    const updatedPet = await petsService.updatePet(
      petId,
      petData,
    );

    if (!updatedPet) {
      return response.status(404).json({
        message: "No se puede actualizar. Mascota no encontrada",
      });
    }

    response.status(200).json(updatedPet);
  } catch (error) {
    console.error("Error actualizando mascota:", error);

    response.status(500).json({
      message: "Error al actualizar la mascota",
    });
  }
}

module.exports = {
  getPetById,
  updatePet,
};
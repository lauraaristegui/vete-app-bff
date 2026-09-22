const veterinariansRepository = require(
  "../repositories/veterinarians.repository",
);

async function getVeterinarians() {
  return await veterinariansRepository.getVeterinarians();
}

async function createVeterinarian(veterinarianData) {
  if (!veterinarianData.name?.trim()) {
    throw new Error("El nombre del veterinario es obligatorio");
  }

  return await veterinariansRepository.createVeterinarian({
    name: veterinarianData.name.trim(),
    active: veterinarianData.active ?? true,
  });
}

module.exports = {
  getVeterinarians,
  createVeterinarian,
};
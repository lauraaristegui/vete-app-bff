const veterinariansService = require(
  "../services/veterinarians.service",
);

async function getVeterinarians(req, res) {
  try {
    const veterinarians =
      await veterinariansService.getVeterinarians();

    res.json(veterinarians);
  } catch (error) {
    console.error("Error obteniendo veterinarios:", error);

    res.status(500).json({
      message: "Error obteniendo veterinarios",
    });
  }
}

async function createVeterinarian(req, res) {
  try {
    const veterinarian =
      await veterinariansService.createVeterinarian(req.body);

    res.status(201).json(veterinarian);
  } catch (error) {
    console.error("Error creando veterinario:", error);

    if (error.message === "El nombre del veterinario es obligatorio") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Error creando veterinario",
    });
  }
}

module.exports = {
  getVeterinarians,
  createVeterinarian,
};
const clientsService = require("../services/clients.service");

async function getClients(request, response) {
  try {
    const clients = await clientsService.getClients();

    response.status(200).json(clients);
  } catch (error) {
    console.error("Error obteniendo clientes:", error);

    response.status(500).json({
      message: "Error al obtener los clientes",
    });
  }
}

async function getClientById(request, response) {
  try {
    const { id } = request.params;

    const client = await clientsService.getClientById(id);

    if (!client) {
      return response.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    response.status(200).json(client);
  } catch (error) {
    console.error("Error obteniendo cliente:", error);

    response.status(500).json({
      message: "Error al obtener el cliente",
    });
  }
}

async function createClient(request, response) {
  try {
    const clientData = request.body;

    const newClient = await clientsService.createClient(clientData);

    response.status(201).json(newClient);
  } catch (error) {
    console.error("Error creando cliente:", error);

    response.status(500).json({
      message: "Error al crear el cliente",
    });
  }
}

async function updateClient(request, response) {
  try {
    const { id } = request.params;
    const clientData = request.body;

    const updatedClient = await clientsService.updateClient(
      id,
      clientData,
    );

    if (!updatedClient) {
      return response.status(404).json({
        message: "No se puede actualizar. Cliente no encontrado",
      });
    }

    response.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error actualizando cliente:", error);

    response.status(500).json({
      message: "Error al actualizar el cliente",
    });
  }
}

async function addPet(request, response) {
  try {
    const { clientId } = request.params;
    const petData = request.body;

    const newPet = await clientsService.addPet(
      clientId,
      petData,
    );

    if (!newPet) {
      return response.status(404).json({
        message: "No se puede agregar la mascota. Cliente no encontrado",
      });
    }

    response.status(201).json(newPet);
  } catch (error) {
    console.error("Error agregando mascota:", error);

    response.status(500).json({
      message: "Error al agregar la mascota",
    });
  }
}

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  addPet,
};
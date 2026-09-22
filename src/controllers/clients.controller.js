const clientsService = require("../services/clients.service");

function getClients(request, response) {
  const clients = clientsService.getClients();

  response.status(200).json(clients);
}

function getClientById(request, response) {
  const { id } = request.params;

  const client = clientsService.getClientById(id);

  if (!client) {
    return response.status(404).json({
      message: "Cliente no encontrado",
    });
  }

  response.status(200).json(client);
}

function createClient(request, response) {
  const clientData = request.body;

  const newClient = clientsService.createClient(clientData);

  response.status(201).json(newClient);
}

function updateClient(request, response) {
  const { id } = request.params;
  const clientData = request.body;

  const updatedClient = clientsService.updateClient(id, clientData);

  if (!updatedClient) {
    return response.status(404).json({
      message: "No se puede actualizar. Cliente no encontrado",
    });
  }

  response.status(200).json(updatedClient);
}

function addPet(request, response) {
  const { clientId } = request.params;
  const petData = request.body;

  const newPet = clientsService.addPet(clientId, petData);

  if (!newPet) {
    return response.status(404).json({
      message: "No se puede agregar la mascota. Cliente no encontrado",
    });
  }

  response.status(201).json(newPet);
}

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  addPet,
};
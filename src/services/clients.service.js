const clientsRepository = require("../repositories/clients.repository");

function getClients() {
  return clientsRepository.getClients();
}

function getClientById(id) {
  return clientsRepository.getClientById(id);
}

function createClient(clientData) {
  return clientsRepository.createClient(clientData);
}

function updateClient(id, clientData) {
  return clientsRepository.updateClient(id, clientData);
}

function addPet(clientId, petData) {
  const client = clientsRepository.getClientById(clientId);

  if (!client) {
    return undefined;
  }

  return clientsRepository.addPet(clientId, petData);
}

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  addPet,
};
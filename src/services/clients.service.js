const clientsRepository = require("../repositories/clients.repository");

async function getClients() {
  return await clientsRepository.getClients();
}

async function getClientById(id) {
  return await clientsRepository.getClientById(id);
}

async function createClient(clientData) {
  return await clientsRepository.createClient(clientData);
}

async function updateClient(id, clientData) {
  return await clientsRepository.updateClient(id, clientData);
}

async function addPet(clientId, petData) {
  const client = await clientsRepository.getClientById(clientId);

  if (!client) {
    return undefined;
  }

  return await clientsRepository.addPet(clientId, petData);
}

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  addPet,
};
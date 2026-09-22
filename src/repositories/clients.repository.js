const { database } = require("../database/database");

function getClients() {
  const clients = database
    .prepare(`
      SELECT * FROM clients
    `)
    .all();

  return clients.map((client) => {
    const pets = database
      .prepare(`
        SELECT
          id,
          name,
          species,
          breed,
          age
        FROM pets
        WHERE client_id = ?
      `)
      .all(client.id);

    return {
      ...client,
      id: String(client.id),
      pets: pets.map((pet) => ({
        ...pet,
        id: String(pet.id),
      })),
    };
  });
}

function getClientById(id) {
  const client = database
    .prepare(`
      SELECT * FROM clients
      WHERE id = ?
    `)
    .get(id);

  if (!client) {
    return undefined;
  }

  const pets = database
    .prepare(`
      SELECT
        id,
        name,
        species,
        breed,
        age
      FROM pets
      WHERE client_id = ?
    `)
    .all(id);

  return {
    ...client,
    id: String(client.id),
    pets: pets.map((pet) => ({
      ...pet,
      id: String(pet.id),
    })),
  };
}

function createClient(clientData) {
  const statement = database.prepare(`
    INSERT INTO clients (name, dni, phone, email, address)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    clientData.name,
    clientData.dni,
    clientData.phone,
    clientData.email,
    clientData.address,
  );

  return {
    id: String(result.lastInsertRowid),
    ...clientData,
    pets: [],
  };
}

function updateClient(id, clientData) {
  const currentClient = database
    .prepare(`
      SELECT * FROM clients
      WHERE id = ?
    `)
    .get(id);

  if (!currentClient) {
    return undefined;
  }

  const updatedClient = {
    ...currentClient,
    ...clientData,
  };

  database
    .prepare(`
      UPDATE clients
      SET
        name = ?,
        dni = ?,
        phone = ?,
        email = ?,
        address = ?
      WHERE id = ?
    `)
    .run(
      updatedClient.name,
      updatedClient.dni,
      updatedClient.phone,
      updatedClient.email,
      updatedClient.address,
      id,
    );

  return getClientById(id);
}

function addPet(clientId, petData) {
  const statement = database.prepare(`
    INSERT INTO pets (client_id, name, species, breed, age)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    clientId,
    petData.name,
    petData.species,
    petData.breed,
    petData.age,
  );

  return {
    id: String(result.lastInsertRowid),
    clientId,
    ...petData,
  };
}

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  addPet,
};
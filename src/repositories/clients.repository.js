const { pool } = require("../database/postgres");

async function getClients() {
  const clientsResult = await pool.query(`
    SELECT *
    FROM clients
    ORDER BY id
  `);

  const clients = clientsResult.rows;

  const clientsWithPets = await Promise.all(
    clients.map(async (client) => {
      const petsResult = await pool.query(
        `
          SELECT
            id,
            name,
            species,
            breed,
            age
          FROM pets
          WHERE client_id = $1
          ORDER BY id
        `,
        [client.id],
      );

      return {
        ...client,
        id: String(client.id),
        pets: petsResult.rows.map((pet) => ({
          ...pet,
          id: String(pet.id),
        })),
      };
    }),
  );

  return clientsWithPets;
}

async function getClientById(id) {
  const clientResult = await pool.query(
    `
      SELECT *
      FROM clients
      WHERE id = $1
    `,
    [id],
  );

  const client = clientResult.rows[0];

  if (!client) {
    return undefined;
  }

  const petsResult = await pool.query(
    `
      SELECT
        id,
        name,
        species,
        breed,
        age
      FROM pets
      WHERE client_id = $1
      ORDER BY id
    `,
    [id],
  );

  return {
    ...client,
    id: String(client.id),
    pets: petsResult.rows.map((pet) => ({
      ...pet,
      id: String(pet.id),
    })),
  };
}

async function createClient(clientData) {
  const result = await pool.query(
    `
      INSERT INTO clients (
        name,
        dni,
        phone,
        email,
        address
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [
      clientData.name,
      clientData.dni,
      clientData.phone,
      clientData.email,
      clientData.address,
    ],
  );

  const client = result.rows[0];

  return {
    ...client,
    id: String(client.id),
    pets: [],
  };
}

async function updateClient(id, clientData) {
  const currentClientResult = await pool.query(
    `
      SELECT *
      FROM clients
      WHERE id = $1
    `,
    [id],
  );

  const currentClient = currentClientResult.rows[0];

  if (!currentClient) {
    return undefined;
  }

  const updatedClient = {
    ...currentClient,
    ...clientData,
  };

  await pool.query(
    `
      UPDATE clients
      SET
        name = $1,
        dni = $2,
        phone = $3,
        email = $4,
        address = $5
      WHERE id = $6
    `,
    [
      updatedClient.name,
      updatedClient.dni,
      updatedClient.phone,
      updatedClient.email,
      updatedClient.address,
      id,
    ],
  );

  return getClientById(id);
}

async function addPet(clientId, petData) {
  const result = await pool.query(
    `
      INSERT INTO pets (
        client_id,
        name,
        species,
        breed,
        age
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [
      clientId,
      petData.name,
      petData.species,
      petData.breed,
      petData.age,
    ],
  );

  const pet = result.rows[0];

  return {
    id: String(pet.id),
    clientId: String(pet.client_id),
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age: pet.age,
  };
}

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  addPet,
};
function addPet(clientId, petData) {
  const client = clients.find((client) => client.id === clientId);

  if (!client) {
    return undefined;
  }

  const allPets = clients.flatMap((client) => client.pets ?? []);

  const newPet = {
    id: String(allPets.length + 1),
    ...petData,
  };

  client.pets.push(newPet);

  return newPet;
}
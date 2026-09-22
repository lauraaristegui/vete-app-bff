const { database } = require("./database");

const clients = database
  .prepare(`
    SELECT * FROM clients
  `)
  .all();

console.log("Clientes guardados en SQLite:");
console.log(clients);
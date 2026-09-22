const { DatabaseSync } = require("node:sqlite");

const database = new DatabaseSync("veteapp.db");

database.exec("PRAGMA foreign_keys = ON;");

database.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    dni TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT
  )
`);

database.exec(`
  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    breed TEXT,
    age TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id)
  )
`);

database.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pet_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    veterinarian TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    FOREIGN KEY (pet_id) REFERENCES pets(id)
  )
`);

database.exec(`
  CREATE TABLE IF NOT EXISTS consultations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pet_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    reason TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    treatment TEXT,
    observations TEXT,
    FOREIGN KEY (pet_id) REFERENCES pets(id)
  )
`);

module.exports = {
  database,
};
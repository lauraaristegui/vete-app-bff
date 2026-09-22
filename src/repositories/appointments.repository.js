const { database } = require("../database/database");

function getAppointments() {
  const appointments = database
    .prepare(`
      SELECT
        appointments.id,
        appointments.pet_id,
        appointments.date,
        appointments.time,
        appointments.veterinarian,
        appointments.status,

        pets.name AS pet_name,
        pets.species,

        clients.name AS owner_name,
        clients.dni

      FROM appointments

      JOIN pets
        ON appointments.pet_id = pets.id

      JOIN clients
        ON pets.client_id = clients.id

      ORDER BY appointments.date, appointments.time
    `)
    .all();

  return appointments.map((appointment) => ({
    id: String(appointment.id),
    petId: String(appointment.pet_id),
    date: appointment.date,
    time: appointment.time,
    veterinarian: appointment.veterinarian,
    status: appointment.status,

    petName: appointment.pet_name,
    species: appointment.species,

    ownerName: appointment.owner_name,
    dni: appointment.dni,
  }));
}

function getAppointmentById(id) {
  const appointment = database
    .prepare(`
      SELECT
        appointments.id,
        appointments.pet_id,
        appointments.date,
        appointments.time,
        appointments.veterinarian,
        appointments.status,

        pets.name AS pet_name,
        pets.species,

        clients.name AS owner_name,
        clients.dni

      FROM appointments

      JOIN pets
        ON appointments.pet_id = pets.id

      JOIN clients
        ON pets.client_id = clients.id

      WHERE appointments.id = ?
    `)
    .get(id);

  if (!appointment) {
    return undefined;
  }

  return {
    id: String(appointment.id),
    petId: String(appointment.pet_id),
    date: appointment.date,
    time: appointment.time,
    veterinarian: appointment.veterinarian,
    status: appointment.status,
    petName: appointment.pet_name,
    species: appointment.species,
    ownerName: appointment.owner_name,
    dni: appointment.dni,
  };
}

function createAppointment(appointmentData) {
  const statement = database.prepare(`
    INSERT INTO appointments (
      pet_id,
      date,
      time,
      veterinarian,
      status
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    appointmentData.petId,
    appointmentData.date,
    appointmentData.time,
    appointmentData.veterinarian,
    appointmentData.status ?? "pending",
  );

  return getAppointmentById(result.lastInsertRowid);
}

function updateAppointmentStatus(id, status) {
  const statement = database.prepare(`
    UPDATE appointments
    SET status = ?
    WHERE id = ?
  `);

  const result = statement.run(status, id);

  if (result.changes === 0) {
    return undefined;
  }

  return getAppointmentById(id);
}

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentStatus,
};
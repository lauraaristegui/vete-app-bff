const { pool } = require("../database/postgres");

async function getAppointments() {
  const result = await pool.query(`
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
  `);

  return result.rows.map((appointment) => ({
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

async function getAppointmentById(id) {
  const result = await pool.query(
    `
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

      WHERE appointments.id = $1
    `,
    [id],
  );

  const appointment = result.rows[0];

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

async function createAppointment(appointmentData) {
  const result = await pool.query(
    `
      INSERT INTO appointments (
        pet_id,
        date,
        time,
        veterinarian,
        status
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `,
    [
      appointmentData.petId,
      appointmentData.date,
      appointmentData.time,
      appointmentData.veterinarian,
      appointmentData.status ?? "pending",
    ],
  );

  return await getAppointmentById(result.rows[0].id);
}

async function updateAppointmentStatus(id, status) {
  const result = await pool.query(
    `
      UPDATE appointments
      SET status = $1
      WHERE id = $2
      RETURNING id
    `,
    [status, id],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return await getAppointmentById(id);
}

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentStatus,
};
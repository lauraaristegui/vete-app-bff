const {
  getAllAppointments,
  addAppointment,
  changeAppointmentStatus,
} = require("../services/appointments.service");

const VALID_APPOINTMENT_STATUSES = [
  "pending",
  "received",
  "in-consultation",
  "completed",
  "no-show",
  "cancelled",
];

async function getAppointments(req, res) {
  try {
    const appointments = await getAllAppointments();

    res.json(appointments);
  } catch (error) {
    console.error("Error obteniendo turnos:", error);

    res.status(500).json({
      message: "Error al obtener los turnos",
    });
  }
}

async function createAppointment(req, res) {
  try {
    const appointmentData = req.body;

    const appointment = await addAppointment(appointmentData);

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error creando turno:", error);

    res.status(500).json({
      message: "Error al crear el turno",
    });
  }
}

async function updateAppointmentStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!VALID_APPOINTMENT_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Estado de turno inválido",
      });
    }

    const appointment = await changeAppointmentStatus(
      id,
      status,
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Turno no encontrado",
      });
    }

    res.json(appointment);
  } catch (error) {
    console.error("Error actualizando estado del turno:", error);

    res.status(500).json({
      message: "Error al actualizar el estado del turno",
    });
  }
}

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
};
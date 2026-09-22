const {
  getAllAppointments,
  addAppointment,
  changeAppointmentStatus
} = require("../services/appointments.service");


function getAppointments(req, res) {
  const appointments = getAllAppointments();

  res.json(appointments);
}

function createAppointment(req, res) {
  const appointmentData = req.body;

  const appointment = addAppointment(appointmentData);

  res.status(201).json(appointment);
}

function updateAppointmentStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const appointment = changeAppointmentStatus(id, status);

  if (!appointment) {
    return res.status(404).json({
      message: "Turno no encontrado",
    });
  }

  res.json(appointment);
}

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
};
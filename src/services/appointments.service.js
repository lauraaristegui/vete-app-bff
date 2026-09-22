const {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
} = require("../repositories/appointments.repository");


function getAllAppointments() {
  return getAppointments();
}

function addAppointment(appointmentData) {
  return createAppointment(appointmentData);
}

function changeAppointmentStatus(id, status) {
  return updateAppointmentStatus(id, status);
}

module.exports = {
  getAllAppointments,
  addAppointment,
  changeAppointmentStatus,
};
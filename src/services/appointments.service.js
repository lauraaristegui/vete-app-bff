const {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
} = require("../repositories/appointments.repository");

async function getAllAppointments() {
  return await getAppointments();
}

async function addAppointment(appointmentData) {
  return await createAppointment(appointmentData);
}

async function changeAppointmentStatus(id, status) {
  return await updateAppointmentStatus(id, status);
}

module.exports = {
  getAllAppointments,
  addAppointment,
  changeAppointmentStatus,
};
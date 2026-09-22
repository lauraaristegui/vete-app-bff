const {
  getConsultations,
  createConsultation,
} = require("../repositories/consultations.repository");

function getAllConsultations() {
  return getConsultations();
}

function addConsultation(consultationData) {
  return createConsultation(consultationData);
}

module.exports = {
  getAllConsultations,
  addConsultation,
};
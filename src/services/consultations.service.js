const {
  getConsultations,
  createConsultation,
} = require("../repositories/consultations.repository");

async function getAllConsultations() {
  return await getConsultations();
}

async function addConsultation(consultationData) {
  return await createConsultation(consultationData);
}

module.exports = {
  getAllConsultations,
  addConsultation,
};
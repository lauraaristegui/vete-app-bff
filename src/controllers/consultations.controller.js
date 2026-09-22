const {
  getAllConsultations,
  addConsultation,
} = require("../services/consultations.service");

function getConsultations(req, res) {
  const consultations = getAllConsultations();

  res.json(consultations);
}

function createConsultation(req, res) {
  const consultationData = req.body;

  const consultation = addConsultation(consultationData);

  res.status(201).json(consultation);
}

module.exports = {
  getConsultations,
  createConsultation,
};
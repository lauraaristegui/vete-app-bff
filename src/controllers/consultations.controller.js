const {
  getAllConsultations,
  addConsultation,
} = require("../services/consultations.service");

async function getConsultations(req, res) {
  try {
    const consultations = await getAllConsultations();

    res.json(consultations);
  } catch (error) {
    console.error("Error obteniendo consultas:", error);

    res.status(500).json({
      message: "Error al obtener las consultas",
    });
  }
}

async function createConsultation(req, res) {
  try {
    const consultationData = req.body;

    const consultation = await addConsultation(consultationData);

    res.status(201).json(consultation);
  } catch (error) {
    console.error("Error creando consulta:", error);

    res.status(500).json({
      message: "Error al crear la consulta",
    });
  }
}

module.exports = {
  getConsultations,
  createConsultation,
};
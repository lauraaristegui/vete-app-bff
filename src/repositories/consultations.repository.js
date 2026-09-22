const { pool } = require("../database/postgres");

async function getConsultations() {
  const result = await pool.query(`
    SELECT
      id,
      pet_id,
      date,
      reason,
      diagnosis,
      treatment,
      observations
    FROM consultations
    ORDER BY date DESC
  `);

  return result.rows.map((consultation) => ({
    id: String(consultation.id),
    petId: String(consultation.pet_id),
    date: consultation.date,
    reason: consultation.reason,
    diagnosis: consultation.diagnosis,
    treatment: consultation.treatment ?? "",
    observations: consultation.observations ?? "",
  }));
}

async function createConsultation(consultationData) {
  const result = await pool.query(
    `
      INSERT INTO consultations (
        pet_id,
        date,
        reason,
        diagnosis,
        treatment,
        observations
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
    [
      consultationData.petId,
      consultationData.date,
      consultationData.reason,
      consultationData.diagnosis,
      consultationData.treatment ?? "",
      consultationData.observations ?? "",
    ],
  );

  const consultation = result.rows[0];

  return {
    id: String(consultation.id),
    petId: String(consultation.pet_id),
    date: consultation.date,
    reason: consultation.reason,
    diagnosis: consultation.diagnosis,
    treatment: consultation.treatment ?? "",
    observations: consultation.observations ?? "",
  };
}

module.exports = {
  getConsultations,
  createConsultation,
};
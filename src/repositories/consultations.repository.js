const { database } = require("../database/database");

function getConsultations() {
  const consultations = database
    .prepare(`
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
    `)
    .all();

  return consultations.map((consultation) => ({
    id: String(consultation.id),
    petId: String(consultation.pet_id),
    date: consultation.date,
    reason: consultation.reason,
    diagnosis: consultation.diagnosis,
    treatment: consultation.treatment ?? "",
    observations: consultation.observations ?? "",
  }));
}

function createConsultation(consultationData) {
  const statement = database.prepare(`
    INSERT INTO consultations (
      pet_id,
      date,
      reason,
      diagnosis,
      treatment,
      observations
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    consultationData.petId,
    consultationData.date,
    consultationData.reason,
    consultationData.diagnosis,
    consultationData.treatment ?? "",
    consultationData.observations ?? "",
  );

  return {
    id: String(result.lastInsertRowid),
    petId: String(consultationData.petId),
    date: consultationData.date,
    reason: consultationData.reason,
    diagnosis: consultationData.diagnosis,
    treatment: consultationData.treatment ?? "",
    observations: consultationData.observations ?? "",
  };
}

module.exports = {
  getConsultations,
  createConsultation,
};
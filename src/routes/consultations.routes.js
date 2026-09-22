const express = require("express");

const {
  getConsultations,
  createConsultation,
} = require("../controllers/consultations.controller");

const router = express.Router();

router.get("/", getConsultations);
router.post("/", createConsultation);

module.exports = router;
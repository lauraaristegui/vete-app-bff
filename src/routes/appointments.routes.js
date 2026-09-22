const express = require("express");

const {
  getAppointments,
  createAppointment,
  updateAppointmentStatus
} = require("../controllers/appointments.controller");

const router = express.Router();

router.get("/", getAppointments);
router.post("/", createAppointment);
router.patch("/:id/status", updateAppointmentStatus);

module.exports = router;
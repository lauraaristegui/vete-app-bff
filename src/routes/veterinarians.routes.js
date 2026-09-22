const express = require("express");

const {
  getVeterinarians,
  createVeterinarian,
} = require("../controllers/veterinarians.controller");

const router = express.Router();

router.get("/", getVeterinarians);

router.post("/", createVeterinarian);

module.exports = router;
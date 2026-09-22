const express = require("express");

const {
  getPetById,
  updatePet,
} = require("../controllers/pets.controller");

const router = express.Router();

router.get("/:petId", getPetById);

router.patch("/:petId", updatePet);

module.exports = router;
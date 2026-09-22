const express = require("express");
const { getClients, getClientById, createClient, updateClient, addPet} = require("../controllers/clients.controller");

const router = express.Router();

router.get("/", getClients);
router.get("/:id", getClientById);
router.post("/", createClient);
router.patch("/:id", updateClient);
router.post("/:clientId/pets", addPet);

module.exports = router;
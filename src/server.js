const express = require("express");
const cors = require("cors");

const clientsRouter = require("./routes/clients.routes");
const petsRouter = require("./routes/pets.routes");
const appointmentsRouter = require("./routes/appointments.routes");
const consultationsRouter = require("./routes/consultations.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3002",
  }),
);

app.use(express.json());

app.use("/clients", clientsRouter);
app.use("/pets", petsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/consultations", consultationsRouter);
app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
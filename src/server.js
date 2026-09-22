const express = require("express");
const cors = require("cors");

const clientsRouter = require("./routes/clients.routes");
const petsRouter = require("./routes/pets.routes");
const appointmentsRouter = require("./routes/appointments.routes");
const consultationsRouter = require("./routes/consultations.routes");

const app = express();

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:3002",
  "https://vete-app.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(express.json());

app.use("/clients", clientsRouter);
app.use("/pets", petsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/consultations", consultationsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import apiRoutes from "./interfaces/http/routes/routes.js";
import { initFirebase } from "./config/firebase.js";
// import { PORT } from "./config/env.js";

initFirebase();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", apiRoutes);

// app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));

export const api = app;
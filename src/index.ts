import express from 'express';
import cors from 'cors';

import { PORT } from './config/env.js';
import { corsOptions } from './config/cors.js';
import apiRoutes from './interfaces/http/routes/routes.js';

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
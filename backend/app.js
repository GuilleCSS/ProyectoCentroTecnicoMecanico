const express = require('express');
const cors = require('cors');
require('./config/Database');

const vehiculosRoutes = require('./routes/vehiculos');
const citasRoutes = require('./routes/citas');
const clientesRoutes = require('./routes/clientes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Simplified CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use('/clientes', clientesRoutes);
app.use('/vehiculos', vehiculosRoutes);
app.use('/citas', citasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
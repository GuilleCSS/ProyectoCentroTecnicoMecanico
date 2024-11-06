const express = require('express');
const cors = require('cors'); // Importa el módulo de CORS
require('./config/Database'); // Importa la conexión a la base de datos

const vehiculosRoutes = require('./routes/vehiculos');
const citasRoutes = require('./routes/citas');
const clientesRoutes = require('./routes/clientes');

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: ['http://localhost:3000/clientes,http://localhost:3000/vehiculos, http://localhost:3000/citas'], // Cambia a los dominios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Habilita el envío de cookies y encabezados de autenticación
};

// Usa CORS con las opciones configuradas
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Rutas
app.use('/clientes', clientesRoutes);
app.use('/vehiculos', vehiculosRoutes);
app.use('/citas', citasRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));

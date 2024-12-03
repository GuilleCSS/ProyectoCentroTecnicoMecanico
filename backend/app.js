const express = require('express');
const cors = require('cors'); // Importa el módulo de CORS
require('./config/database'); // Importa la conexión a la base de datos

const vehiculosRoutes = require('./routes/vehiculos');
const citasRoutes = require('./routes/citas');
const clientesRoutes = require('./routes/clientes');

const app = express();

// Configuración del Middleware de Datos
app.use(express.urlencoded({ extended: true })); // Permite el manejo de datos URL codificados
 
app.use(express.json()); // Middleware para manejar JSON


// Configuración de CORS
// Rutas y métodos permitidos para `/clientes`
const corsOptionsClientes = {
  origin: 'http://localhost:3000', // Define el origen permitido
  methods: ['GET', 'POST', 'DELETE'], // Solo permite GET y POST para clientes
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Rutas y métodos permitidos para `/vehiculos`
const corsOptionsVehiculos = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'PUT', 'DELETE'], // Permite GET, PUT y DELETE para vehículos
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Rutas y métodos permitidos para `/citas`
const corsOptionsCitas = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'], // Permite GET, POST y DELETE para citas
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Aplica el middleware de CORS con opciones específicas en cada ruta

// Ruta para clientes
app.use('/clientes', cors(corsOptionsClientes), clientesRoutes);

// Ruta para vehículos
app.use('/vehiculos', cors(corsOptionsVehiculos), vehiculosRoutes);

// Ruta para citas
app.use('/citas', cors(corsOptionsCitas), citasRoutes);


// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));

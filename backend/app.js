// backend/app.js

const express = require('express');
const cors = require('cors');
require('./config/Database'); // Conexión a la base de datos

const vehiculosRoutes = require('./routes/vehiculos');
const citasRoutes = require('./routes/citas');
const clientesRoutes = require('./routes/clientes');
const authRoutes = require('./routes/clientesroutes');
const adminroutes = require('./routes/adminroutes');
const testimoniosRoutes = require('./routes/testimonios'); // Importar rutas de testimonios

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de CORS global
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Rutas de la API
app.use('/clientes', clientesRoutes);
app.use('/vehiculos', vehiculosRoutes);
app.use('/citas', citasRoutes);
app.use('/auth', authRoutes);
app.use('/adminroute', adminroutes);
app.use('/testimonios', testimoniosRoutes); // Usar la ruta de testimonios

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));

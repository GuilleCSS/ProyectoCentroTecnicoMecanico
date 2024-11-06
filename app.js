const express = require('express');
require('./config/Database'); // Importa la conexión a la base de datos
const vehiculosRoutes = require('./routes/vehiculos');
const citasRoutes = require('./routes/citas');
const clientesRoutes = require('./routes/clientes');

const app = express();
app.use(express.json());

// Rutas
app.use('/clientes', clientesRoutes);
app.use('/vehiculos', vehiculosRoutes);
app.use('/citas', citasRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));

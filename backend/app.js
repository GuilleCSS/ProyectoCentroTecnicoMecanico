// app.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Database');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Permite recibir JSON en las peticiones

// Conectar a la base de datos
connectDB();

// Ruta de prueba para verificar si la API está funcionando
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

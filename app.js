// app.js

// Importa la clase Database para iniciar la conexión a MongoDB
require('./config/Database');

// Resto de tu código de configuración y servidor
const express = require('express');
const app = express();

// Configuración y middlewares adicionales aquí
// ...

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});

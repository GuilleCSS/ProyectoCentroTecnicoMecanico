// Database.js

require('dotenv').config();
const mongoose = require('mongoose');

// Verificación de la carga de variables de entorno
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Construcción del URI con encodeURIComponent por si hay caracteres especiales en la contraseña
const uri = `mongodb+srv://angelsp:${encodeURIComponent(process.env.DB_PASSWORD)}@angelsp.t6vce.mongodb.net/${encodeURIComponent(process.env.DB_NAME)}?retryWrites=true&w=majority`;

// Conexión a MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB Atlas correctamente');
    } catch (error) {
        console.error('Error al conectar con MongoDB Atlas:', error.message);
        process.exit(1); // Termina el proceso si la conexión falla
    }
};

module.exports = connectDB;

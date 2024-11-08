const mongoose = require('mongoose');
require('dotenv').config();

// Cambia estos valores por los de tu conexión en MongoDB Atlas
const uri = `mongodb+srv://angelsp:${process.env.DB_PASSWORD}@angelsp.t6vce.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Angelsp`;

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Conexion de la base de datos satisfactoria');
            })
            .catch((err) => {
                console.error('Error en la conexion de la base de Datos:', err);
            });
    }
}

module.exports = new Database();

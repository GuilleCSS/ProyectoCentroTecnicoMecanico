const mongoose = require('mongoose');

// Cambia estos valores por los de tu conexión en MongoDB Atlas
const uri = "mongodb+srv://angelsp:admin@angelsp.t6vce.mongodb.net/?retryWrites=true&w=majority&appName=Angelsp";

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
                console.error('Error en la conexion de la base de datos:', err);
            });
    }
}

module.exports = new Database();

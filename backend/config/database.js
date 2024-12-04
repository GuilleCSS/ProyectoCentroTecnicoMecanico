const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

// Cambia estos valores por los de tu conexión en MongoDB Atlas
const uri = `mongodb+srv://angelsp:${process.env.DB_PASSWORD}@angelsp.t6vce.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(uri)
            .then(() => {
                console.log('Conexión a la base de datos satisfactoria');
            })
            .catch((err) => {
                console.error('Error en la conexión de la base de datos:', err);
            });
    }
}

module.exports = new Database();

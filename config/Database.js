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
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error('Database connection error:', err);
            });
    }
}

module.exports = new Database();

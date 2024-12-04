const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const uri = 'mongodb+srv://angelsp:admin@angelsp.t6vce.mongodb.net/Centro_tecnico?retryWrites=true&w=majority&appName=angelsp';

mongoose.connect(uri)
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));
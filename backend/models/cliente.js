const mongoose = require('mongoose'); // Asegúrate de importar mongoose

const clienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: String,
    correo: { type: String, unique: true },
    direccion: String,
    vehiculos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo' }],
    citas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cita' }]
  });
  
  module.exports = mongoose.model('Cliente', clienteSchema);
  
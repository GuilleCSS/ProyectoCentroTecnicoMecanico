const mongoose = require('mongoose');
const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: String,
  correo: { type: String, unique: true, required: true },
  direccion: String,
  password: { type: String, required: true },
  vehiculos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo' }],
  citas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cita' }],
});

module.exports = mongoose.model('Cliente', clienteSchema);

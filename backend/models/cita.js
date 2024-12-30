const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  servicio: String,
  estado: { type: String, enum: ['Pendiente', 'Completada', 'Cancelada'], default: 'Pendiente' },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo', required: true },
});

module.exports = mongoose.model('Cita', citaSchema);

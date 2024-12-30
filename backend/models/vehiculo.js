const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  numeroSerie: { type: String, required: true, unique: true },
  modelo: String,
  año: Number,
  marca: String,
  placas: String,
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);

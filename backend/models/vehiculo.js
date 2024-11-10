const mongoose = require('mongoose'); // Asegúrate de importar mongoose

const vehiculoSchema = new mongoose.Schema({
  numeroSerie: { type: String, required: true, unique: true },
  modelo: String,
  año: Number,
  marca: String,
  placas: String,
  kilometraje: Number,
  estado: String,
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' }
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);

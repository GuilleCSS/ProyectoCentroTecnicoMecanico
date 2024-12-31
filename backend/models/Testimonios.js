// backend/models/Testimonios.js

const mongoose = require('mongoose');

// Esquema de Testimonio
const testimonioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,  // Asegura que el nombre es obligatorio
    trim: true,      // Elimina los espacios antes y después del nombre
  },
  comentario: {
    type: String,
    required: true,  // Asegura que el comentario es obligatorio
    trim: true,      // Elimina los espacios antes y después del comentario
  },
  calificacion: {
    type: Number,
    required: true,  // Asegura que la calificación es obligatoria
    min: 1,          // La calificación mínima es 1
    max: 5,          // La calificación máxima es 5
  },
  fecha: {
    type: Date,
    default: Date.now,  // Establece la fecha actual por defecto
  },
});

// Crear el modelo de Mongoose
const Testimonio = mongoose.model('Testimonio', testimonioSchema);

module.exports = Testimonio;

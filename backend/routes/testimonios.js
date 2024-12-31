// backend/routes/testimonios.js

const express = require('express');
const Testimonio = require('../models/Testimonios'); // Importar el modelo de Testimonio
const router = express.Router();

// Obtener todos los testimonios (GET)
router.get('/', async (req, res) => {
  try {
    const testimonios = await Testimonio.find();  // Recuperar todos los testimonios
    res.json(testimonios);  // Enviar los testimonios como respuesta
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los testimonios' });
  }
});

// Agregar un nuevo testimonio (POST)
router.post('/', async (req, res) => {
  const { nombre, comentario, calificacion } = req.body;

  // Validar que todos los campos estén presentes
  if (!nombre || !comentario || !calificacion) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Crear un nuevo testimonio
    const nuevoTestimonio = new Testimonio({
      nombre,
      comentario,
      calificacion,
    });

    // Guardar el testimonio en la base de datos
    await nuevoTestimonio.save();

    res.status(201).json({ message: 'Testimonio agregado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar el testimonio' });
  }
});

module.exports = router;

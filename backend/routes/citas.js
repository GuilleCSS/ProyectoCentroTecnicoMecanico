const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');
const authMiddleware = require('../middlewares/auth');

// Ver citas (sin autenticación)
router.get('/', async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('cliente', 'nombre telefono correo')
      .populate('vehiculo', 'marca modelo placas');
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas', error });
  }
});

// Crear una nueva cita (requiere autenticación)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const citaExistente = await Cita.findOne({
      cliente: req.user.id,
      fecha: req.body.fecha,
    });
    if (citaExistente) {
      return res.status(400).json({ message: 'Ya tienes una cita para esta fecha.' });
    }

    const nuevaCita = new Cita({
      ...req.body,
      cliente: req.user.id, // Asigna automáticamente el ID del cliente autenticado
    });
    const cita = await nuevaCita.save();
    res.status(201).json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error });
  }
});

// Actualizar una cita por ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const citaActualizada = await Cita.findByIdAndUpdate(id, req.body, { new: true });
    if (!citaActualizada) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json(citaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita', error });
  }
});

// Eliminar una cita por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const citaEliminada = await Cita.findByIdAndDelete(id);
    if (!citaEliminada) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita', error });
  }
});

module.exports = router;

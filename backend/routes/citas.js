const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');

// Obtener todas las citas
router.get('/', async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('cliente', 'nombre telefono') // Solo los campos necesarios de cliente
      .populate('vehiculo', 'modelo marca placas'); // Solo los campos necesarios de vehículo
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas', error });
  }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
  try {
    const nuevaCita = new Cita(req.body);
    const cita = await nuevaCita.save();
    res.status(201).json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error });
  }
});

// Actualizar una cita
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const citaActualizada = await Cita.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(citaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita', error });
  }
});

// Eliminar una cita
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Cita.findByIdAndDelete(id);
    res.status(200).json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita', error });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');
const Cliente = require('../models/cliente');
const Vehiculo = require('../models/vehiculo');
const autenticarToken = require('../middlewares/auth');

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

// Endpoint protegido para registrar una cita
router.post('/generar', autenticarToken, async (req, res) => {
  const { fecha, servicio, vehiculoId } = req.body;

  try {
    // Verifica si el vehículo existe y pertenece al cliente autenticado
    const vehiculo = await Vehiculo.findOne({ _id: vehiculoId, cliente: req.user.id });
    if (!vehiculo) {
      return res.status(404).json({ message: 'El vehículo no pertenece al cliente autenticado.' });
    }

    // Crear la cita asociada al vehículo y al cliente autenticado
    const nuevaCita = new Cita({
      fecha,
      servicio,
      cliente: req.user.id, // Asociar la cita al cliente autenticado
      vehiculo: vehiculo._id, // Asociar la cita al vehículo
    });

    const citaCreada = await nuevaCita.save();

    // Actualiza el cliente para agregar la cita al array 'citas'
    await Cliente.findByIdAndUpdate(req.user.id, {
      $push: { citas: citaCreada._id },
    });

    res.status(201).json({ message: 'Cita registrada exitosamente.', cita: citaCreada });
  } catch (error) {
    console.error('Error al registrar la cita:', error);
    res.status(500).json({ message: 'Error al registrar la cita.', error });
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

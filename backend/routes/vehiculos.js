const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/vehiculo');

// Obtener todos los vehículos
router.get('/', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().populate('cliente', 'nombre telefono');
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los vehículos', error });
  }
});

// Crear un nuevo vehículo
router.post('/', async (req, res) => {
  try {
    const nuevoVehiculo = new Vehiculo(req.body);
    const vehiculo = await nuevoVehiculo.save();
    res.status(201).json(vehiculo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el vehículo', error });
  }
});

// Actualizar un vehículo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(vehiculoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el vehículo', error });
  }
});

// Eliminar un vehículo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Vehiculo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Vehículo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el vehículo', error });
  }
});

module.exports = router;

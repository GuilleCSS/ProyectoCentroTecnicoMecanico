const express = require('express');
const Vehiculo = require('../models/vehiculo');
const router = express.Router();

// Crear un vehículo
router.post('/', async (req, res) => {
  try {
    const vehiculo = new Vehiculo(req.body);
    await vehiculo.save();
    res.status(201).send(vehiculo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Leer todos los vehículos
router.get('/', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().populate('cliente');
    res.send(vehiculos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Leer un vehículo por ID
router.get('/:id', async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id).populate('cliente');
    if (!vehiculo) {
      return res.status(404).send({ error: 'Vehículo no encontrado' });
    }
    res.send(vehiculo);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un vehículo por ID
router.put('/:id', async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehiculo) {
      return res.status(404).send({ error: 'Vehículo no encontrado' });
    }
    res.send(vehiculo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un vehículo por ID
router.delete('/:id', async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculo) {
      return res.status(404).send({ error: 'Vehículo no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

const express = require('express');
const Cita = require('../models/cita');
const router = express.Router();

// Crear una cita
router.post('/', async (req, res) => {
  try {
    const cita = new Cita(req.body);
    await cita.save();
    res.status(201).send(cita);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Leer todas las citas
router.get('/', async (req, res) => {
  try {
    const citas = await Cita.find().populate('cliente vehiculo');
    res.send(citas);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Leer una cita por ID
router.get('/:id', async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id).populate('cliente vehiculo');
    if (!cita) {
      return res.status(404).send({ error: 'Cita no encontrada' });
    }
    res.send(cita);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar una cita por ID
router.put('/:id', async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cita) {
      return res.status(404).send({ error: 'Cita no encontrada' });
    }
    res.send(cita);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar una cita por ID
router.delete('/:id', async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);
    if (!cita) {
      return res.status(404).send({ error: 'Cita no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

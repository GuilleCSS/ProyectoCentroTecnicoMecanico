const express = require('express');
const Cliente = require('../models/cliente');
const router = express.Router();

// Crear un cliente
router.post('/', async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).send(cliente);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Leer todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('vehiculos citas');
    res.send(clientes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(cliente);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

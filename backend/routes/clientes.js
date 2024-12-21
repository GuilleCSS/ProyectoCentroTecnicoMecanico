const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('vehiculos').populate('citas');
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes', error });
  }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const cliente = await nuevoCliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el cliente', error });
  }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const clienteActualizado = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el cliente', error });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Cliente.findByIdAndDelete(id);
    res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cliente', error });
  }
});

module.exports = router;

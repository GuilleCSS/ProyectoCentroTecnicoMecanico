const express = require('express');
const Cliente = require('../models/cliente');
const router = express.Router();

// Existing routes...

// Add this new route for client verification
router.post('/verificar', async (req, res) => {
  try {
    const { nombre, telefono } = req.body;
    const cliente = await Cliente.findOne({ nombre, telefono });
    if (cliente) {
      res.send(cliente);
    } else {
      res.status(404).send({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
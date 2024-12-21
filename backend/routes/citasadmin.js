const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');

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

module.exports = router;

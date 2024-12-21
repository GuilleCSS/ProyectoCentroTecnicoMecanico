const express = require('express');
const router = express.Router();
const Cita = require('../models/cita'); // Modelo de Cita
const Cliente = require('../models/cliente'); // Modelo de Cliente
const Vehiculo = require('../models/vehiculo'); // Modelo de Vehículo

// Obtener todas las citas con información de cliente y vehículo
router.get('/admin/citas', async (req, res) => {
    try {
        const citas = await Cita.find()
            .populate('cliente', 'nombre correo') // Campos específicos del cliente
            .populate('vehiculo', 'marca modelo'); // Campos específicos del vehículo
        res.status(200).json(citas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
});

// Actualizar una cita
router.put('/admin/citas/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const citaActualizada = await Cita.findByIdAndUpdate(id, updateData, { new: true })
            .populate('cliente', 'nombre correo')
            .populate('vehiculo', 'marca modelo');
        res.status(200).json(citaActualizada);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la cita' });
    }
});

// Eliminar una cita
router.delete('/admin/citas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Cita.findByIdAndDelete(id);
        res.status(200).json({ message: 'Cita eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la cita' });
    }
});

module.exports = router;

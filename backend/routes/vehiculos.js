const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/vehiculo');
const Cliente = require('../models/cliente');
const autenticarToken = require('../middlewares/auth');

// Obtener todos los vehículos
router.get('/', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().populate('cliente', 'nombre telefono');
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los vehículos', error });
  }
});

// Crear o actualizar un vehículo
// Crear o actualizar un vehículo
router.post('/', autenticarToken, async (req, res) => {
  const { numeroSerie, modelo, año, marca, placas } = req.body;

  try {
    // Verifica si el vehículo ya existe en la base de datos por su numeroSerie
    let vehiculo = await Vehiculo.findOne({ numeroSerie });

    if (!vehiculo) {
      // Si no existe, crea un nuevo vehículo asociado al cliente autenticado
      vehiculo = new Vehiculo({
        numeroSerie,
        modelo,
        año,
        marca,
        placas,
        cliente: req.user.id, // Asocia el vehículo al cliente autenticado
      });
      const nuevoVehiculo = await vehiculo.save();

      // Actualiza el cliente para agregar el vehículo al array 'vehiculos'
      await Cliente.findByIdAndUpdate(req.user.id, {
        $push: { vehiculos: nuevoVehiculo._id },
      });

      return res.status(201).json({ vehiculoId: nuevoVehiculo._id, message: 'Vehículo creado correctamente.' });
    }

    // Si ya existe, actualiza los datos del vehículo
    vehiculo.modelo = modelo;
    vehiculo.año = año;
    vehiculo.marca = marca;
    vehiculo.placas = placas;
    await vehiculo.save();

    res.status(200).json({ vehiculoId: vehiculo._id, message: 'Vehículo actualizado correctamente.' });
  } catch (error) {
    console.error('Error al procesar el vehículo:', error);
    res.status(500).json({ message: 'Error al procesar el vehículo.', error });
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

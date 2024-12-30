const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const autenticarToken = require('../middlewares/auth');

const SECRET_KEY = 'admin';


// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('vehiculos').populate('citas');
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ message: 'Error al obtener los clientes', error });
  }
});


router.get('/me', autenticarToken, async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.user.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
    res.status(200).json({ nombre: cliente.nombre });
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ message: 'Error al obtener cliente.' });
  }
});



// Registro de cliente
router.post('/', async (req, res) => {
  const { nombre, telefono, correo, direccion, password } = req.body;

  try {
    const clienteExistente = await Cliente.findOne({ correo });
    if (clienteExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoCliente = new Cliente({
      nombre,
      telefono,
      correo,
      direccion,
      password: hashedPassword,
    });

    await nuevoCliente.save();
    res.status(201).json({ message: 'Registro exitoso.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar cliente.', error });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    const cliente = await Cliente.findOne({ correo });
    if (!cliente) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const esValida = await bcrypt.compare(password, cliente.password);
    if (!esValida) return res.status(401).json({ message: 'Contraseña incorrecta.' });

    const token = jwt.sign({ id: cliente._id, correo: cliente.correo }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Inicio de sesión exitoso.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.', error });
  }
});


// Actualizar un cliente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { password, ...resto } = req.body; // Extraemos la contraseña para manejarla aparte

  try {
    // Si se incluye una nueva contraseña, hashearla antes de actualizar
    let datosActualizados = { ...resto };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      datosActualizados.password = hashedPassword;
    }

    const clienteActualizado = await Cliente.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!clienteActualizado) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    res.status(200).json(clienteActualizado);
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ message: 'Error al actualizar el cliente', error });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(id);
    if (!clienteEliminado) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    res.status(200).json({ message: 'Cliente eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ message: 'Error al eliminar el cliente', error });
  }
});

module.exports = router;

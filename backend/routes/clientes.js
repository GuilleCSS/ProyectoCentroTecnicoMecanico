const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const bcrypt = require('bcrypt');

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

// Crear un nuevo cliente
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Buscar al cliente por correo
    const cliente = await Cliente.findOne({ correo });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    // Verificar la contraseña
    const esValida = await bcrypt.compare(password, cliente.password);
    if (!esValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: cliente._id, correo: cliente.correo }, SECRET_KEY, {
      expiresIn: '1h', // Token válido por 1 hora
    });

    res.status(200).json({ token, message: 'Inicio de sesión exitoso.' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
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

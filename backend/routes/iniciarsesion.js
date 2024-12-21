const express = require('express');
const jwt = require('jsonwebtoken'); // Para generar tokens JWT
const bcrypt = require('bcrypt'); // Para verificar contraseñas
const router = express.Router();
const Cliente = require('../models/cliente');

// Clave secreta para firmar los tokens
const SECRET_KEY = 'miClaveSecreta123'; // Cambia esto por una clave más segura y guárdala en variables de entorno

// Ruta para iniciar sesión
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

module.exports = router;

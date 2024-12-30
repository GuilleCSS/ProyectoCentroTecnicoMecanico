const express = require('express');
const jwt = require('jsonwebtoken');
const Cliente = require('../models/cliente'); // Modelo de cliente
const router = express.Router();

const SECRET_KEY = 'admin'; // Asegúrate de que sea la misma que usas para generar los tokens

router.get('/validate-token', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Si el usuario es un administrador, devuelve los datos directamente
    if (decoded.role === 'admin') {
      return res.status(200).json({
        user: {
          role: 'admin',
          correo: decoded.correo,
        },
      });
    }

    // Para clientes, busca en la base de datos
    const user = await Cliente.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        role: 'cliente',
      },
    });
  } catch (error) {
    console.error('Error al validar el token:', error);
    res.status(403).json({ message: 'Token inválido o expirado.' });
  }
});

module.exports = router;

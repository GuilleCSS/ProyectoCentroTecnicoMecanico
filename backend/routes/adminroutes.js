const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = 'admin';

// Autenticación del administrador
router.post('/admin-login', (req, res) => {
  const { correo, password } = req.body;

  if (correo === 'admin1@admin.com' && password === 'admin123') {
    const token = jwt.sign({ id: 'admin1', correo, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ token, user: { id: 'admin1', correo, role: 'admin' } });
  }

  return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
});

module.exports = router;

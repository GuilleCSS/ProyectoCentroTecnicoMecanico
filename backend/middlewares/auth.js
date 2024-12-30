const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const SECRET_KEY = 'admin';

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(user.id)) {
      return res.status(400).json({ message: 'ID de usuario inválido en el token.' });
    }

    req.user = user; // Guardar los datos del usuario en la solicitud
    next();
  });
};

module.exports = autenticarToken;

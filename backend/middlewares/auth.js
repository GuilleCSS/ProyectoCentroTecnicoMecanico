const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtén el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. Debes iniciar sesión.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token con tu clave secreta
    req.user = decoded; // Adjunta los datos del usuario al objeto `req`
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = authMiddleware;

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('auth_token'); // Verifica si el usuario está autenticado

  if (!token) {
    // Si no hay token, redirige a la página de login
    return <Navigate to="/login" />;
  }

  return element; // Si está autenticado, renderiza el componente protegido
};

export default PrivateRoute;

import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

const Header = () => {
  return (
    <header className="header">
      <h1>Centro Técnico de Autos</h1>
      <nav>
        <ul>
          <li><Link to="/login">Iniciar sesión</Link></li>
          <li><Link to="/register">Registrarse</Link></li>
          <li><Link to="/appointment">Agendar cita</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

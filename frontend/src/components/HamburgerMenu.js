import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Cierra el menú cuando el cursor sale del área del ícono o del menú
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="hamburger-menu">
      <div
        className={`hamburger-icon ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        onMouseEnter={() => setIsOpen(true)} // Abrir el menú al pasar el cursor sobre el ícono
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div
        className={`menu ${isOpen ? 'show open' : ''}`}
        onMouseEnter={() => setIsOpen(true)} // Abrir el menú cuando el cursor está sobre él
        onMouseLeave={handleMouseLeave} // Cerrar el menú cuando el cursor sale del área del menú
      >
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/appointment">Agendar Cita</Link></li>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/vehicle-status">Estado de mi vehículo</Link></li>
          <li><Link to="/testimonios">Testimonios</Link></li> {/* Agregado el enlace a Testimonios */}
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;

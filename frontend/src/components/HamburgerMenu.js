import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación
import './HamburgerMenu.css'; // Aquí puedes agregar los estilos del menú

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* El menú desplegable */}
      <div className={`menu ${isOpen ? 'show' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/appointment">Agendar Cita</Link></li>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/login">Login</Link></li>
          {/* Nueva opción para el estado del vehículo */}
          <li><Link to="/vehicle-status">Estado de mi vehículo</Link></li> {/* Verifica que esté aquí */}
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;

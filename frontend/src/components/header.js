import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HamburgerMenu.css'; // Asegúrate de incluir los estilos del menú de hamburguesa

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar el menú de hamburguesa

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alternar entre abrir y cerrar el menú
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Centro Técnico de Autos
        </Link>

        {/* Icono de hamburguesa en la esquina superior derecha */}
        <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/login">
                Iniciar sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/register">
                Registrarse
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/appointment">
                Agendar cita
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Menú desplegable en la vista móvil */}
      <div className={`menu ${isOpen ? 'show' : ''}`}>
        <ul>
          <li><Link to="/login">Iniciar sesión</Link></li>
          <li><Link to="/register">Registrarse</Link></li>
          <li><Link to="/appointment">Agendar cita</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

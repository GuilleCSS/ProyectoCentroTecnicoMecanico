import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado del menú de hamburguesa

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alternar entre abrir y cerrar el menú
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Centro Técnico de Autos
        </Link>

        {/* Icono de hamburguesa */}
        <div
          className={`hamburger-icon ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Menú colapsable */}
        <div
          className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
          id="navbarNav"
        >
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
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/admin/citas">
                Administrador
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

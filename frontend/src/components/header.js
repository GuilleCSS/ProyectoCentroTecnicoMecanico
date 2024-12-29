import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import UserMenu from './UserMenu'; // Importa el componente de UserMenu

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado del menú de hamburguesa

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alternar entre abrir y cerrar el menú
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">
        {/* Icono de hamburguesa alineado a la izquierda */}
        <div
          className={`hamburger-icon ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <Link className="navbar-brand fw-bold" to="/">
          Centro Técnico de Autos
        </Link>

        {/* Menú colapsable */}
        <div
          className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/login">
                
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/register">
                
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/appointment">
                
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/admin/citas">
                
              </Link>
            </li>
          </ul>
        </div>

        {/* UserMenu alineado a la parte superior derecha */}
        <div className="navbar-right">
          {/* Incluimos el componente UserMenu */}
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Header;

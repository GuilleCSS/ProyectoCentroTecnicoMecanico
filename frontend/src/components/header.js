import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado del menú de hamburguesa
  const [nombreUsuario, setNombreUsuario] = useState(''); // Estado para el nombre del cliente
  const { isAuthenticated, logout } = useContext(AuthContext); // Estado global de autenticación
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Cierra sesión
    navigate('/'); // Redirige al inicio
  };

  useEffect(() => {
    const fetchUserName = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem('auth_token');
          const response = await axios.get('http://localhost:3000/clientes/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setNombreUsuario(response.data.nombre);
        } catch (error) {
          console.error('Error al obtener el nombre del cliente:', error);
        }
      }
    };

    fetchUserName();
  }, [isAuthenticated]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">
        {/* Icono de hamburguesa alineado a la izquierda */}
        <div
          className={`hamburger-icon ${isOpen ? 'open' : ''}`}
          onMouseEnter={() => setIsOpen(true)} // Abre el menú al pasar el cursor
          onMouseLeave={() => setIsOpen(false)} // Cierra el menú al quitar el cursor
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <Link className="navbar-brand fw-bold" to="/">
          Centro Técnico de Autos
        </Link>

        {/* Contenido dinámico basado en autenticación */}
        {isAuthenticated && (
          <div className="d-flex align-items-center ms-auto">
            {/* Nombre del usuario */}
            <span className="text-white me-3 fw-semibold">
              Hola, {nombreUsuario}
            </span>

            {/* Ícono genérico de silueta */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" // Imagen genérica
              alt="Perfil"
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              className="me-3"
            />

            {/* Botón de cerrar sesión */}
            <button
              className="btn btn-outline-light fw-semibold"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>

      {/* Menú hamburguesa */}
      {isAuthenticated && (
        <div
          className={`dropdown-menu ${isOpen ? 'show' : ''} position-absolute`}
          style={{ top: '100%', left: '0', right: '0', zIndex: '1000' }}
          onMouseEnter={() => setIsOpen(true)} // Mantiene el menú abierto mientras el cursor está sobre él
          onMouseLeave={() => setIsOpen(false)} // Cierra el menú al quitar el cursor
        >
          <Link className="dropdown-item" to="/">
            Home
          </Link>
          <Link className="dropdown-item" to="/appointment">
            Agendar Cita
          </Link>
          <Link className="dropdown-item" to="/vehicle-status">
            Estado de mi Vehículo
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;

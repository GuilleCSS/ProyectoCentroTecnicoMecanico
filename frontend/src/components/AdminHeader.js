import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHeader.css';

const AdminHeader = () => {
  const navigate = useNavigate(); // Hook para redireccionar

  const handleLogout = () => {
    // Lógica para cerrar sesión (opcional: eliminar tokens, limpiar estado, etc.)
    console.log('Cerrando sesión...');
    
    // Redireccionar al Home
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/admin/citas">
          Panel de Administración
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/admin/citas">
                Citas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/admin/vehiculos">
                Vehículos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/admin/clientes">
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              {/* Botón para cerrar sesión */}
              <button
                className="btn btn-link nav-link text-white fw-semibold"
                onClick={handleLogout}
                style={{ textDecoration: 'none' }}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;

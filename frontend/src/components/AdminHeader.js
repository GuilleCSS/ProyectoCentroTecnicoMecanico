import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHeader.css';

const AdminHeader = () => {
  const navigate = useNavigate(); // Hook para redireccionar

  const handleLogout = () => {
    // Lógica para cerrar sesión: eliminar el token o limpiar el estado
    console.log('Cerrando sesión...');
    localStorage.removeItem('auth_token'); // Eliminar el token de autenticación
    navigate('/login'); // Redireccionar al login
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
              <button
                className="btn btn-link nav-link text-white fw-semibold"
                onClick={handleLogout}
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

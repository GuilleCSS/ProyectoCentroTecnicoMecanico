import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHeader.css';

const AdminHeader = () => {
  const navigate = useNavigate(); // Hook para redireccionar

  const handleLogout = () => {
    console.log('Cerrando sesión...');

    // Elimina todos los datos relacionados con la sesión
    localStorage.removeItem('auth_token'); // Eliminar token
    localStorage.removeItem('user'); // Eliminar cualquier información de usuario almacenada
    sessionStorage.clear(); // Limpiar cualquier dato en sessionStorage si es usado

    // Opcional: Limpia estados globales o contextos si los utilizas
    navigate('/'); // Redirige al home
    window.location.reload(); // Refresca la página para garantizar que el estado global se reinicie
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Marca y título */}
        <Link className="navbar-brand fw-bold" to="/admin/citas">
          Panel de Administración
        </Link>

        {/* Botón de menú responsivo */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces del menú */}
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto text-center">
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

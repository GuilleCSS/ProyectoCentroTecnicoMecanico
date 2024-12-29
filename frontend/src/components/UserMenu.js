import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Ícono de usuario
import './UserMenu.css'; // Importa el archivo CSS del ícono

const UserMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para manejar el dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Alternar el estado del dropdown
  };

  return (
    <div className="user-menu">
      {/* Ícono de usuario */}
      <div className="user-icon" onClick={toggleDropdown}>
        <FaUserCircle size={30} color="white" />
      </div>

      {/* Dropdown con las opciones */}
      {dropdownOpen && (
        <div className="dropdown-menu show">
          <Link className="dropdown-item" to="/login">
            Iniciar sesión
          </Link>
          <hr className="dropdown-divider" />
          <Link className="dropdown-item" to="/register">
            Registrarse
          </Link>
          <hr className="dropdown-divider" />
          <Link className="dropdown-item" to="/admin/citas">
            Soy administrador
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

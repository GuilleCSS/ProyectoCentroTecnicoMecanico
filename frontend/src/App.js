import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HamburgerMenu from './components/HamburgerMenu';
import Home from './components/Home';
import AppointmentForm from './components/AppointmentForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import AdminHeader from './components/AdminHeader';
import AdminCitas from './components/AdminCitas';
import AdminVehiculos from './components/AdminVehiculos';
import AdminClientes from './components/AdminClientes';
import './index.css';

// Componente principal con detección de rutas
function AppContent() {
  const location = useLocation(); // Hook para obtener la ruta actual
  const isAdminPanel = location.pathname.startsWith('/admin'); // Verifica si es ruta del panel admin

  return (
    <div className="App">
      {/* Renderiza Header o AdminHeader según la ruta */}
      {!isAdminPanel && (
        <>
          <Header />
          <HamburgerMenu />
        </>
      )}
      {isAdminPanel && <AdminHeader />}

      {/* Rutas principales */}
      <Routes>
        {/* Rutas del cliente */}
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/vehiculos" element={<AdminVehiculos />} />
        <Route path="/admin/clientes" element={<AdminClientes />} />
        {/* Rutas del administrador */}
        <Route path="/admin/citas" element={<AdminCitas />} />
        {/* Agrega más rutas de administración aquí */}
      </Routes>
    </div>
  );
}

// Envolver AppContent en el Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

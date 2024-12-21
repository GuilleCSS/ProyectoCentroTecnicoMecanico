import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import HamburgerMenu from './components/HamburgerMenu';
import Home from './components/home';
import AppointmentForm from './components/AppointmentForm';
import RegisterForm from './components/registerform';
import LoginForm from './components/loginform';
import RegistrationSuccess from './components/RegistrationSuccess';
import AdminHeader from './components/AdminHeader';
import AdminCitas from './components/AdminCitas';
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
        <Route path="/success" element={<RegistrationSuccess />} />

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

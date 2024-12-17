import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import AppointmentForm from './components/AppointmentForm';
import Header from './components/header';
import RegisterForm from './components/registerform';
import LoginForm from './components/loginform';
import RegistrationSuccess from './components/RegistrationSuccess'; // Importar la página de éxito
import HamburgerMenu from './components/HamburgerMenu';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Si tienes un Header global, asegurate de que sea accesible para todas las páginas */}
        <HamburgerMenu /> {/* Agregamos el menú de hamburguesa aquí */}
        
        {/* Define las rutas de tu aplicación */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/success" element={<RegistrationSuccess />} /> {/* Página de éxito */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

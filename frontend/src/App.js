import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import AppointmentForm from './components/AppointmentForm';
import Header from './components/header'; // Si tienes un Header
import RegisterForm from './components/registerform'; // Si tienes un componente para registro
import LoginForm from './components/loginform'; // Si tienes un componente para login

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Asegúrate de que tu Header sea accesible para todas las páginas */}
        
        {/* Define las rutas de tu aplicación */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

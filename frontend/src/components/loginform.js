import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Contexto de autenticación
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Inicio de sesión del administrador (admin1@admin.com)
      if (email === 'admin1@admin.com' && password === 'admin123') {
        const response = await axios.post('http://localhost:3000/adminroute/admin-login', { correo: email, password });
        localStorage.setItem('auth_token', response.data.token); // Almacena el token válido
        login(response.data.user, response.data.token); // Actualiza el contexto de autenticación
        window.location.href = 'http://localhost:3001/admin/citas'; // Redirige al panel de administrador
        return;
      }

      // Inicio de sesión del cliente
      const response = await axios.post('http://localhost:3000/clientes/login', { correo: email, password });
      login(response.data.user, response.data.token); // Establece el usuario y token en el contexto
      navigate('/appointment'); // Redirige a la página de citas
    } catch (error) {
      setError(error.response?.data?.message || 'Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="login-form shadow-lg p-4 rounded bg-white">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
        <div className="mt-3 text-center">
          <p>
            ¿No tienes cuenta?{' '}
            <span onClick={() => navigate('/register')} className="text-danger cursor-pointer">
              Regístrate aquí
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para navegación interna

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Contraseña:', password);
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      {/* Formulario */}
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Ingrese su correo"
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
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Iniciar sesión</button>
        </form>
        <div className="text-center mt-3">
          <small>
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-success text-decoration-none">
              Regístrate
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté importado
import './LoginForm.css'; // Si tienes tu archivo de estilos personalizados

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Correo y contraseña predeterminados para la prueba
    const validEmail = 'admin@example.com';
    const validPassword = 'admin123';

    // Verifica si el correo y la contraseña son correctos
    if (email === validEmail && password === validPassword) {
      // Guarda un token en localStorage para simular que el usuario está autenticado
      localStorage.setItem('auth_token', 'valid_token');

      // Redirige al panel de administración o a la página de citas
      navigate('/appointment');
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="login-form shadow-lg p-4 rounded bg-white">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
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
          <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
        </form>
        <div className="mt-3 text-center">
          <p>
            ¿No tienes cuenta? <span onClick={() => navigate('/register')} className="text-danger cursor-pointer">Regístrate aquí</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

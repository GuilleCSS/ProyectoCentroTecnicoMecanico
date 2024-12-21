import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token); // Guarda el token
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response.data.message);
    throw error;
  }
};

export const registrarCita = async (datosCita) => {
  const token = localStorage.getItem('token'); // Obtén el token almacenado
  if (!token) {
    throw new Error('Usuario no autenticado');
  }

  try {
    const response = await axios.post(`${API_URL}/citas`, datosCita, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al registrar la cita:', error.response.data.message);
    throw error;
  }
};

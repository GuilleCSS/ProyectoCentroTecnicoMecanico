// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://tu-api.com',  // Cambia esto por la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para agendar cita
export const agendarCita = (fecha, servicio) => {
  return api.post('/citas', { fecha, servicio });
};

// Exportar la instancia para ser usada en otros componentes
export default api;

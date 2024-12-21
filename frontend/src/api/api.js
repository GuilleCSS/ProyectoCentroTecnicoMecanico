import axios from 'axios';

// Crea una instancia de Axios con configuración base
const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para agendar una cita
export const agendarCita = async (fecha, servicio) => {
  try {
    const response = await api.post('/citas', { fecha, servicio });
    return response.data;
  } catch (error) {
    console.error('Error al agendar la cita:', error);
    throw error;
  }
};

// Función para obtener todas las citas
export const obtenerCitas = async () => {
  try {
    const response = await api.get('/citasadmin');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    throw error;
  }
};

// Función para eliminar una cita
export const eliminarCita = async (id) => {
  try {
    const response = await api.delete(`/citasadmin/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
    throw error;
  }
};

// Función para actualizar una cita
export const actualizarCita = async (id, datosActualizados) => {
  try {
    const response = await api.put(`/citasadmin/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    throw error;
  }
};

// Exportar la instancia para ser usada en otros componentes
export default api;

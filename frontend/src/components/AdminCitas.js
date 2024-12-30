import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCitas = () => {
  const [citas, setCitas] = useState([]); // Estado para almacenar citas
  const [citaSeleccionada, setCitaSeleccionada] = useState(null); // Estado para la cita seleccionada
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar/ocultar el modal

  // Obtener todas las citas al cargar el componente
  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const token = localStorage.getItem('auth_token'); // Obtiene el token del localStorage
      const response = await axios.get('http://localhost:3000/citas', {
        headers: { Authorization: `Bearer ${token}` }, // Incluye el token en los encabezados
      });
      setCitas(response.data);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
      if (error.response?.status === 401) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        window.location.href = '/login'; // Redirige al formulario de inicio de sesión
      }
    }
  };

  const handleActualizarCita = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.put(
        `http://localhost:3000/citas/${citaSeleccionada._id}`,
        citaSeleccionada,
        { headers: { Authorization: `Bearer ${token}` } } // Incluye el token
      );
      setCitas(
        citas.map((cita) =>
          cita._id === citaSeleccionada._id ? response.data : cita
        )
      );
      setMostrarModal(false); // Ocultar el modal después de actualizar
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
      if (error.response?.status === 401) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        window.location.href = '/login';
      }
    }
  };

  const handleEliminarCita = async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`http://localhost:3000/citas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Incluye el token
      });
      setCitas(citas.filter((cita) => cita._id !== id)); // Actualizar el estado local
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      if (error.response?.status === 401) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        window.location.href = '/login';
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCitaSeleccionada({ ...citaSeleccionada, [name]: value });
  };

  const abrirModal = (cita) => {
    setCitaSeleccionada(cita);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setCitaSeleccionada(null);
    setMostrarModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Citas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita._id}>
              <td>{new Date(cita.fecha).toLocaleString()}</td>
              <td>{cita.servicio}</td>
              <td>{cita.estado}</td>
              <td>
                {cita.cliente ? cita.cliente.nombre : 'Sin cliente asociado'}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => abrirModal(cita)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEliminarCita(cita._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para actualizar estado de la cita */}
      {mostrarModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Cita</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-control"
                      name="estado"
                      value={citaSeleccionada.estado || ''}
                      onChange={handleInputChange}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Completada">Completada</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleActualizarCita}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCitas;

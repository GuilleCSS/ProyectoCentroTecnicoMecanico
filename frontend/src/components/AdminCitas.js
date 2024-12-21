import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCitas = () => {
  const [citas, setCitas] = useState([]); // Estado para almacenar las citas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Obtener todas las citas del backend
  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/citasadmin'); // Asegúrate de que esta URL sea correcta
      setCitas(response.data);
    } catch (err) {
      console.error('Error al obtener las citas:', err);
      setError('No se pudieron cargar las citas.');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarCita = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/citasadmin/${id}`);
      setCitas(citas.filter((cita) => cita._id !== id)); // Actualiza el estado después de eliminar
    } catch (err) {
      console.error('Error al eliminar la cita:', err);
      alert('Hubo un error al intentar eliminar la cita.');
    }
  };

  const handleCompletarCita = async (id) => {
    try {
      const updatedCita = await axios.put(`http://localhost:3000/citasadmin/${id}`, {
        estado: 'Completada',
      });
      setCitas(citas.map((cita) => (cita._id === id ? updatedCita.data : cita))); // Actualiza el estado después de completar
    } catch (err) {
      console.error('Error al completar la cita:', err);
      alert('Hubo un error al intentar completar la cita.');
    }
  };

  if (loading) {
    return <p className="text-center mt-4">Cargando citas...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Citas</h2>
      {citas.length === 0 ? (
        <p className="text-center">No hay citas registradas.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th>Cliente</th>
              <th>Vehículo</th>
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
                  {cita.cliente
                    ? `${cita.cliente.nombre} (${cita.cliente.telefono})`
                    : 'Sin cliente'}
                </td>
                <td>
                  {cita.vehiculo
                    ? `${cita.vehiculo.marca} ${cita.vehiculo.modelo} (${cita.vehiculo.placas})`
                    : 'Sin vehículo'}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleEliminarCita(cita._id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleCompletarCita(cita._id)}
                  >
                    Completar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCitas;

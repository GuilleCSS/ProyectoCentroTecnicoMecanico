import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCitas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await axios.get('/api/admin/citas');
      setCitas(response.data);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  const deleteCita = async (id) => {
    try {
      await axios.delete(`/api/admin/citas/${id}`);
      setCitas(citas.filter((cita) => cita._id !== id));
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
    }
  };

  const updateCita = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/admin/citas/${id}`, updatedData);
      setCitas(citas.map((cita) => (cita._id === id ? response.data : cita)));
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
    }
  };

  return (
    <div>
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
              <td>{cita.cliente?.nombre || 'Sin cliente'}</td>
              <td>{cita.vehiculo ? `${cita.vehiculo.marca} ${cita.vehiculo.modelo}` : 'Sin vehículo'}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteCita(cita._id)}>
                  Eliminar
                </button>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => updateCita(cita._id, { estado: 'Completada' })}
                >
                  Completar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCitas;

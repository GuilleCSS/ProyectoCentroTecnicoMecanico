import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const fetchVehiculos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/vehiculos');
      setVehiculos(response.data);
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
    }
  };

  const handleEliminarVehiculo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/vehiculos/${id}`);
      setVehiculos(vehiculos.filter((vehiculo) => vehiculo._id !== id));
    } catch (error) {
      console.error('Error al eliminar el vehículo:', error);
    }
  };

  const handleActualizarVehiculo = async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:3000/admin/vehiculos/${id}`, data);
      setVehiculos(vehiculos.map((vehiculo) => (vehiculo._id === id ? response.data : vehiculo)));
    } catch (error) {
      console.error('Error al actualizar el vehículo:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Vehículos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Placas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo._id}>
              <td>{vehiculo.cliente ? vehiculo.cliente.nombre : 'Sin cliente'}</td>
              <td>{vehiculo.marca}</td>
              <td>{vehiculo.modelo}</td>
              <td>{vehiculo.placas}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleEliminarVehiculo(vehiculo._id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() =>
                    handleActualizarVehiculo(vehiculo._id, { marca: 'Nueva Marca' })
                  }
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVehiculos;

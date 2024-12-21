import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const handleEliminarCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/clientes/${id}`);
      setClientes(clientes.filter((cliente) => cliente._id !== id));
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  const handleActualizarCliente = async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:3000/admin/clientes/${id}`, data);
      setClientes(clientes.map((cliente) => (cliente._id === id ? response.data : cliente)));
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Clientes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente._id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.telefono}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleEliminarCliente(cliente._id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() =>
                    handleActualizarCliente(cliente._id, { nombre: 'Nuevo Nombre' })
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

export default AdminClientes;

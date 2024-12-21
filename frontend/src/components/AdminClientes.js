import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminClientes = () => {
  const [clientes, setClientes] = useState([]); // Estado para almacenar clientes
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // Estado para el cliente seleccionado
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar/ocultar el modal

  // Obtener clientes al cargar el componente
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const handleEliminarCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/clientes/${id}`);
      setClientes(clientes.filter((cliente) => cliente._id !== id));
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  const handleActualizarCliente = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/clientes/${clienteSeleccionado._id}`,
        clienteSeleccionado
      );
      setClientes(
        clientes.map((cliente) =>
          cliente._id === clienteSeleccionado._id ? response.data : cliente
        )
      );
      setMostrarModal(false); // Ocultar el modal después de actualizar
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteSeleccionado({ ...clienteSeleccionado, [name]: value });
  };

  const abrirModal = (cliente) => {
    setClienteSeleccionado(cliente);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setClienteSeleccionado(null);
    setMostrarModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Clientes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente._id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.direccion}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleEliminarCliente(cliente._id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => abrirModal(cliente)}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para actualizar cliente */}
      {mostrarModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Cliente</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={clienteSeleccionado.nombre || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telefono"
                      value={clienteSeleccionado.telefono || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                      type="email"
                      className="form-control"
                      name="correo"
                      value={clienteSeleccionado.correo || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                      type="text"
                      className="form-control"
                      name="direccion"
                      value={clienteSeleccionado.direccion || ''}
                      onChange={handleInputChange}
                    />
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
                  onClick={handleActualizarCliente}
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

export default AdminClientes;

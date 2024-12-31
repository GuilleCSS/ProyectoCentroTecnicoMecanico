import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]); // Estado para almacenar vehículos
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null); // Estado para el vehículo seleccionado
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar/ocultar el modal

  // Obtener vehículos al cargar el componente
  useEffect(() => {
    fetchVehiculos();
  }, []);

  const fetchVehiculos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/vehiculos');
      setVehiculos(response.data);
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
    }
  };

  const handleEliminarVehiculo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/vehiculos/${id}`);
      setVehiculos(vehiculos.filter((vehiculo) => vehiculo._id !== id));
    } catch (error) {
      console.error('Error al eliminar el vehículo:', error);
    }
  };

  const handleActualizarVehiculo = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/vehiculos/${vehiculoSeleccionado._id}`,
        vehiculoSeleccionado
      );
      setVehiculos(
        vehiculos.map((vehiculo) =>
          vehiculo._id === vehiculoSeleccionado._id ? response.data : vehiculo
        )
      );
      setMostrarModal(false); // Ocultar el modal después de actualizar
    } catch (error) {
      console.error('Error al actualizar el vehículo:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehiculoSeleccionado({ ...vehiculoSeleccionado, [name]: value });
  };

  const abrirModal = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setVehiculoSeleccionado(null);
    setMostrarModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Vehículos</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Número de Serie</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Placas</th>
              <th>Cliente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo._id}>
                <td>{vehiculo.numeroSerie}</td>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.año}</td>
                <td>{vehiculo.placas}</td>
                <td>{vehiculo.cliente ? vehiculo.cliente.nombre : 'Sin cliente asociado'}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminarVehiculo(vehiculo._id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => abrirModal(vehiculo)}
                    >
                      Actualizar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para actualizar vehículo */}
      {mostrarModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Vehículo</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Número de Serie</label>
                    <input
                      type="text"
                      className="form-control"
                      name="numeroSerie"
                      value={vehiculoSeleccionado?.numeroSerie || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Marca</label>
                    <input
                      type="text"
                      className="form-control"
                      name="marca"
                      value={vehiculoSeleccionado?.marca || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="modelo"
                      value={vehiculoSeleccionado?.modelo || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Año</label>
                    <input
                      type="number"
                      className="form-control"
                      name="año"
                      value={vehiculoSeleccionado?.año || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Placas</label>
                    <input
                      type="text"
                      className="form-control"
                      name="placas"
                      value={vehiculoSeleccionado?.placas || ''}
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
                  onClick={handleActualizarVehiculo}
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

export default AdminVehiculos;

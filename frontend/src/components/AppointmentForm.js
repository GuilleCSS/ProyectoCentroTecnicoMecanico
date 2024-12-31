import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    numeroSerie: '',
    marca: '',
    modelo: '',
    año: '',
    placas: '',
    fecha: '',
    hora: '',
    servicio: '',
  });
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Debes iniciar sesión para agendar una cita.');
      navigate('/login');
      return;
    }

    try {
      // Crear o actualizar el vehículo
      const vehiculoResponse = await axios.post(
        'http://localhost:3000/vehiculos',
        {
          numeroSerie: formData.numeroSerie,
          marca: formData.marca,
          modelo: formData.modelo,
          año: formData.año,
          placas: formData.placas,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` } }
      );

      const vehiculoId = vehiculoResponse.data.vehiculoId;

      // Crear la cita
      await axios.post(
        'http://localhost:3000/citas/generar',
        {
          fecha: `${formData.fecha}T${formData.hora}`,
          servicio: formData.servicio,
          vehiculoId: vehiculoId,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` } }
      );

      // Redirigir a la página de agradecimiento
      navigate('/thank-you');
    } catch (error) {
      console.error('Error al registrar la cita:', error.response?.data?.message || error.message);
      alert('Error al registrar la cita');
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Agendar Cita</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="numeroSerie" className="form-label">Número de Serie</label>
              <input
                type="text"
                id="numeroSerie"
                className="form-control"
                value={formData.numeroSerie}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="marca" className="form-label">Marca</label>
              <input
                type="text"
                id="marca"
                className="form-control"
                value={formData.marca}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="modelo" className="form-label">Modelo</label>
              <input
                type="text"
                id="modelo"
                className="form-control"
                value={formData.modelo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="año" className="form-label">Año</label>
              <input
                type="number"
                id="año"
                className="form-control"
                value={formData.año}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="placas" className="form-label">Placas</label>
              <input
                type="text"
                id="placas"
                className="form-control"
                value={formData.placas}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="fecha" className="form-label">Fecha</label>
              <input
                type="date"
                id="fecha"
                className="form-control"
                value={formData.fecha}
                onChange={handleChange}
                min={today} // Restricción para no permitir fechas anteriores
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="hora" className="form-label">Hora</label>
              <select
                id="hora"
                className="form-select"
                value={formData.hora}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una hora</option>
                {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="servicio" className="form-label">Servicio</label>
              <input
                type="text"
                id="servicio"
                className="form-control"
                value={formData.servicio}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">Registrar Cita</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;

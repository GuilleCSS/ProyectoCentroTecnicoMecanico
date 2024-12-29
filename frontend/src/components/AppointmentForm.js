import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para agendar una cita.');
      navigate('/login');
      return;
    }

    try {
      // Eliminamos la variable 'response' ya que no la utilizamos
      await axios.post(
        'http://localhost:3000/citas',
        { ...formData, fechaHora: `${formData.fecha}T${formData.hora}` },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Cita registrada exitosamente');
      navigate('/success');
    } catch (error) {
      console.error('Error al registrar la cita:', error.response?.data?.message || error.message);
      alert('Error al registrar la cita');
    }
  };

  // Generar horarios disponibles (de 8:00 AM a 6:00 PM en intervalos de 1 hora)
  const generateHours = () => {
    const hours = [];
    for (let i = 8; i <= 18; i++) {
      const hour = i.toString().padStart(2, '0') + ':00';
      hours.push(hour);
    }
    return hours;
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Agendar Cita</h2>
        <form onSubmit={handleSubmit}>
          {/* Datos del vehículo */}
          <div className="mb-3">
            <label htmlFor="numeroSerie" className="form-label">Número de Serie:</label>
            <input
              type="text"
              id="numeroSerie"
              className="form-control"
              value={formData.numeroSerie}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="marca" className="form-label">Marca:</label>
            <input
              type="text"
              id="marca"
              className="form-control"
              value={formData.marca}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="modelo" className="form-label">Modelo:</label>
            <input
              type="text"
              id="modelo"
              className="form-control"
              value={formData.modelo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="año" className="form-label">Año:</label>
            <input
              type="number"
              id="año"
              className="form-control"
              value={formData.año}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="placas" className="form-label">Placas:</label>
            <input
              type="text"
              id="placas"
              className="form-control"
              value={formData.placas}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fecha y Hora */}
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">Fecha:</label>
            <input
              type="date"
              id="fecha"
              className="form-control"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="hora" className="form-label">Hora:</label>
            <select
              id="hora"
              className="form-select"
              value={formData.hora}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una hora</option>
              {generateHours().map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          {/* Servicio */}
          <div className="mb-3">
            <label htmlFor="servicio" className="form-label">Servicio:</label>
            <input
              type="text"
              id="servicio"
              className="form-control"
              value={formData.servicio}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar Cita</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;

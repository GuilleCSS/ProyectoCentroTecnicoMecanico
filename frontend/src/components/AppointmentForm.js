import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate para redirigir
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleSerial: '',
    vehiclePlates: '',
    date: '',
    time: '',
  });

  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    // Aquí pasamos los datos del formulario a la página de éxito
    navigate('/success', { state: formData }); // Pasamos formData como estado
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Agendar Cita</h2>

        <form onSubmit={handleSubmit}>
          {/* Datos del Cliente */}
          <h4 className="mb-3">Datos del Cliente/Propietario</h4>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Teléfono:</label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Datos del Vehículo */}
          <h4 className="mb-3">Datos del Vehículo</h4>
          <div className="mb-3">
            <label htmlFor="vehicleBrand" className="form-label">Marca del vehículo:</label>
            <input
              type="text"
              id="vehicleBrand"
              className="form-control"
              value={formData.vehicleBrand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="vehicleModel" className="form-label">Modelo del vehículo:</label>
            <input
              type="text"
              id="vehicleModel"
              className="form-control"
              value={formData.vehicleModel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="vehicleYear" className="form-label">Año del vehículo:</label>
            <input
              type="number"
              id="vehicleYear"
              className="form-control"
              value={formData.vehicleYear}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="vehicleSerial" className="form-label">Número de serie:</label>
            <input
              type="text"
              id="vehicleSerial"
              className="form-control"
              value={formData.vehicleSerial}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="vehiclePlates" className="form-label">Placas del vehículo:</label>
            <input
              type="text"
              id="vehiclePlates"
              className="form-control"
              value={formData.vehiclePlates}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fecha y Hora */}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Fecha:</label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Hora:</label>
            <input
              type="time"
              id="time"
              className="form-control"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Agendar cita</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;

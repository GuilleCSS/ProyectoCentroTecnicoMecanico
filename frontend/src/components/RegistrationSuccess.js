import React from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation
import './RegistrationSuccess.css'; // Estilos opcionales

const RegistrationSuccess = () => {
  const location = useLocation(); // Obtiene la ubicación, que incluye el estado

  const { name, email, phone, vehicleBrand, vehicleModel, vehicleYear, vehicleSerial, vehiclePlates, date, time } = location.state || {};

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '700px', width: '100%' }}>
        <h2 className="text-center mb-4">¡Registro Exitoso!</h2>
        <p className="text-center">Tu cita ha sido registrada correctamente. Aquí están los detalles de tu cita:</p>

        <h5 className="mt-4">Datos del Cliente</h5>
        <ul>
          <li><strong>Nombre:</strong> {name}</li>
          <li><strong>Correo:</strong> {email}</li>
          <li><strong>Teléfono:</strong> {phone}</li>
        </ul>

        <h5 className="mt-4">Detalles del Vehículo</h5>
        <ul>
          <li><strong>Marca:</strong> {vehicleBrand}</li>
          <li><strong>Modelo:</strong> {vehicleModel}</li>
          <li><strong>Año:</strong> {vehicleYear}</li>
          <li><strong>Número de serie:</strong> {vehicleSerial}</li>
          <li><strong>Placas:</strong> {vehiclePlates}</li>
        </ul>

        <h5 className="mt-4">Fecha y Hora de la Cita</h5>
        <ul>
          <li><strong>Fecha:</strong> {date}</li>
          <li><strong>Hora:</strong> {time}</li>
        </ul>

        <p className="text-center mt-4">Gracias por confiar en nosotros. ¡Te esperamos!</p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;

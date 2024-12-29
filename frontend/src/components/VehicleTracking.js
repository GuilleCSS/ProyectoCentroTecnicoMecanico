import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VehicleTracking.css'; // Si tienes estilos personalizados

const VehicleTracking = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [vehicleStatus, setVehicleStatus] = useState(null);
  const [error, setError] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación de número de serie
    if (!serialNumber) {
      setError('Por favor ingresa un número de serie');
      return;
    }
    
    // En un caso real, harías una solicitud a la API
    const mockData = getVehicleData(serialNumber);
    
    if (mockData) {
      setVehicleStatus(mockData);
      setError('');
    } else {
      setError('Número de serie no encontrado');
      setVehicleStatus(null);
    }
  };

  // Función simulada que obtiene el estado del vehículo basándose en el número de serie
  const getVehicleData = (serialNumber) => {
    // Simulamos una base de datos con vehículos y su estado
    const vehicles = {
      'VSNAI1233OASKD9930': [
        { stage: 'Inspección', date: '01 Ago 09:00', status: 'El vehículo está en revisión inicial' },
        { stage: 'Reparación', date: '02 Ago 11:30', status: 'El vehículo está siendo reparado' },
        { stage: 'Prueba de conducción', date: '03 Ago 14:00', status: 'El vehículo está pasando las pruebas' },
        { stage: 'Listo para entrega', date: '04 Ago 16:00', status: 'El vehículo está listo para ser entregado al cliente' },
        { stage: 'Entregado', date: '05 Ago 09:00', status: 'El vehículo fue entregado al cliente' }
      ],
      '654321': [
        { stage: 'Inspección', date: '10 Jul 09:00', status: 'El vehículo está en revisión inicial' },
        { stage: 'Reparación', date: '12 Jul 10:00', status: 'El vehículo está siendo reparado' },
        { stage: 'Listo para entrega', date: '15 Jul 16:00', status: 'El vehículo está listo para ser entregado' }
      ]
    };

    // Retorna los datos del vehículo si existe, si no, retorna null
    return vehicles[serialNumber] || null;
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Seguimiento del Vehículo</h2>
      
      {/* Formulario para ingresar el número de serie */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="serialNumber" className="form-label">Número de Serie</label>
          <input
            type="text"
            className="form-control"
            id="serialNumber"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Ingresa tu número de serie"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Ver estado del vehículo</button>
      </form>

      {/* Mostrar el error si existe */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Si tenemos el estado del vehículo, mostramos la línea de tiempo */}
      {vehicleStatus && (
        <div className="timeline-container">
          <ul className="timeline">
            {vehicleStatus.map((item, index) => (
              <li key={index} className={`timeline-item ${index === vehicleStatus.length - 1 ? 'active' : ''}`}>
                <div className="timeline-content">
                  <span className="stage">{item.stage}</span>
                  <p className="date">{item.date}</p>
                  <p className="status">{item.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VehicleTracking;

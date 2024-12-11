import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica para agendar una cita
    console.log('Fecha:', date);
    console.log('Hora:', time);
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Agendar Cita</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Fecha:</label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Hora:</label>
            <input
              type="time"
              id="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
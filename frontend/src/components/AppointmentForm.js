import React, { useState } from 'react';
import './AppointmentForm.css';

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
    <div className="appointment-form">
      <h2>Agendar Cita</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Hora:</label>
          <input 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Agendar cita</button>
      </form>
    </div>
  );
};

export default AppointmentForm;

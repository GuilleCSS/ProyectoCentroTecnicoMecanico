import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">¡Gracias por su confianza!</h2>
        <p className="text-center">
          Su cita ha sido registrada exitosamente. Apreciamos su preferencia y estamos listos para atender su vehículo.
        </p>
        <div className="mt-4 text-center">
          <button
            className="btn btn-primary w-100 mb-2"
            onClick={() => navigate('/appointment')}
          >
            Agendar otra cita
          </button>
          <button
            className="btn btn-secondary w-100 mb-2"
            onClick={() => navigate('/vehiculo/estado')}
          >
            Ver estado de mi vehículo
          </button>
          <button
            className="btn btn-danger w-100"
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

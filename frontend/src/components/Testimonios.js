import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Testimonios.css';

const Testimonios = () => {
  const [testimonios, setTestimonios] = useState([]);
  const [nuevoTestimonio, setNuevoTestimonio] = useState({
    nombre: '',
    comentario: '',
    calificacion: 5,
  });

  useEffect(() => {
    axios
      .get('http://localhost:3000/testimonios')
      .then((response) => {
        setTestimonios(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los testimonios', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoTestimonio({ ...nuevoTestimonio, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevoTestimonio.nombre && nuevoTestimonio.comentario) {
      axios
        .post('http://localhost:3000/testimonios', nuevoTestimonio)
        .then(() => {
          setTestimonios([...testimonios, nuevoTestimonio]);
          setNuevoTestimonio({ nombre: '', comentario: '', calificacion: 5 });
        })
        .catch((error) => {
          console.error('Error al agregar el testimonio', error);
        });
    }
  };

  return (
    <div className="testimonios-container">
      <h2 className="text-center mb-5">Lo que nuestros clientes dicen sobre nosotros</h2>

      {/* Mostrar testimonios existentes */}
      <div className="testimonios-lista">
        {testimonios.map((testimonio, index) => (
          <div className="testimonio-card" key={index}>
            <div className="testimonio-header">
              <strong>{testimonio.nombre}</strong>
            </div>
            <p className="comentario">{testimonio.comentario}</p>
            <div className="calificacion">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < testimonio.calificacion ? 'filled' : 'empty'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Formulario para agregar un nuevo testimonio */}
      <h3 className="text-center mt-5">Agregar tu Testimonio</h3>
      <form onSubmit={handleSubmit} className="testimonial-form">
        <div className="form-group">
          <input
            type="text"
            name="nombre"
            value={nuevoTestimonio.nombre}
            onChange={handleInputChange}
            placeholder="Tu nombre"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <textarea
            name="comentario"
            value={nuevoTestimonio.comentario}
            onChange={handleInputChange}
            placeholder="Tu comentario"
            className="form-control"
            rows="4"
          />
        </div>
        <div className="form-group">
          <label>Calificación:</label>
          <select
            name="calificacion"
            value={nuevoTestimonio.calificacion}
            onChange={handleInputChange}
            className="form-control"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'estrella' : 'estrellas'}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Agregar Testimonio
        </button>
      </form>
    </div>
  );
};

export default Testimonios;

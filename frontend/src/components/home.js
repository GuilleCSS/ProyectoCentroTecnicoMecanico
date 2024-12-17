import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Barra de Navegación */}
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          Centro Técnico de Autos
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">Iniciar sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/register">Registrarse</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/appointment">Agendar cita</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Video de Fondo con Texto */}
      <section className="position-relative mb-4">
        <video autoPlay loop muted className="w-100">
          <source src="jucamariachi.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="display-4 text-uppercase fw-bold bg-dark bg-opacity-50 p-3 rounded">Taller Upiit</h1>
          <p className="lead bg-dark bg-opacity-50 p-2 rounded">Donde la excelencia automotriz y la satisfacción del cliente se unen.</p>
        </div>
      </section>

      {/* Secciones: Misión, Visión, Objetivos */}
      <section className="container mb-5">
        <div className="row g-4">
          {[{ title: 'Misión', desc: 'Proveer servicios de reparación automotriz de alta calidad con un enfoque en la satisfacción del cliente.' },
            { title: 'Visión', desc: 'Ser el taller mecánico líder en la región, reconocido por nuestra excelencia y compromiso.' },
            { title: 'Objetivos', desc: 'Ofrecer servicios rápidos y eficientes, mantener altos estándares de calidad, y garantizar la satisfacción del cliente.' }]
            .map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 shadow-sm rounded-lg">
                  <div className="card-body">
                    <h5 className="card-title text-danger">{item.title}</h5>
                    <p className="card-text">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="container mb-5">
        <h2 className="text-center text-danger mb-4">Servicios Ofrecidos</h2>
        <div className="row g-4">
          {[{ name: 'Reparación de motores', desc: 'Diagnóstico y reparación de problemas del motor para un rendimiento óptimo.' },
            { name: 'Cambio de aceite', desc: 'Mantenimiento regular para prolongar la vida útil de su vehículo.' },
            { name: 'Diagnóstico y reparación de frenos', desc: 'Garantizamos su seguridad con un sistema de frenos en perfecto estado.' },
            { name: 'Mantenimiento preventivo', desc: 'Evite problemas futuros con nuestro servicio de mantenimiento integral.' },
            { name: 'Reparación de sistemas eléctricos', desc: 'Soluciones para todos los problemas eléctricos de su vehículo.' }]
            .map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm rounded-lg">
                  <div className="card-body">
                    <h5 className="card-title text-danger">{service.name}</h5>
                    <p className="card-text">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Mapa y Ubicación */}
      <section className="container mb-5">
        <h2 className="text-center text-danger mb-4">Nuestra Ubicación</h2>
        <div className="row">
          {/* Información de la Ubicación */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm rounded-lg">
              <div className="card-body">
                <h5 className="card-title text-danger">Dirección</h5>
                <p><strong>Dirección:</strong> Calle Principal #123, Ciudad Automotriz, CP 12345</p>
                <p><strong>Teléfono:</strong> +1 (555) 123-4567</p>
                <p><strong>Correo:</strong> <a href="mailto:info@tallerexpress.com">info@tallerexpress.com</a></p>
                <p><strong>Horario:</strong> Lunes a Sábado: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Mapa Interactivo */}
          <div className="col-md-6">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.761237551881!2d-98.23794908525141!3d19.32282198695398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfd8f92d86429d%3A0x8e595e1b00e4a533!2sUPIIT!5e0!3m2!1ses-419!2smx!4v1659123456789!5m2!1ses-419!2smx"
                title="Mapa de ubicación"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Botón de Agendar Cita */}
      <section className="text-center mb-5">
        <Link
          to="/appointment"
          className="btn btn-danger btn-lg px-5 py-3 shadow-sm fw-bold text-uppercase"
        >
          Agendar una Cita
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-0">&copy; 2024 Taller Upiit. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;

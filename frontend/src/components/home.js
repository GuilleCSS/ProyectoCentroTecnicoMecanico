import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  // Función para redirigir al login o a la página de citas
  const handleAppointmentClick = () => {
    const token = localStorage.getItem('auth_token'); // Verificar si el usuario está autenticado
    if (token) {
      navigate('/appointment'); // Si está autenticado, redirigir a la página de agendar cita
    } else {
      navigate('/login'); // Si no está autenticado, redirigir al login
    }
  };

  const handleAdminClick = () => {
    const token = localStorage.getItem('auth_token'); // Verificar si el usuario está autenticado
    if (token) {
      navigate('/admin'); // Redirigir al panel de administración si está autenticado
    } else {
      navigate('/login'); // Si no está autenticado, redirigir al formulario de inicio de sesión
    }
  };

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
              <Link className="nav-link text-white" to="/register">Registrarse</Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white btn btn-link"
                onClick={handleAppointmentClick} // Verifica si el usuario está autenticado antes de redirigir
              >
                Agendar cita
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white btn btn-link"
                onClick={handleAdminClick} // Redirige al login si no está autenticado
              >
                Administrador
              </button>
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

      {/* Ofertas Especiales */}
      <section className="container mb-5">
        <h2 className="text-center text-danger mb-4">Ofertas Especiales</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="offer-banner p-4 rounded-lg d-flex flex-column justify-content-between align-items-start">
              <h4 className="text-white">¡20% de Descuento en Cambio de Aceite!</h4>
              <p className="text-white">Realiza tu cambio de aceite con nosotros y aprovecha un 20% de descuento en el servicio. ¡Tu vehículo te lo agradecerá!</p>
              <button className="btn btn-warning btn-lg text-uppercase">¡Aprovecha ahora!</button>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="offer-banner p-4 rounded-lg d-flex flex-column justify-content-between align-items-start">
              <h4 className="text-white">Revisión de Frenos GRATIS</h4>
              <p className="text-white">Asegura tu seguridad en la carretera. Ven y revisa los frenos de tu vehículo sin costo alguno.</p>
              <button className="btn btn-warning btn-lg text-uppercase">¡Ven y revisa ahora!</button>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Imágenes */}
      <section className="container mb-5">
        <h2 className="text-center text-danger mb-4">Galería de Nuestro Trabajo</h2>
        <div className="row g-4">
          {[{ img: '/motor2.jpg', alt: 'Reparación de Motor' },
            { img: '/frenos.jpg', alt: 'Revisión de Frenos' },
            { img: '/aceite.jpg', alt: 'Cambio de Aceite' }]
            .map((image, index) => (
              <div key={index} className="col-md-4">
                <div className="card shadow-sm rounded-lg">
                  <img src={image.img} alt={image.alt} className="card-img-top" />
                  <div className="card-body">
                    <p className="card-text">{image.alt}</p>
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
        <button
          onClick={handleAppointmentClick} // Verifica si el usuario está autenticado antes de redirigir
          className="btn btn-danger btn-lg px-5 py-3 shadow-sm fw-bold text-uppercase"
        >
          Agendar una Cita
        </button>
      </section>

      {/* Preguntas Frecuentes (FAQ) */}
<section className="container mb-5">
  <h2 className="text-center text-danger mb-4">Preguntas Frecuentes (FAQ)</h2>
  <div className="accordion" id="faqAccordion">
    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeading1">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#faqCollapse1"
          aria-expanded="true"
          aria-controls="faqCollapse1"
        >
          ¿Cómo puedo agendar una cita en el taller?
        </button>
      </h2>
      <div
        id="faqCollapse1"
        className="accordion-collapse collapse show"
        aria-labelledby="faqHeading1"
        data-bs-parent="#faqAccordion"
      >
        <div className="accordion-body">
          Puedes agendar una cita fácilmente a través de nuestro sitio web. Solo necesitas ingresar tus datos, los del vehículo y seleccionar una fecha.
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeading2">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#faqCollapse2"
          aria-expanded="false"
          aria-controls="faqCollapse2"
        >
          ¿Cuál es el horario de atención?
        </button>
      </h2>
      <div
        id="faqCollapse2"
        className="accordion-collapse collapse"
        aria-labelledby="faqHeading2"
        data-bs-parent="#faqAccordion"
      >
        <div className="accordion-body">
          Nuestro horario de atención es de lunes a sábado, de 8:00 AM a 6:00 PM. No abrimos los domingos.
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeading3">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#faqCollapse3"
          aria-expanded="false"
          aria-controls="faqCollapse3"
        >
          ¿Qué tipo de servicios ofrecen?
        </button>
      </h2>
      <div
        id="faqCollapse3"
        className="accordion-collapse collapse"
        aria-labelledby="faqHeading3"
        data-bs-parent="#faqAccordion"
      >
        <div className="accordion-body">
          Ofrecemos una variedad de servicios automotrices como diagnóstico de motor, cambio de aceite, reparación de frenos, mantenimiento preventivo, y más.
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeading4">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#faqCollapse4"
          aria-expanded="false"
          aria-controls="faqCollapse4"
        >
          ¿Ofrecen garantías en sus servicios?
        </button>
      </h2>
      <div
        id="faqCollapse4"
        className="accordion-collapse collapse"
        aria-labelledby="faqHeading4"
        data-bs-parent="#faqAccordion"
      >
        <div className="accordion-body">
          Sí, ofrecemos una garantía de 6 meses en la mayoría de nuestros servicios y repuestos.
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Sección nueva: Contacto */}
      <section className="bg-dark text-white py-5">
        <div className="container">
          <div className="row text-center">
            {/* Columna "Nosotros" */}
            <div className="col-md-4 mb-4">
              <h4 className="text-uppercase">Nosotros</h4>
              <p>Somos un taller automotriz de excelencia ubicado en la primera manzana m 327 colonia Plutarco Elías en Pachuca de Soto, Hidalgo.</p>
              <Link to="/join" className="btn btn-outline-light">Únete a nosotros</Link>
            </div>
            {/* Columna "Nuestros Servicios" */}
            <div className="col-md-4 mb-4">
              <h4 className="text-uppercase">Nuestros Servicios</h4>
              <ul className="list-unstyled">
                <li>Diagnóstico OBD II</li>
                <li>Falla Motor</li>
                <li>Servicio de lavado</li>
                <li>Batería baja</li>
                <li>Cambio de balatas</li>
              </ul>
            </div>
            {/* Columna "Síguenos" */}
            <div className="col-md-4 mb-4">
              <h4 className="text-uppercase">Síguenos</h4>
              <div>
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-white me-3">
                  <i className="fab fa-whatsapp fa-2x"></i>
                </a>
                <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="text-white me-3">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
                <a href="tel:+15551234567" className="text-white">
                  <i className="fas fa-phone fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-0">&copy; 2024 Taller Upiit. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;

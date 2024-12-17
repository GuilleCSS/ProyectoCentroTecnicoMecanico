const express = require('express');
const cors = require('cors'); // Importa el módulo de CORS
const nodemailer = require('nodemailer'); // Importa Nodemailer
require('./config/Database'); // Importa la conexión a la base de datos

const vehiculosRoutes = require('./routes/vehiculos');
const citasRoutes = require('./routes/citas');
const clientesRoutes = require('./routes/clientes');

const app = express();

// Configuración del Middleware de Datos
app.use(express.urlencoded({ extended: true })); // Permite el manejo de datos URL codificados
app.use(express.json()); // Middleware para manejar JSON

// Configuración de CORS
const corsOptionsClientes = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const corsOptionsVehiculos = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const corsOptionsCitas = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Aplica el middleware de CORS con opciones específicas en cada ruta
app.use('/clientes', cors(corsOptionsClientes), clientesRoutes);
app.use('/vehiculos', cors(corsOptionsVehiculos), vehiculosRoutes);
app.use('/citas', cors(corsOptionsCitas), citasRoutes);

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Usamos Gmail como servicio
  auth: {
    user: process.env.EMAIL_USER, // Tu correo electrónico
    pass: process.env.EMAIL_PASS, // Tu contraseña de correo
  },
});

// Ruta para enviar el correo de confirmación
app.post('/send-email', (req, res) => {
  const { name, email, date, time, vehicleBrand, vehicleModel } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Tu correo electrónico
    to: email, // El correo electrónico del cliente
    subject: 'Confirmación de cita agendada',
    text: `
      Hola ${name},
      
      Tu cita ha sido agendada con éxito:
      - Fecha: ${date}
      - Hora: ${time}
      - Marca del vehículo: ${vehicleBrand}
      - Modelo del vehículo: ${vehicleModel}

      ¡Gracias por confiar en nosotros!`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado:', info.response);
      return res.status(200).send('Correo de confirmación enviado');
    }
  });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));

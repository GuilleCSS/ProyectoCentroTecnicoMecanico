const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Importar bcrypt para el hash de la contraseña

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: String,
  correo: { type: String, unique: true, required: true },
  direccion: String,
  password: { type: String, required: true }, // Campo de contraseña
  vehiculos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo' }],
  citas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cita' }]
});

// Middleware para hashear la contraseña antes de guardar
clienteSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generar un salt
    this.password = await bcrypt.hash(this.password, salt); // Hashear la contraseña
    next();
  } catch (error) {
    next(error);
  }
});

// Método para verificar la contraseña
clienteSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Cliente', clienteSchema);

const testimonioSchema = new mongoose.Schema({
    calificacion: { type: Number, min: 1, max: 5 },
    comentario: String,
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' }
  });
  
  module.exports = mongoose.model('Testimonio', testimonioSchema);
  